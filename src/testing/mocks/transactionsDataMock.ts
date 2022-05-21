import {ITransaction} from "../../app/shared/interfaces/transaction.interface";
import {TransactionStatusEnum} from "../../app/shared/enums/transaction-status.enum";

export const transactionsDataMock: ITransaction[] = [
  {
    id: 0,
    name: 'Transferring',
    ssid: 578476584583439,
    createdAt: '2022-05-16T02:00:00Z',
    createdBy: 'First User',
    status: TransactionStatusEnum.Pending,
  },
  {
    id: 1,
    name: 'Payment',
    ssid: 398547594858458,
    createdAt: '2022-05-16T02:00:00Z',
    createdBy: 'Second User',
    status: TransactionStatusEnum.Success,
  },
  {
    id: 2,
    name: 'Transferring',
    ssid: 732864834743483,
    createdAt: '2022-05-16T02:00:00Z',
    createdBy: 'Third User',
    status: TransactionStatusEnum.Denied,
  },
];
