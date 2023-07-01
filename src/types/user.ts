import { type IResponseSet } from "./response";

export interface User {
  pub: string;
  name: string;
  avatar: string;
  handle: string;
  responses?: IResponseSet;
}
