import React, { useEffect, useRef } from "react";

import Row from "./Row";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, add, addRow } from "../../Store/store";
import { generateNewId, getTotalRow, isRowEmpty } from "../../Util/CardUtils";
import styled from "styled-components";
import RowBorder from "./RowBorder";
import { fetchCard, saveChangesToDatabase } from "../../Store/CardSlice";

type Props = {};

// Styled
const SCanvas = styled.div`
  background-color: #ececec;
  flex: 1;
  padding: 2em 3em;
`;

function Canvas({}: Props) {
  // Hook

  let card = useSelector((state: RootState) => state.card);
  let row = useSelector((state: RootState) => state.row);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCard());

    return () => {};
  }, [dispatch]);

  useEffect(() => {
    if (getTotalRow(card.card) === row.total) {
      dispatch(addRow(generateNewId()));
    }
    return () => {};
  }, [card.card, dispatch, row.total, row.row]);

  // Handlers

  const handlerClickSave = () => {
    onSaveChanges();
  };

  // Functions
  const onSaveChanges = () => {
    dispatch(saveChangesToDatabase());
  };

  return (
    <SCanvas>
      {row.row.map((row) => {
        return (
          <div key={row.id}>
            {!isRowEmpty(card.card, row) && <RowBorder borderOf={row.id} />}
            <Row id={row.id} />
          </div>
        );
      })}
      <button onClick={handlerClickSave}>save</button>
    </SCanvas>
  );
}

export default Canvas;
