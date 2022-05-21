import {TransactionStatusEnum} from "../enums/transaction-status.enum";

export interface ITransaction {
  id: number;
  ssid: number;
  name: string;
  createdAt: string;
  createdBy?: string;
  status: TransactionStatusEnum;
}
