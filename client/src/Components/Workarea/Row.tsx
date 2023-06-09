import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Card from "./Card";
import {
  AppDispatch,
  RootState,
  add,
  changeRow,
  deleteRow,
  setTarget,
} from "../../Store/store";
import { isLastCard, canDropHere, generateNewId } from "../../Util/CardUtils";
import styled from "styled-components";

type Props = {
  id: string;
};

// Styled
const SRow = styled.div`
  display: flex;
  min-height: 40px;
`;

function Row({ id }: Props) {
  // Hooks

  const card = useSelector((state: RootState) => state.card);
  const drag = useSelector((state: RootState) => state.drag);

  const dispatch: AppDispatch = useDispatch();

  // Handlers

  const handleDrop = (e: React.DragEvent) => {
    if (canDropHere("card", drag)) {
      dispatch(
        changeRow({
          id: drag.draggedItem?.id,
          row: drag.target,
        })
      );
      if (isLastCard(card.card, drag.source)) {
        dispatch(deleteRow(drag.source));
      }
    }
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    dispatch(setTarget(id));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handlerClickAdd = () => {
    onAddCard();
  };

  // Function

  const onAddCard = () => {
    let newName = generateNewId();
    let newCard = {
      id: parseInt(newName),
      name: newName,
      row: id,
      isNew: true,
    };
    dispatch(add(newCard));
  };

  return (
    <SRow
      onDrop={handleDrop}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      {card.card.map((i) => {
        if (i.row === id) {
          return <Card key={i.id} id={i.id} parent={id}></Card>;
        }
      })}
      <button onClick={handlerClickAdd}>add</button>
    </SRow>
  );
}

export default Row;
