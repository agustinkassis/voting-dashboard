export interface IQuestion {
  id: IQuestionKey;
  label: string;
}

export type IQuestionKey =
  | "honestidad"
  | "sinergia"
  | "libertad"
  | "racionalidad"
  | "humildad"
  | "merito"
  | "innovacion";
