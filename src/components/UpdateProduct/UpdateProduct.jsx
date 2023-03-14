import { v4 as uuidv4 } from 'uuid';

export const UpdateProduct = ({ updateMode, setUpdateMode, input, setInput, status, setStatus, data, setData, currentId, setCurrentId }) => {
  function handleAddProduct() {
    setData(current => [...current, { text: input, status: status, id: uuidv4() }]);
    setInput('');
    setStatus('Comprar');
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
    <div className="update-product-container">
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
    </div>
  )
}
