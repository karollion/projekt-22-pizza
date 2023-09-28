import { API_URL } from '../config'
import { setLoading } from './isLoadingRedux';

//selectors
export const getAllTables = ({ tables }) => tables;
export const getTableById = ({ tables }, tableId) => tables.find(table => table.id === tableId);

// actions
const createActionName = actionName => `app/tables/${actionName}`;
const LOAD_TABLES = createActionName('LOAD_TABLES');
const UPDATE_TABLE = createActionName('UPDATE_TABLE');
const ADD_TABLE = createActionName('ADD_TABLE');
const REMOVE_TABLE = createActionName('REMOVE_TABLE');

// action creators
export const loadTables = payload => ({type: LOAD_TABLES, payload});
export const updateTable = payload => ({type: UPDATE_TABLE, payload});
export const addTable = payload => ({type: ADD_TABLE, payload});
export const removeTable = payload => ({type: REMOVE_TABLE, payload});

export const fetchTables = () => {
  return(dispatch) => {
    dispatch(setLoading(true))
    fetch(`${API_URL}/tables`)
      .then(res => res.json())
      .then(tables => {
        dispatch(setLoading(false)) 
        dispatch(loadTables(tables))});
  };
};

export const updateTableRequest = ( table ) => {
  return(dispatch) => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...table,
      }),
    };
    
    fetch(`${API_URL}/tables/${table.id}`, options)
      .then(() => {dispatch(updateTable(table, table.id))});
  };
};

export const addTableRequest = table => {
  return(dispatch) => {
    const options = {
      method: 'POST',
    
      headers: {
        'Content-Type': 'application/json'
      },
    
      body: JSON.stringify(
        table
      )
    };
    
    fetch(`${API_URL}/tables`, options)
      .then(() => {dispatch(addTable(table))})
      .then(() => {dispatch(fetchTables())})
  };
};

export const removeTableRequest = table => {
	return dispatch => {
		const options = {
			method: 'DELETE',
		}

		fetch(`${API_URL}/tables/${table.id}`, options)
      .then(() => {dispatch(removeTable(table.id))})
	};
};

const tablesReducer = (statePart = [], action) => {
  switch (action.type) {
    case LOAD_TABLES:
      return [...action.payload];
    case UPDATE_TABLE:
      return statePart.map(table => (table.id === action.payload.id ? { ...table, ...action.payload } : table));
    case ADD_TABLE:
      return [...statePart, { ...action.payload }];
    case REMOVE_TABLE:
      return statePart.filter(table => table.id !== action.payload);
    default:
      return statePart;
  };
};

export default tablesReducer;