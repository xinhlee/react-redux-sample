import { createSlice } from "@reduxjs/toolkit";
import { RowState, RowType } from "./Type";

const rowState: RowState = {
  total: 0,
  row: [],
};

export const rowSlice = createSlice({
  name: "row",
  initialState: rowState,
  reducers: {
    addRows: (state, action) => {
      state.row = action.payload.map((r: any) => {
        return {
          id: r.row_id,
          isNewRow: false,
        };
      });
      state.total = state.row.length;
    },
    addRow: (state, action) => {
      state.row = state.row.map((i: RowType) => {
        return {
          id: i.id,
          isNewRow: false,
          isNew: i.isNew,
          prev: i.prev,
        };
      });
      state.row.push({
        id: action.payload,
        isNewRow: true,
        isNew: true,
        prev: state.row[state.row.length - 1].id,
      });
      state.total = state.row.length;
    },
    deleteRow: (state, action) => {
      state.row = state.row.filter((r: RowType) => r.id !== action.payload);
      state.total = state.row.length;
    },
    addRowInBetween: (state, action) => {
      let index = state.row
        .map((r: RowType) => r.id)
        .indexOf(action.payload.previousOf);

      state.row.splice(index, 0, {
        id: action.payload.id,
        isNewRow: false,
        isNew: true,
        prev: state.row[index - 1].id,
      });

      state.total = state.row.length;
    },
  },
});
