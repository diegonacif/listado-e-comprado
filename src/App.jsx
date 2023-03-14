import { useState } from 'react';
import { CardsContainer } from './components/CardsContainer/CardsContainer';
import './css/App.scss';

export const App = () => {
  const [input, setInput] = useState('');
  const [updateMode, setUpdateMode] = useState(false);

  return (
    <div className="App">
      <div className="background-mirror"></div>
      <header>
        {
          updateMode ?
          <>
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
            <select name="status" id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Comprar">Comprar</option>
              <option value="Comprado">Comprado</option>
            </select>
            <button onClick={() => handleUpdateProduct()}>Atualizar</button>
          </> :
          <>
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
            <select name="status" id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Comprar">Comprar</option>
              <option value="Comprado">Comprado</option>
            </select>
            <button onClick={() => handleAddProduct()}>Adicionar</button>
          </>
        }
      </header>
      <CardsContainer />
    </div>
  )
}