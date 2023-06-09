import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  AppDispatch,
  RootState,
  addRowInBetween,
  changeRow,
  deleteRow,
  setTarget,
} from "../../Store/store";
import { generateNewId, isLastCard, canDropHere } from "../../Util/CardUtils";
import { addCardInBetweenRows } from "../../Store/CardSlice";

type Props = {
  borderOf: string;
};

// Styled
const SRowBorder = styled.div<{ $isHoveredOver: boolean }>`
  & {
    height: 10px;
    margin-bottom: 20px;
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
    border-radius:10px;
    width: 80%;

    ${(props) => {
      if (props.$isHoveredOver)
        return `
        background-color: rgb(130, 255, 190);
        opacity: 0.75;
        animation: fade 500ms infinite;
        `;
    }}}
    
  }

  &:after,
  :before {
    content: "";
    position: absolute;
    right: 0;
    left: 0;
    height: 30px;
  }

  &:before {
    transform: translateY(-20px)
  }

  @keyframes fade {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 0.7;
    }
    100% {
      opacity: 0;
    }
  }
`;

let timer: any;

function RowBorder({ borderOf }: Props) {
  // Hooks

  const card = useSelector((state: RootState) => state.card);
  const drag = useSelector((state: RootState) => state.drag);

  const [isHoveredOver, setIsHoveredOver] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  // Handlers

  const handleDrop = (e: React.DragEvent) => {
    if (canDropHere("card", drag, true)) {
      let newRowId = generateNewId();
      dispatch(
        addCardInBetweenRows({
          draggedId: drag.draggedItem?.id,
          newRowId: newRowId,
          previousOf: borderOf,
        })
      );

      if (isLastCard(card.card, drag.source)) {
        dispatch(deleteRow(drag.source));
      }
    }

    setIsHoveredOver(false);
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    timer = setTimeout(() => {
      setIsHoveredOver(true);
    }, 100);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    clearTimeout(timer);
    setIsHoveredOver(false);
  };

  return (
    <>
      <SRowBorder
        $isHoveredOver={isHoveredOver && drag.draggedItem?.type === "card"}
        onDrop={handleDrop}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      />
    </>
  );
}

export default RowBorder;
