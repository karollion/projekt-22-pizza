import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Container, Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { removeTableRequest } from '../../../redux/tablesRedux';

const TableCard = ({ table }) => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleRemove = (event) => {
    event.preventDefault();
    dispatch(removeTableRequest(table));
  };

  return (
    <Container>
      <div className='row border-bottom  mb-3 align-items-center'>
        <div className='col-auto'>
          <h3>Table {table.id}</h3>
        </div>
        <div className='col-auto me-auto'>
          <p className='mt-3'><span className='fw-bold'>Status: </span>{table.status}</p>
        </div>
        <div className='col-auto pb-2'>
          <Button variant="primary" as={Link} to={"/table/" + table.id}>Show more</Button>
        </div>
        <div className='col-auto pb-2'>
          <Button variant="danger" as={Link} onClick={handleShow}>Remove</Button>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>This operation completly remove this table from the app. Are you sure to do that?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleRemove}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default TableCard;