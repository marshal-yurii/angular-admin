import {ITransaction} from "./transaction.interface";

export interface IUser {
  id: number;
  name: string;
  email?: string;
  updatedAt: string;
  transactions: ITransaction[];
  active: boolean;
}
