export type CardType = {
  id: number;
  name: string;
  row: string;
  hasChanged?: boolean;
  isNew?: boolean;
};

export type RowType = {
  id: string;
  isNew?: boolean;
  hasChanged?: boolean;
  prev?: string;
  next?: string;
};

export type NewRowType = {
  draggedId?: number;
  newRowId: string;
  previousOf: string;
};

export type DragItemType = {
  id: number;
  type: string;
};

export interface CardState {
  card: Array<CardType>;
  removedCard: Array<number>;
}

export interface DragState {
  draggedItem?: DragItemType;
  source?: string;
  target?: string;
}

export interface RowState {
  total: number;
  row: Array<RowType>;
  removedRow: Array<string>;
}
