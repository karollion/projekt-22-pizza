import { Form, Row, Col, Button } from "react-bootstrap";
import { useState } from 'react';
import { useForm } from "react-hook-form";

const TableForm = ({ action, actionText, ...props }) => {

  const [status, setStatus] = useState(props.status || '');
  const [peopleAmount, setPeopleAmount] = useState(props.peopleAmount || '');
  const [maxPeopleAmount, setMaxPeopleAmount] = useState(props.maxPeopleAmount || '');
  const [bill, setBill] = useState(props.bill || '');

  const { register, handleSubmit: validate, formState: { errors } } = useForm();

  const handleSubmit = () => { 
      action({ status, peopleAmount, maxPeopleAmount, bill });
  };
  
  return (

    <Form onSubmit={validate(handleSubmit)}>
      <h2>Table {props.id}</h2>
      <Row>
        <Col xs='12' md='6' lg='6' >
          <Form.Group className="mb-3">
            <Form.Label>Status: </Form.Label>
            <Form.Control
              as="select"
              {...register('status', { required: true })}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              id="status">
              <option value=""></option>
              <option value="Busy">Busy</option>
              <option value="Free">Free</option>
              <option value="Cleaning">Cleaning</option>
              <option value="Reserved">Reserved</option>
            </Form.Control>
            {errors.status && <small className="d-block form-text text-danger mt-2">Please select a status</small>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBill">
              <Form.Label>Bill: </Form.Label>
              <Form.Control 
                {...register("bill", { required: true})}
                type="text" placeholder="" 
                value={bill} 
                onChange={e => setBill(e.target.value)} />
                {errors.bill && <small className="d-block form-text text-danger mt-2">Enter bill</small>}
          </Form.Group>
        </Col>
      </Row>
      
      <Button variant="primary" type="submit">
      {actionText}
      </Button>
    </Form>
  );
};

export default TableForm;