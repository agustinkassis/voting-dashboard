import type { IResponseBundle } from "./response";
import type IElection from "./election";

export default interface IBallot {
  election: IElection;
  responses?: IResponseBundle;
}
