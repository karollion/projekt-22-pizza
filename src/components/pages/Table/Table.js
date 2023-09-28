import { getTableById, updateTableRequest } from '../../../redux/tablesRedux';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';
import TableForm from '../../features/TableForm/TableForm';

const Table = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const  {id}  = useParams();
  const tableData = useSelector(state => getTableById(state, id));

  const handleSubmit = (table, event) => {
    dispatch(updateTableRequest(table));
    navigate('/');
  };

  if(!tableData) return <Navigate to="/" />
  else return (
    <div>
      <h2>Table {id}</h2>
      <TableForm 
        action={handleSubmit} 
        actionText='Update' 
        id={tableData.id}
        status={tableData.status}
        peopleAmount={tableData.peopleAmount}
        maxPeopleAmount={tableData.maxPeopleAmount}
        bill={tableData.bill}
      />
    </div>
  );
};

export default Table;