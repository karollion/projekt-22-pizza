import AllTables from "../../features/AllTables/AllTables";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner'
import { useSelector } from "react-redux";
import { getIsLoading } from "../../../redux/isLoadingRedux";
import { getAllTables } from "../../../redux/tablesRedux";

const Home = () => {
  const tables = useSelector(state => getAllTables(state));
  const isLoading = useSelector(state => getIsLoading(state))

  return (
    <div >
      <div className='d-flex justify-content-between mt-4 mb-4'>
        <h2>All tables</h2>
        <Button variant="outline-info" as={Link} to="/table/add">Add table</Button>
      </div>
      {tables.length === 0 && !isLoading && <p>No tables</p>}
      {isLoading && <Spinner animation='border' variant='primary' />}
      {!isLoading && <AllTables />}
    </div>
  );
};

export default Home;