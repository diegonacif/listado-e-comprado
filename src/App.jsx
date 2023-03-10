import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './css/App.scss';

export const App = () => {
  const [data, setData] = useState([]);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('Comprar');

  function handleAddProduct() {
    setData(current => [...current, { text: input, status: status, id: uuidv4() }]);
    setInput('');
    setStatus('Comprar');
  }

  console.log(data);

  return (
    <div className="App">
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
      <select name="status" id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="Comprar">Comprar</option>
        <option value="Comprado">Comprado</option>
      </select>
      <button onClick={() => handleAddProduct()}>Adicionar</button>
      {
        data.map((data) => {
          return (
            <div key={data.id}>
              <span>{data.text}</span>
              <span>{data.status}</span>
            </div>
          )
        })
      }
    </div>
  )
}