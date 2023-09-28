import { addTableRequest } from '../../../redux/tablesRedux';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TableForm from '../../features/TableForm/TableForm';
import { getAllTables } from '../../../redux/tablesRedux';

const AddTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const tables = useSelector(getAllTables);
  const lastTable = tables.slice(-1)[0].id;
  let newTableId = String(Number(lastTable) + 1);

  const handleSubmit = (table, event) => {
    console.log(table)
    dispatch(addTableRequest(table));
    navigate('/');
  };

  return (
    <div>
      <h2>Add Table </h2>
      <TableForm 
        action={handleSubmit} 
        actionText='Add Table' 
        id={newTableId}
        status={'Free'}
        peopleAmount={0}
        maxPeopleAmount={1}
        bill={0}
      />
    </div>
  );
};

export default AddTable;