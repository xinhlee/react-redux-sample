import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CardState, CardType, NewRowType, RowType } from "./Type";
import {
  RootState,
  addRowInBetween,
  addRows,
  changeRow,
  resetNewAndChangedCard,
  resetNewAndChangedRow,
} from "./store";

const cardState: CardState = {
  card: [],
  removedCard: [],
};

export const cardSlice = createSlice({
  name: "card",
  initialState: cardState,
  reducers: {
    add: (state, action) => {
      state.card.push(action.payload);
    },
    deleteCard: (state, action) => {
      let isNew; // check if in db

      state.card = state.card.filter((i: CardType) => {
        isNew = i.isNew;
        return i.id !== action.payload;
      });

      if (!isNew) state.removedCard.push(action.payload);
    },
    changeRow: (state, action) => {
      let indexOfChangedCard = state.card.findIndex(
        (i) => i.id === action.payload.id
      );

      let changedCard = {
        ...state.card.splice(indexOfChangedCard, 1)[0],
        hasChanged: true,
        row: action.payload.row,
      };

      state.card.push(changedCard);
    },
    resetNewAndChangedCard: (state) => {
      state.card = state.card.map((c) => {
        return {
          ...c,
          isNew: undefined,
          hasChanged: undefined,
        };
      });
      state.removedCard = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCard.fulfilled, (state, action) => {
      state.card = action.payload;
    });

    builder.addCase(saveChangesToDatabase.fulfilled, (state, action) => {});
  },
});

export const addCardInBetweenRows = createAsyncThunk(
  "card/addCardInBetweenRows",
  async (row: NewRowType, { dispatch }) => {
    dispatch(addRowInBetween(row));
    dispatch(changeRow({ id: row.draggedId, row: row.newRowId }));
  }
);

export const fetchCard = createAsyncThunk(
  "card/fetchCard",
  async (_, { dispatch }) => {
    let response = await fetch("/api/card/fetchCard").then((response) =>
      response.json()
    );

    dispatch(addRows(response.rowDetail));

    return response.cardDetail;
  }
);

export const saveChangesToDatabase = createAsyncThunk(
  "card/saveChangesToDatabase",
  async (_, { dispatch, getState }) => {
    const state = getState() as RootState;

    let changedRow = state.row.row.slice(0, -1);
    changedRow = changedRow.filter((r: RowType) => {
      return (
        r.hasChanged === true || (r.isNew === true && r.next !== undefined)
      );
    });

    let changedCard = state.card.card.filter((c: CardType) => {
      return c.hasChanged === true || c.isNew === true;
    });

    fetch("/api/card/saveCards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        changedCard: changedCard,
        changedRow: changedRow,
        removedCard: state.card.removedCard,
        removedRow: state.row.removedRow,
      }),
    })
      .then((response) => {
        dispatch(resetNewAndChangedCard());
        dispatch(resetNewAndChangedRow());
        return response;
      })
      .catch((error) => error);
  }
);

export const selectCard = (state: CardState) => state.card;
