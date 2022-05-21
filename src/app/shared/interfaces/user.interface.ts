import {ITransaction} from "./transaction.interface";

export interface IUser {
  id: number | null;
  name: string;
  email?: string;
  updatedAt: string;
  transactions: ITransaction[];
  active: boolean;
  amount?: number;
  phone?: number;
}
