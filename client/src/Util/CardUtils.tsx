import uniq from "lodash.uniq";
import { CardType, DragState, RowType } from "../Store/Type";
import { customAlphabet } from "nanoid";

export const isLastCard = (cards: CardType[], source?: string) => {
  return cards.filter((i: CardType) => i.row === source).length === 1
    ? true
    : false;
};

export const isRowEmpty = (cards: CardType[], row: RowType) => {
  return cards.filter((c) => c.row === row.id).length === 0 ? true : false;
};

export const getTotalRow = (cards: CardType[]) => {
  return uniq(cards.map((i: CardType) => i.row)).length;
};

export const generateNewId = () => {
  const nanoid = customAlphabet("123456789", 10);
  return nanoid();
};

export const canDropHere = (
  type: string,
  dragState: DragState,
  isBorder: boolean = false
) => {
  if (isBorder && dragState.draggedItem?.type === "card") return true;
  if (dragState.source === dragState.target) return false;
  if (type === "card" && dragState.draggedItem?.type === "card") return true;
  if (type === "item" && dragState.draggedItem?.type === "item") return true;

  return false;
};
