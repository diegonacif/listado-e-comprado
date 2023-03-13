import { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
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

  function handleOnDragEnd(result) {
    if(!result.destination) return;

    const { source, destination } = result;

    const items = Array.from(data);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    if(source.droppableId !== destination.droppableId) {
      reorderedItem.status = destination.droppableId === "todo-droppable" ? "Comprar" : "Comprado";
    }
    setData(items)
  }

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
      <section>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="todo-droppable">
            {(provided) => (
              <div 
                className="category-wrapper" 
                {...provided.droppableProps} 
                ref={provided.innerRef}
              >
                {
                  data?.map((data, index) => {
                    if(data.status === 'Comprar') {
                      return (
                        <Draggable key={`div-${data.id}`} draggableId={`div-${data.id}`} index={index}>
                          {(provided, snapshot) => (
                            <div 
                              className="category-column"
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              style={{
                                ...provided.draggableProps.style,
                                opacity: snapshot.isDragging ? '0.75' : '1'
                              }}
                            >
                              <span>{data.text}</span>
                              <button onClick={() => handleDeleteProduct(data.id)}>Deletar</button>
                              <button onClick={() => handleLoadUpdateProduct(data.id)}>Atualizar</button>
                            </div>
                          )}
                        </Draggable>
                      )
                    } else {
                      return;
                    }
                  })
                }
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="done-droppable">
            {(provided) => (
              <div 
                className="category-wrapper" 
                {...provided.droppableProps} 
                ref={provided.innerRef}
              >
                {
                  data?.map((data, index) => {
                    if(data.status === 'Comprado') {
                      return (
                        <Draggable key={`div-${data.id}`} draggableId={`div-${data.id}`} index={index}>
                          {(provided, snapshot) => (
                            <div 
                              className="category-column"
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              style={{
                                ...provided.draggableProps.style,
                                opacity: snapshot.isDragging ? '0.75' : '1'
                              }}
                            >
                              <span>{data.text}</span>
                              {/* <span>{data.status}</span> */}
                              <button onClick={() => handleDeleteProduct(data.id)}>Deletar</button>
                              <button onClick={() => handleLoadUpdateProduct(data.id)}>Atualizar</button>
                            </div>
                          )}
                        </Draggable>
                      )
                    } else {
                      return;
                    }
                  })
                }
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </section>
    </div>
  )
}