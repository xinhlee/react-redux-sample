import { createSlice } from "@reduxjs/toolkit";
import { RowState, RowType } from "./Type";

const rowState: RowState = {
  total: 0,
  row: [],
  removedRow: [],
};

export const rowSlice = createSlice({
  name: "row",
  initialState: rowState,
  reducers: {
    addRows: (state, action) => {
      state.row = action.payload.map((r: any) => {
        return {
          id: r.row_id,
          prev: r.prev,
          next: r.next,
        };
      });
      state.total = state.row.length;
    },
    addRow: (state, action) => {
      state.row.push({
        id: action.payload,
        prev:
          /* if no rows, set prev as undefined.*/
          state.row.length === 0
            ? undefined
            : state.row[state.row.length - 1].id,
        isNew: true,
      });

      // set the "next" properties of the row before
      if (state.row.length > 1) {
        state.row[state.row.length - 2].next = action.payload;
        state.row[state.row.length - 2].hasChanged = true;
      }

      state.total = state.row.length;
    },
    deleteRow: (state, action) => {
      let prev: string | undefined; // find the previous row
      let next: string | undefined; // find the next row
      let isNew: boolean | undefined; // whether it is in db before

      state.row = state.row.filter((r: RowType) => {
        if (r.id === action.payload) {
          prev = r.prev;
          next = r.next;
          isNew = r.isNew;
        }
        return r.id !== action.payload;
      });

      if (!isNew) state.removedRow.push(action.payload);

      // Set the "prev" and "next" properties of neighbors rows.
      state.row = state.row.map((r: RowType) => {
        if (r.id === prev)
          return {
            ...r,
            hasChanged: true,
            next: next,
          };
        if (r.id === next)
          return {
            ...r,
            hasChanged: true,
            prev: prev,
          };
        else return r;
      });

      state.total = state.row.length;
    },
    addRowInBetween: (state, action) => {
      // find the row to insert before
      let index = state.row
        .map((r: RowType) => r.id)
        .indexOf(action.payload.previousOf);

      // insert the row
      state.row.splice(index, 0, {
        id: action.payload.newRowId,
        isNew: true,
        prev: index === 0 ? undefined : state.row[index - 1].id,
        next: state.row[index].id,
      });

      // change prev row's "next"
      state.row[index - 1] = {
        ...state.row[index - 1],
        hasChanged: true,
        next: action.payload.newRowId,
      };

      // change next row's "prev"
      state.row[index + 1] = {
        ...state.row[index + 1],
        hasChanged: true,
        prev: action.payload.newRowId,
      };

      state.total = state.row.length;
    },
    resetNewAndChangedRow: (state) => {
      state.row = state.row.map((r) => {
        return {
          ...r,
          isNew: undefined,
          hasChanged: undefined,
        };
      });
      state.row[state.row.length - 1].isNew = true;
      state.removedRow = [];
    },
  },
});
