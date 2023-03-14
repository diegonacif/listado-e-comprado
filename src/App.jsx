import { useState } from 'react';
import { CardsContainer } from './components/CardsContainer/CardsContainer';
import { useLocalStorage } from './hooks/useLocalStorage';
import { UpdateProduct } from './components/UpdateProduct/UpdateProduct';
import './css/App.scss';

export const App = () => {
  const [input, setInput] = useState('');
  const [updateMode, setUpdateMode] = useState(false);
  const [status, setStatus] = useState('Comprar');
  const [data, setData] = useLocalStorage('listadoecomprado', []);
  const [currentId, setCurrentId] = useState('');

  return (
    <div className="App">
      <div className="background-mirror"></div>
      <UpdateProduct 
        updateMode={updateMode}
        setUpdateMode={setUpdateMode}
        input={input}
        status={status}
        setStatus={setStatus}
        data={data}
        setData={setData}
        setInput={setInput}
        currentId={currentId}
        setCurrentId={setCurrentId}
      />
      <CardsContainer 
        setUpdateMode={setUpdateMode}
        input={input}
        setInput={setInput}
        setStatus={setStatus}
        data={data}
        setData={setData}
        setCurrentId={setCurrentId}
      />
    </div>
  )
}