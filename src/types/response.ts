import { type IQuestionKey } from "./question";
export interface IResponse {
  id: string;
  value: number;
}

export type IResponseSet = {
  [K in IQuestionKey]: number;
};
