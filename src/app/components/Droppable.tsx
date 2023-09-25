import { type ReactNode } from "react";
import PropTypes from "prop-types";
import { useDroppable } from "@dnd-kit/core";

interface IDroppableProps {
  id: string;
  children?: ReactNode;
}

function Droppable({ children, id }: IDroppableProps) {
  const { setNodeRef } = useDroppable({ id });
  return <section ref={setNodeRef}>{children}</section>;
}

Droppable.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default Droppable;
