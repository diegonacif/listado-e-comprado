import { useState } from 'react';
import './css/App.scss';

export const App = () => {
  const [data, setData] = useState([]);
  const [input, setInput] = useState('');

  function handleAddProduct() {
    setData(current => [...current, input]);
    setInput('');
  }

  console.log(data)

  return (
    <div className="App">
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={() => handleAddProduct()}>Adicionar</button>
      {
        data.map((data) => {
          return <p>{data}</p>
        })
      }
    </div>
  )
}