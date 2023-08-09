import Draggable, { type DraggableProps } from "react-draggable";

export default function useReactDraggable() {
  function handleStart() {
    console.info("Draggable::onStart");
  }
  function handleDrag() {
    console.info("Draggable::onDrag");
  }
  function handleStop() {
    console.info("Draggable::onStop");
  }

  const props: Partial<DraggableProps> = {
    // allowAnyClick: true,
    axis: "y",
    // bounds: { left: 0 },
    // cancel: ".no-dragging",
    // children: undefined,
    // defaultClassName: "react-draggable",
    // defaultClassNameDragged: "react-draggable-dragged",
    // defaultClassNameDragging: "react-draggable-dragging",
    defaultPosition: { x: 0, y: 0 },
    // disabled: false,
    // enableUserSelectHack: false,
    grid: [25, 25],
    handle: ".handle",
    // nodeRef: undefined,
    // offsetParent
    position: undefined,
    // positionOffset: { x: 0, y: 0 },
    scale: 1,
    // onMouseDown: handleMouseDown,
    onStart: handleStart,
    onDrag: handleDrag,
    onStop: handleStop,
  };

  return { Draggable, props };
}
