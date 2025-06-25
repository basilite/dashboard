import React, { useState, useEffect, type ReactNode } from "react";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable, rectSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styles from "../css/masonry-layout.module.css";

interface MasonryItemProps {
  id: string;
  children: ReactNode;
}

function MasonryItem({ id, children }: MasonryItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style: React.CSSProperties = { transform: CSS.Transform.toString(transform), transition };
  return <div ref={setNodeRef} className={`${styles.masonryItem} ${isDragging ? "dragging" : ""}`} style={style} {...attributes} {...listeners}> {children} </div>;
}

export default function MasonryGrid() {
  const [items, setItems] = useState([
    "Elemento 1",
    "Elemento 2",
    "Elemento 3",
    "Elemento 4",
    "Elemento 5",
    "Elemento 6",
    "Elemento 7",
    "Elemento 8",
    "Elemento 9",
  ]);

  const sensors = useSensors(useSensor(PointerSensor));
  const [columns, setColumns] = useState(3);

  useEffect(() => {
    function updateColumns(){
      if(window.innerWidth < 600) setColumns(1);
      else if(window.innerWidth < 900) setColumns(2);
      else setColumns(3);
    }
    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  function handleDragEnd(event: DragEndEvent){ 
    const { active, over } = event;
    if(over && active.id !== over.id)
        setItems((items) => {
        const oldIndex = items.indexOf(active.id as string);
        const newIndex = items.indexOf(over.id as string);
        return arrayMove(items, oldIndex, newIndex);
        });
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={rectSortingStrategy}>
        <div className={styles.cardContainer} style={{gridTemplateColumns: `repeat(${columns}, 1fr)`}}>
          {items.map((item) => <MasonryItem key={item} id={item}> {item} </MasonryItem> )}
        </div>
      </SortableContext>
    </DndContext>
  );
}