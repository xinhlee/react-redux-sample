import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setDraggedItem } from "../../Store/store";

type Props = {};

const STodoItem = styled.div<{ $isDragging?: boolean }>`
  & {
    padding: 10px;
    margin: 10px 0px;
    opacity: ${(props) => (props.$isDragging ? "0.5" : "1")};
  }

  &:hover {
    transition: all 500ms;
    transform: translateX(-3px) translateY(-3px);
    box-shadow: 3px 3px 3px rgb(182, 182, 182);
  }
`;

function TodoItem({}: Props) {
  const [isDragging, setIsDragging] = useState(false);

  const dispatch = useDispatch();

  // Handlers

  const handleDragStart = (e: React.DragEvent) => {
    e.stopPropagation();
    dispatch(setDraggedItem({ type: "todo", id: 1 }));
    setIsDragging(true);
  };

  const handleDragEnd = (e: React.DragEvent) => {
    setIsDragging(false);
  };

  return (
    <STodoItem
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      $isDragging={isDragging}
    >
      TodoItem
    </STodoItem>
  );
}

export default TodoItem;
