import {Component, OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";
import {IUser} from "../../shared/interfaces/user.interface";
import {ITransaction} from "../../shared/interfaces/transaction.interface";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DatePipe],
})
export class DashboardComponent implements OnInit {
  currentDate!: string;
  currentUser: IUser = {} as IUser;

  transactions: ITransaction[] = [];

  days: string[] = [
    'Yesterday',
    'Today',
    'Tomorrow',
  ];

  daysCopyOne: string[] = [];
  daysCopyTwo: string[] = [];

  includesSymbolW: boolean[] = []; // real example: if includes edit-user inside url then add an item to breadcrumbs
  isEveryLengthMoreFive!: boolean; // real example: if more than 155 symbols then truncate the string
  isAnyString!: boolean; // real example: if any is an array then use algorithm to flat the value recursively
  isAnyNumber!: boolean;

  constructor(
    private datePipe: DatePipe,
  ) {
  }

  ngOnInit(): void {
    this.updateCurrentDate(this.getFormattedDate);
    this.updateUser();

    this.daysCopyOne = this.days;
    this.daysCopyTwo = [...this.days];

    this.days[0] = 'One year ago';

    this.includesSymbolW = this.days.map(el => el.includes('w'));
    this.isEveryLengthMoreFive = this.days.every(el => el.length > 5);
    this.isAnyString = this.days.some(el => typeof el === 'string');
    this.isAnyNumber = this.days.some(el => typeof el === 'number');
    this.days.forEach(el => el + '1');
    this.days = this.days.map(el => el.replace('To', ' ').trim());
  }

  getFormattedDate = (date: Date): void => {
    this.currentDate = `Current date: ${this.datePipe.transform(date, 'MM.dd.yyyy hh:mm a')}`;
  }

  private updateCurrentDate(callback: any): void {
    const date = new Date();
    callback(date);
  }

  private updateUser(date: Date = new Date(), active: boolean = false): void {
    this.currentUser = {
      id: -1,
      name: 'New user',
      updatedAt: date.toISOString(),
      transactions: [...this.transactions],
      active,
    }
  }
}
