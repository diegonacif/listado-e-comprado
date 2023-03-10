import { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { v4 as uuidv4 } from 'uuid';
import './css/App.scss';

export const App = () => {
  const [data, setData] = useLocalStorage('listadoecomprado', []);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('Comprar');
  const [updateMode, setUpdateMode] = useState(true);
  const [updateData, setUpdateData] = useState([]);
  const [updateInput, setUpdateInput] = useState('');
  const [updateStatus, setUpdateStatus] = useState('');
  console.log(updateData[0]?.text);

  // console.log(updateInput, updateStatus);

  function handleAddProduct() {
    setData(current => [...current, { text: input, status: status, id: uuidv4() }]);
    setInput('');
    setStatus('Comprar');
  }

  function handleDeleteProduct(id) {
    const newData = data.filter(item => item.id !== id);
    setData(newData);
  }

  function handleUpdateProduct(id) {
    // {!updateMode && setUpdateMode(true)};
    const newData = data?.filter(item => item.id === id);
    setUpdateData(newData)
    
  }
  return (
    <div className="App">
      <header>
        {
          updateMode ?
          <>
            <input type="text" value={updateData[0]?.text} onChange={(e) => setInput(e.target.value)} />
            <select name="status" id="status" value={updateData[0]?.status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Comprar">Comprar</option>
              <option value="Comprado">Comprado</option>
            </select>
            <button onClick={() => handleAddProduct()}>Atualizar</button>
          </> :
          <>
            <input type="text" value={updateData[0]?.text} onChange={(e) => setUpdateInput(e.target.value)} />
            <select name="status" id="status" value={updateData[0]?.status} onChange={(e) => setUpdateStatus(e.target.value)}>
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
                    {/* <span>{data.status}</span> */}
                    <button onClick={() => handleDeleteProduct(data.id)}>Deletar</button>
                    <button onClick={() => handleUpdateProduct(data.id)}>Atualizar</button>

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
                    <button onClick={() => handleUpdateProduct(data.id)}>Atualizar</button>
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