import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  RootState,
  deleteCard,
  deleteRow,
  setDraggedItem,
  setSource,
  setTarget,
} from "../../Store/store";
import { isLastCard } from "../../Util/CardUtils";
import styled from "styled-components";
import TodoItem from "./TodoItem";

type Props = {
  id: number;
  parent: string;
};

// Styled

const SCard = styled.div<{ $isDragging?: boolean }>`
  & {
    background-color: white;
    border-radius: 1em;
    box-shadow: 3px 3px 25px rgb(156, 156, 156);
    min-height: 100px;
    opacity: ${(props) => (props.$isDragging ? "0.5" : "1")};
    padding: 1em 0.5em;
    transition: opacity 0.2s;
    width: 25%;
    animation: appear 300ms ease-out;
  }

  @keyframes appear {
    0% {
      opacity: 0;
      transform: translateY(-50px) rotateX(-90deg);
    }
    100% {
      opacity: 1;
      transform: translateY(0px) rotateX(0deg);
    }
  }
`;

function Card({ parent, id }: Props) {
  // Hooks
  const card = useSelector((state: RootState) => state.card);

  const [isDragging, setIsDragging] = useState(false);

  const dispatch = useDispatch();

  // Handlers

  const handleDragStart = (e: React.DragEvent) => {
    dispatch(setDraggedItem({ type: "card", id: id }));
    dispatch(setSource(parent));

    setIsDragging(true);
  };

  const handleDragEnd = (e: React.DragEvent) => {
    setIsDragging(false);
  };

  const handleDragEnter = (e: React.DragEvent) => {
    dispatch(setTarget(id));
    e.preventDefault();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleClickDelete = (e: React.MouseEvent) => {
    onDeleteCard();
  };

  // Functions

  const onDeleteCard = () => {
    dispatch(deleteCard(id));
    if (isLastCard(card.card, parent)) {
      dispatch(deleteRow(parent));
    }
  };

  return (
    <SCard
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      $isDragging={isDragging}
    >
      <TodoItem />
      {id}
      <button onClick={handleClickDelete}>delete</button>
    </SCard>
  );
}

export default Card;
