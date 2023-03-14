
import { NotePencil, Trash } from '@phosphor-icons/react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import '../../css/App.scss';

export const CardsContainer = ({ setUpdateMode, setInput, setStatus, data, setData, setCurrentId }) => {

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
    <div className="cards-container-container">
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
                            {/* <button onClick={() => handleDeleteProduct(data.id)}>Deletar</button> */}
                            {/* <button onClick={() => handleLoadUpdateProduct(data.id)}>Atualizar</button> */}
                            <div className="action-buttons-wrapper">
                              <NotePencil size={24} weight="duotone" onClick={() => handleLoadUpdateProduct(data.id)} />
                              <Trash size={24} weight="duotone" onClick={() => handleDeleteProduct(data.id)} />
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
                            {/* <button onClick={() => handleDeleteProduct(data.id)}>Deletar</button>
                            <button onClick={() => handleLoadUpdateProduct(data.id)}>Atualizar</button> */}
                            <div className="action-buttons-wrapper">
                              <NotePencil size={24} weight="duotone" onClick={() => handleLoadUpdateProduct(data.id)} />
                              <Trash size={24} weight="duotone" onClick={() => handleDeleteProduct(data.id)} />
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
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}