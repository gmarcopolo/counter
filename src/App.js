import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import { Counter } from './modules';
import './App.css';

export const dataReducer = (state, action) => {
  if (action.type === 'SET_ERROR') {
    return { ...state, list: [], error: true };
  }
  if (action.type === 'SET_LIST') {
    return { ...state, list: action.list, error: null };
  }
  throw new Error();
};
const initialData = {
  list: [],
  error: null
};

const App = () => {
  const [counter, setCounter] = useState(0);
  const [data, dispatch] = useReducer(dataReducer, initialData);

  useEffect(() => {
    axios
      .get('http://hn.algolia.com/api/v1/search?query=react')
      .then(response => {
        dispatch({ type: 'SET_LIST', list: response.data.hits });
      })
      .catch(() => {
        dispatch({ type: 'SET_ERROR' });
      });
  }, []);

  useEffect(() => {
    if (counter === 5) {
      alert('hola');
    }
  }, [counter]);

  return (
    <div className="App">
      <h1>Counter</h1>
      <Counter counter={counter} />
      <button type="button" onClick={() => setCounter(counter + 1)}>
        Increment
      </button>
      <button type="button" onClick={() => setCounter(counter - 1)}>
        Decrement
      </button>
      <h2>My async data</h2>
      {data.error && <div className="error">Error</div>}
      <ul>
        {data.list.map(item => (
          <li key={item.objectID}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
