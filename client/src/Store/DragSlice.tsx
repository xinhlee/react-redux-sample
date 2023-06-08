import { createSlice } from "@reduxjs/toolkit";
import { DragState } from "./Type";

// const dragCardState: DragCardState = {
//   draggedCardId: undefined,
//   originalContainer: undefined,
//   targetContainer: undefined,
// };

// const dragItemState: DragItemState = {
//   draggedItemId: undefined,
//   originalCard: undefined,
//   targetCard: undefined,
// };

const dragState: DragState = {
  draggedItem: undefined,
  source: undefined,
  target: undefined,
};

export const dragSlice = createSlice({
  name: "drag",
  initialState: dragState,
  reducers: {
    setDraggedItem: (state, action) => {
      state.draggedItem = action.payload;
    },
    setSource: (state, action) => {
      state.source = action.payload;
    },
    setTarget: (state, action) => {
      state.target = action.payload;
    },
  },
});

// export const dragCardSlice = createSlice({
//   name: "dragCard",
//   initialState: dragCardState,
//   reducers: {
//     setDraggedCardId: (state, action) => {
//       state.draggedCardId = action.payload;
//     },
//     setOriginalContainer: (state, action) => {
//       state.originalContainer = action.payload;
//     },
//     setTargetContainer: (state, action) => {
//       state.targetContainer = action.payload;
//     },
//     resetCard: (state, action) => {
//       state.draggedCardId = undefined;
//       state.originalContainer = undefined;
//       state.targetContainer = undefined;
//     },
//   },
// });

// export const dragItemSlice = createSlice({
//   name: "dragItem",
//   initialState: dragItemState,
//   reducers: {
//     setDraggedItemId: (state, action) => {
//       state.draggedItemId = action.payload;
//     },
//     setOriginalCard: (state, action) => {
//       state.originalCard = action.payload;
//     },
//     setTargetCard: (state, action) => {
//       state.targetCard = action.payload;
//     },
//     resetItem: (state, action) => {
//       state.draggedItemId = undefined;
//       state.originalCard = undefined;
//       state.targetCard = undefined;
//     },
//   },
// });
