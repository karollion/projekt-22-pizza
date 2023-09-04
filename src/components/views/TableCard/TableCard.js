import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';

const TableCard = (props) => {
    return (
      <Container>
          <h3>Table {props.id}</h3>
          <p><span className='fw-bold'>Status: </span>{props.status}</p>
          
          <Button variant="primary" as={Link} to={"/table/" + props.id}>Show more</Button>
      </Container>
    );
};

export default TableCard;