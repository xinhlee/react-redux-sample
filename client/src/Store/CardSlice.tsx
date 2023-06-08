import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CardState, CardType, RowType } from "./Type";
import { RootState, addRows } from "./store";

const cardState: CardState = {
  card: [],
};

export const cardSlice = createSlice({
  name: "card",
  initialState: cardState,
  reducers: {
    add: (state, action) => {
      state.card.push(action.payload);
    },
    deleteCard: (state, action) => {
      state.card = state.card.filter((i: CardType) => i.id !== action.payload);
    },
    changeRow: (state, action) => {
      let indexOfChangedCard = state.card.findIndex(
        (i) => i.id === action.payload.id
      );

      let changedCard = state.card.splice(indexOfChangedCard, 1)[0];
      changedCard.row = action.payload.row;

      state.card.push(changedCard);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCard.fulfilled, (state, action) => {
      state.card = action.payload;
    });

    builder.addCase(saveChangesToDatabase.fulfilled, (state, action) => {
      alert(action.payload);
    });
  },
});

export const fetchCard = createAsyncThunk(
  "card/fetchCard",
  async (_, { dispatch }) => {
    let response = await fetch("/api/card/fetchCard").then((response) =>
      response.json()
    );

    dispatch(addRows(response.rowDetail));

    return response.data;
  }
);

export const saveChangesToDatabase = createAsyncThunk(
  "card/saveChangesToDatabase",
  async (_, { dispatch, getState }) => {
    const state = getState() as RootState;

    let newCards = state.card.card.filter((c: CardType) => c.isNew === true);
    let newRows = state.row.row.filter((r: RowType) => r.isNew === true);

    let response = await fetch("/api/card/saveCards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        newCards: newCards,
        newRows: newRows,
      }),
    }).then((response) => response.json());

    return response;
  }
);

export const selectCard = (state: CardState) => state.card;
