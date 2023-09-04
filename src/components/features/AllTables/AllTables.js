import { useSelector } from 'react-redux';
import { getAllTables } from '../../../redux/tablesRedux';
import TableCard from '../../views/TableCard/TableCard';
import { Row } from 'react-bootstrap';

const AllTables = () => {
  const tables = useSelector(getAllTables);
    return (
      <Row className='py-4'>
        {tables.map(table => (
          <TableCard key={table.id} {...table}  />
        ))}
      </Row>
    );
};

export default AllTables;