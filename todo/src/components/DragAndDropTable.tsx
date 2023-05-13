import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { fetchTodos } from "../common";

export function DragAndDropTable() {
  const [items1, setItems1] = useState([
    { id: "1", content: "Item 1" },
    { id: "2", content: "Item 2" },
    { id: "3", content: "Item 3" },
    { id: "4", content: "Item 4" },
  ]);
  const [items2, setItems2] = useState([]);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const itemsCopy1 = [...items1];
    const itemsCopy2 = [...items2];
    if (result.source.droppableId === "table1") {
      const [reorderedItem] = itemsCopy1.splice(result.source.index, 1);
      itemsCopy2.splice(result.destination.index, 0, reorderedItem);
      setItems1(itemsCopy1);
      setItems2(itemsCopy2);
    } else {
      const [reorderedItem] = itemsCopy2.splice(result.source.index, 1);
      itemsCopy1.splice(result.destination.index, 0, reorderedItem);
      setItems1(itemsCopy1);
      setItems2(itemsCopy2);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: "flex" }}>
        <Droppable droppableId="table1">
          {(provided) => (
            <table
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ border: "1px solid black", margin: "10px" }}
            >
              <thead>
                <tr>
                  <th>Table 1</th>
                </tr>
              </thead>
              <tbody>
                {items1.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <tr
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <td>{item.content}</td>
                      </tr>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </tbody>
            </table>
          )}
        </Droppable>

        <Droppable droppableId="table2">
          {(provided) => (
            <table
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ border: "1px solid black", margin: "10px" }}
            >
              <thead>
                <tr>
                  <th>Table 2</th>
                </tr>
              </thead>
              <tbody>
                {items2.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <tr
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <td>{item.content}</td>
                      </tr>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </tbody>
            </table>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}
