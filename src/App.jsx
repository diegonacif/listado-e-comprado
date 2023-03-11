import { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { v4 as uuidv4 } from 'uuid';
import './css/App.scss';

export const App = () => {
  const [data, setData] = useLocalStorage('listadoecomprado', []);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('Comprar');
  const [updateMode, setUpdateMode] = useState(false);
  const [currentId, setCurrentId] = useState('');

  function handleAddProduct() {
    setData(current => [...current, { text: input, status: status, id: uuidv4() }]);
    setInput('');
    setStatus('Comprar');
  }

  function handleDeleteProduct(id) {
    const newData = data.filter(item => item.id !== id);
    setData(newData);
  }

  function handleLoadUpdateProduct(id) {
    setUpdateMode(true);
    const currentItem = data?.filter(item => item.id === id);
    setInput(currentItem[0]?.text);
    setStatus(currentItem[0]?.status);
    setCurrentId(currentItem[0]?.id);
  }

  function handleUpdateProduct() {
    const arrayWithoutItem = data.filter(item => item.id !== currentId);
    const newItem = { text: input, status: status, id: currentId }
    setData(arrayWithoutItem.concat(newItem));
    setInput('');
    setStatus('Comprar');
    setCurrentId('');
    setUpdateMode(false);
  }

  return (
    <div className="App">
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
      <section>
        <div className="category-wrapper">
          {
            data?.map((data) => {
              if(data.status === 'Comprar') {
                return (
                  <div key={data.id} className="category-column">
                    <span>{data.text}</span>
                    <button onClick={() => handleDeleteProduct(data.id)}>Deletar</button>
                    <button onClick={() => handleLoadUpdateProduct(data.id)}>Atualizar</button>

                  </div>
                )
              } else {
                return;
              }
            })
          }
        </div>
        <div className="category-wrapper">
          {
            data?.map((data) => {
              if(data.status === 'Comprado') {
                return (
                  <div key={data.id} className="category-column">
                    <span>{data.text}</span>
                    {/* <span>{data.status}</span> */}
                    <button onClick={() => handleDeleteProduct(data.id)}>Deletar</button>
                    <button onClick={() => handleLoadUpdateProduct(data.id)}>Atualizar</button>
                  </div>
                )
              } else {
                return;
              }
            })
          }
        </div>
      </section>
    </div>
  )
}