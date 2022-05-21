import {IUser} from "../../app/shared/interfaces/user.interface";

export const usersDataMock: IUser[] = [
  {
    id: 0,
    name: 'First User',
    email: 'first_user@gmail.com',
    updatedAt: '2022-05-16T02:00:00Z',
    transactions: [],
    active: true,
    amount: 40000,
    phone: 9985667345,
  },
  {
    id: 1,
    name: 'Second User',
    email: 'second_user@gmail.com',
    updatedAt: '2022-05-16T02:00:00Z',
    transactions: [],
    active: true,
    amount: 30000,
  },
  {
    id: 2,
    name: 'Third User',
    email: 'third_user@gmail.com',
    updatedAt: '2022-05-16T02:00:00Z',
    transactions: [],
    active: false,
    phone: 9985667386,
  },
];
