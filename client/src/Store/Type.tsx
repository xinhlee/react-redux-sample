export type CardType = {
  id: number;
  name: string;
  row: string;
  isNew?: boolean;
};

export type RowType = {
  id: string;
  isNewRow: boolean;
  isNew?: boolean;
  prev?: string;
};

export type DragItemType = {
  id: number;
  type: string;
};

export interface CardState {
  card: Array<CardType>;
}

export interface DragState {
  draggedItem?: DragItemType;
  source?: string;
  target?: string;
}

// export interface DragCardState {
//   draggedCardId?: string;
//   originalContainer?: number;
//   targetContainer?: number;
// }

// export interface DragItemState {
//   draggedItemId?: string;
//   originalCard?: number;
//   targetCard?: number;
// }

export interface RowState {
  total: number;
  row: Array<RowType>;
}
