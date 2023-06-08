import uniq from "lodash.uniq";
import { CardType, DragState } from "../Store/Type";
import { customAlphabet } from "nanoid";

export const isLastCard = (cards: CardType[], source?: string) => {
  return cards.filter((i: CardType) => i.row === source).length === 1
    ? true
    : false;
};

export const getTotalRow = (cards: CardType[]) => {
  return uniq(cards.map((i: CardType) => i.row)).length;
};

export const generateNewId = () => {
  const nanoid = customAlphabet("123456789", 10);
  return nanoid();
};

export const canDropHere = (type: string, dragState: DragState) => {
  if (type === "card" && dragState.draggedItem?.type === "card") return true;
  if (type === "item" && dragState.draggedItem?.type === "item") return true;
  return false;
};
