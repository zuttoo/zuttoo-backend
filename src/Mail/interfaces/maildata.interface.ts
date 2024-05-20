import { RmOrderArg } from "../templates/RMOrderUpdate";

export interface Maildata {
  mail: string;
  subject: string;
  data: string;
  datamain: RmOrderArg
}
