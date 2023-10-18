import styles from "config/styles";
import { DndContext, DragEndEvent } from "@dnd-kit/core";

const $e = {
  onDragEnd: (e: DragEndEvent) => {
    console.log("onDragEnd", e);
  },
};

export function Routing() {
  return (
    <DndContext onDragEnd={$e.onDragEnd}>
      <h1 className={styles.headings.h1}>Routing</h1>
    </DndContext>
  );
}
