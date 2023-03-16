import { useState } from 'react';
import { CheckSquare, Minus, MinusSquare, NotePencil, PlusSquare, Trash, XSquare } from '@phosphor-icons/react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import Rodal from 'rodal';
import { UpdateProduct } from '../UpdateProduct/UpdateProduct';
import { useLocalStorage } from '../../hooks/useLocalStorage';

import '../../css/App.scss';

export const CardsContainer = () => {

  const [addMode, setAddMode] = useState("");
  const [editTaskShow, setEditTaskShow] = useState(false);

  const [input, setInput] = useState('');
  const [updateMode, setUpdateMode] = useState(false);
  const [status, setStatus] = useState('Comprar');
  const [data, setData] = useLocalStorage('listadoecomprado', []);
  const [currentId, setCurrentId] = useState('');

  function handleAddMode(mode) {
    setAddMode(mode);
    setInput("");
  }

  function handleAddProduct(status) {
    if(input === "") {
        return setAddMode("");
    } else {
      return (
        setData(current => [...current, { text: input, status: status, id: uuidv4() }]),
        setInput(''),
        setStatus('Comprar'),
        setAddMode(false)
      )
    }
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

  function handleOpenEditTask(id) {
    const currentItem = data?.filter(item => item.id === id);
    console.log(currentItem)
    setInput(currentItem[0]?.text);
    setStatus(currentItem[0]?.status);
    setCurrentId(currentItem[0]?.id);
    setEditTaskShow(true);
  }

  function handleCloseEditTask() {
    setEditTaskShow(false);
    console.log("modal close")
    // setStatus('A fazer');
    // setTaskContent('');
    // setLocalRefresh(current => !current);
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

  const modalCustomStyles = {
    height: 'fit-content',
    width: 'fit-content',
  }

  return (
    <div className="cards-container-container">
      <div className="cards-container-wrapper">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="todo-droppable">
            {(provided) => (
              <div className="category-column">
                <div 
                  className="category-wrapper" 
                  {...provided.droppableProps} 
                  ref={provided.innerRef}
                >
                  <div className="category-item category-title">COMPRAR</div>
                  {
                    data?.map((data, index) => {
                      if(data.status === 'Comprar') {
                        return (
                          <Draggable key={`div-${data.id}`} draggableId={`div-${data.id}`} index={index}>
                            {(provided, snapshot) => (
                              <div 
                                className="category-item"
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                                style={{
                                  ...provided.draggableProps.style,
                                  opacity: snapshot.isDragging ? '0.75' : '1'
                                }}
                              >
                                <span onClick={() => handleOpenEditTask(data.id)}>{data.text}</span>
                                <div className="action-buttons-wrapper">
                                  {/* <NotePencil size={24} weight="duotone" onClick={() => handleLoadUpdateProduct(data.id)} /> */}
                                  <MinusSquare size={24} weight="regular" onClick={() => handleDeleteProduct(data.id)} />
                                </div>
                              </div>
                            )}
                          </Draggable>
                        )
                      } else {
                        return;
                      }
                    })
                  }
                  {
                    addMode === "Comprar" ?
                    <div className="category-item add-input">
                      <input 
                        type="text" 
                        placeholder="Digite a tarefa aqui" 
                        value={input} onChange={(e) => setInput(e.target.value)}
                      />
                      {
                        input === "" ?
                        <XSquare size={24} weight="duotone" onClick={() => handleAddProduct("Comprar")} /> :
                        <CheckSquare size={24} weight="duotone" onClick={() => handleAddProduct("Comprar")} />
                      }
                    </div> :
                    null
                  }
                  {provided.placeholder}
                </div>
                <PlusSquare size={36} weight="regular" onClick={() => handleAddMode("Comprar")} />
              </div>
            )}
          </Droppable>
          <Droppable droppableId="done-droppable">
            {(provided) => (
              <div className="category-column">

                <div 
                  className="category-wrapper" 
                  {...provided.droppableProps} 
                  ref={provided.innerRef}
                >
                  <div className="category-item category-title">COMPRADO</div>
                  {
                    data?.map((data, index) => {
                      if(data.status === 'Comprado') {
                        return (
                          <Draggable key={`div-${data.id}`} draggableId={`div-${data.id}`} index={index}>
                            {(provided, snapshot) => (
                              <div 
                                className="category-item"
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                                style={{
                                  ...provided.draggableProps.style,
                                  opacity: snapshot.isDragging ? '0.75' : '1'
                                }}
                              >
                                <span onClick={() => handleOpenEditTask(data.id)}>{data.text}</span>
                                <div className="action-buttons-wrapper">
                                  <MinusSquare size={24} weight="regular" onClick={() => handleDeleteProduct(data.id)} />
                                </div>
                              </div>
                            )}
                          </Draggable>
                        )
                      } else {
                        return;
                      }
                    })
                  }
                  {
                    addMode === "Comprado" ?
                    <div className="category-item add-input">
                      <input 
                        type="text" 
                        placeholder="Digite a tarefa aqui" 
                        value={input} onChange={(e) => setInput(e.target.value)}
                      />
                      {
                        input === "" ?
                        <XSquare size={24} weight="duotone" onClick={() => handleAddProduct("Comprado")} /> :
                        <CheckSquare size={24} weight="duotone" onClick={() => handleAddProduct("Comprado")} />
                      }
                    </div> :
                    null
                  }
                  {provided.placeholder}
                </div>
                <PlusSquare size={36} weight="regular" onClick={() => handleAddMode("Comprado")} />
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <Rodal
        visible={editTaskShow}
        onClose={() => handleCloseEditTask()}
        className='rodal-container'
        id='rodal-edit-task'
        animation='zoom'
        closeOnEsc={true}
        customStyles={modalCustomStyles}
        showCloseButton={false}
      >
        <UpdateProduct 
          updateMode={updateMode}
          setUpdateMode={setUpdateMode}
          input={input}
          setInput={setInput}
          status={status}
          setStatus={setStatus}
          data={data}
          setData={setData}
          currentId={currentId}
          setCurrentId={setCurrentId}
          setEditTaskShow={setEditTaskShow}
        />
      </Rodal>
    </div>
  )
}