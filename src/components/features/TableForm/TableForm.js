import { Form, Col, Button } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import PropTypes from 'prop-types'

const TableForm = ({ action, actionText, ...props }) => {

  const [status, setStatus] = useState(props.status || '');
  const [peopleAmount, setPeopleAmount] = useState(props.peopleAmount || '');
  const [maxPeopleAmount, setMaxPeopleAmount] = useState(props.maxPeopleAmount || '');
  const [bill, setBill] = useState(props.bill || '');
  const [id] = useState(props.id);

  const { register, handleSubmit: validate, formState: { errors } } = useForm();

  const handleSubmit = (_, event) => {
		event.preventDefault() 
    action({ id, status, peopleAmount, maxPeopleAmount, bill });
  };

  useEffect(() => {
		if (status === 'Free' || status === 'Cleaning') {
			setBill(0)
			setPeopleAmount(0)
		}

		if (maxPeopleAmount >= 0 && peopleAmount > maxPeopleAmount) {
			setPeopleAmount(maxPeopleAmount)
		}
	}, [status, peopleAmount, maxPeopleAmount])
  
  return (

    <Form onSubmit={validate(handleSubmit)}>    
      <Col xs={6} md={3}>
        <Form.Group className='mb-3 d-flex flex-row align-items-center justify-content-between'>
          <Form.Label>Status:</Form.Label>
          
          <Form.Select
              {...register('status', { required: true })}
              className='w-75'
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              id="status">
              <option value="Busy">Busy</option>
              <option value="Free">Free</option>
              <option value="Cleaning">Cleaning</option>
              <option value="Reserved">Reserved</option>
            </Form.Select>
        </Form.Group>
      </Col>

      <Col xs={6} md={3}>
        <Form.Group className='mb-3 d-flex flex-row align-items-center justify-content-between'>
          <Form.Label className='mr-2'>People:</Form.Label>
          <Form.Control
            {...register('people', { min: 0, max: { maxPeopleAmount } })}
            type='number'
            className='w-25'
            value={peopleAmount}
            onChange={e => setPeopleAmount(e.target.value)}
          />

          <span> / </span>
          <Form.Control
            {...register('maxPeople', { min: 0, max: 10 })}
            type='number'
            className='w-25'
            value={maxPeopleAmount}
            onChange={e => setMaxPeopleAmount(e.target.value)}
          />
        </Form.Group>
        {errors.people && (
          <small className='d-block form-text text-danger my-2'>
            Number of people can not be lower than 0 and greater than max table amunt
          </small>
        )}
        {errors.maxPeople && <small className='d-block form-text text-danger my-2'>Min value is 0, max 10</small>}
      </Col>

			<Col xs={6} md={3}>
				{status === 'Busy' && (
					<Form.Group className='mb-3 d-flex flex-row align-items-center justify-content-between'>
						<Form.Label className='mr-2'>Bill:</Form.Label>
						<div className='d-flex flex-row align-items-center'>
							<span> $ </span>
							<Form.Control
								{...register('bill', { min: 0 })}
								type='number'
								className='w-50'
								value={bill}
								onChange={e => setBill(e.target.value)}
							/>
						</div>
					</Form.Group>
				)}
				{errors.bill && <small className='d-block form-text text-danger my-2'>Min value is 0</small>}
			</Col>
      
      <Button variant="primary" type="submit">
      {actionText}
      </Button>
    </Form>
  );
};

TableForm.propTypes = {
	action: PropTypes.func.isRequired,
	actionText: PropTypes.string.isRequired,
	status: PropTypes.string,
	id: PropTypes.string,
	maxPeople: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	people: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	bill: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default TableForm;