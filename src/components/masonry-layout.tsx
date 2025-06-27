import React, { useRef, useState } from "react";
import { DndContext, closestCenter, MouseSensor, TouchSensor, useSensor, useSensors, type DragOverEvent, type DragEndEvent, type UniqueIdentifier } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext, useSortable } from "@dnd-kit/sortable";
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { CSS } from "@dnd-kit/utilities";
import styles from "../css/masonry-layout.module.css";
import draggableIcon from "../assets/icons/draggable-grey.svg";

type Item = { id: number; height: number };

function MasonryCell({ item, onEdit }: { item: Item; onEdit: boolean }){
  const { attributes, listeners, setNodeRef, transform, transition, isOver } = useSortable({ id: item.id });

  return (
    <div ref={setNodeRef} className={styles.masonryItem} style={{
        height: item.height,
        position: "relative",
        border: isOver ? "3px solid var(--guppie-green)" : onEdit ? "2px dashed var(--chinese-white)" : undefined,
        transform: CSS.Translate.toString(transform),
        transition,
        zIndex: isOver ? 9999 : undefined,
      }}>
      <div {...attributes} {...listeners} className={`${styles.dragHandle} center-flex`}>
        {onEdit ? <img src={draggableIcon} alt="drag" /> : undefined}
      </div>
      {item.id}
    </div>
  );
}

export default function MasonryLayout({ onEdit }: { onEdit: boolean }){
  const initialItems: Item[] = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1, height: 80 + Math.floor(Math.random() * 120),
  }));

  const lastPosition = useRef<{ colIndex: number; itemIndex: number } | null>(null);
  const [, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [overId, setOverId] = useState<UniqueIdentifier | null>(null);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  const [columns, setColumns] = useState<Item[][]>(() => {
    const cols: Item[][] = [[], [], []];
    initialItems.forEach((item, idx) => { cols[idx % 3].push(item); });
    return cols;
  });


  function findColumnIndexAndItemIndex(id: UniqueIdentifier): { colIndex: number; itemIndex: number } | null {
    const numericId = typeof id === "string" ? parseInt(id, 10) : id;

    for(let colIndex = 0; colIndex < columns.length; colIndex++){
      const itemIndex = columns[colIndex].findIndex((item) => item.id === numericId);
      if(itemIndex !== -1) return { colIndex, itemIndex };
    }
    return null;
  }

  function areColsEqual(cols1: Item[][], cols2: Item[][]): boolean {
    if(cols1.length !== cols2.length) return false;
    for(let i = 0; i < cols1.length; i++){
      if(cols1[i].length !== cols2[i].length) return false;
      for(let j = 0; j < cols1[i].length; j++)
        if (cols1[i][j].id !== cols2[i][j].id) return false;
    }
    return true;
  }

  function handleDragOver(event: DragOverEvent){
    const { active, over } = event;
    if(!over) return;

    setOverId(over.id);

    const activePos = findColumnIndexAndItemIndex(active.id);
    const overPos = findColumnIndexAndItemIndex(over.id);
    if (!activePos || !overPos) return;

    if(lastPosition.current &&
      lastPosition.current.colIndex === overPos.colIndex &&
      lastPosition.current.itemIndex === overPos.itemIndex) return;

    setColumns((cols) => {
      const newCols = cols.map(col => [...col]);
      const [moved] = newCols[activePos.colIndex].splice(activePos.itemIndex, 1);
      newCols[overPos.colIndex].splice(overPos.itemIndex, 0, moved);
      if(areColsEqual(cols, newCols)) return cols;
      lastPosition.current = overPos;
      return newCols;
    });
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveId(null);
    setOverId(null);
    const { active, over } = event;

    if(!over) return;
    if(active.id !== over.id){
      const activePos = findColumnIndexAndItemIndex(active.id);
      const overPos = findColumnIndexAndItemIndex(over.id);
      if(!activePos || !overPos) return;

      setColumns((cols) => {
        const newCols = cols.map((col) => [...col]);
        const [moved] = newCols[activePos.colIndex].splice(activePos.itemIndex, 1);
        newCols[overPos.colIndex].splice(overPos.itemIndex, 0, moved);
        return newCols;
      });
    }
  }


  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragOver={handleDragOver} onDragEnd={handleDragEnd} modifiers={[restrictToWindowEdges]}>
      <div className={styles.cardContainer}>
        {columns.map((col, colIndex) => (
          <SortableContext key={colIndex} items={col.map((item) => item.id)} strategy={rectSortingStrategy}>
            <div style={{ flex: 1 }} className={`${styles.columnContainer} flex column`}>
              {col.map((item, index) => {
                const isOver = item.id === overId;
                const nextItem = col[index + 1];

                return (
                  <React.Fragment key={item.id}>
                    {isOver && nextItem && <div className={styles.placeholder} style={{ height: item.height + "px", marginBottom: `-${item.height+15}px` }}/> }
                    <MasonryCell item={item} onEdit={onEdit} />
                  </React.Fragment>
                );
              })}
            </div>
          </SortableContext>
        ))}
      </div>
    </DndContext>
  );
}