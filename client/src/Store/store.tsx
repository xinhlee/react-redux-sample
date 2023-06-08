import { configureStore } from "@reduxjs/toolkit";
import { cardSlice } from "./CardSlice";
import { dragSlice } from "./DragSlice";
import { rowSlice } from "./RowSlice";

export const { add, deleteCard, changeRow } = cardSlice.actions;

// export const {
//   setDraggedCardId,
//   setOriginalContainer,
//   setTargetContainer,
//   resetCard,
// } = dragCardSlice.actions;

// export const { setDraggedItemId, setOriginalCard, setTargetCard, resetItem } =
//   dragItemSlice.actions;
export const { setDraggedItem, setSource, setTarget } = dragSlice.actions;

export const { addRows, addRow, deleteRow, addRowInBetween } = rowSlice.actions;

const store = configureStore({
  reducer: {
    card: cardSlice.reducer,
    drag: dragSlice.reducer,
    row: rowSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
