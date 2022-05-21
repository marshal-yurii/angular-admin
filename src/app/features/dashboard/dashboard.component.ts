import {Component, OnInit, ViewChild} from '@angular/core';
import {DatePipe} from "@angular/common";
import {IUser} from "../../shared/interfaces/user.interface";
import {ITransaction} from "../../shared/interfaces/transaction.interface";
import {BaseChartDirective} from "ng2-charts";
import {ChartConfiguration, ChartType} from "chart.js";
import {viewsDataMock} from "../../../testing/mocks/viewsDataMock";
import {UsersService} from "../../shared/services/users.service";
import {AuthService} from "../../core/sevices/auth.service";
import {usersDataMock} from "../../../testing/mocks/usersDataMock";
import {fadeInOut} from "../../shared/animations/animations";
import {transactionsDataMock} from "../../../testing/mocks/transactionsDataMock";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DatePipe],
  animations: [fadeInOut],
})
export class DashboardComponent implements OnInit {
  currentDate!: string;
  currentUser: IUser = {} as IUser;

  users: IUser[] = [];
  transactions: ITransaction[] = [];

  today: Date = new Date();

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

  disableRecolor!: boolean;

  showMessage = false;

  showTransactionsTile = true;

  public lineChartData: any = {
    datasets: [
      {
        data: viewsDataMock,
        label: 'Views per year',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
    ],
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      x: {},
      'y-axis-0':
        {
          position: 'left',
        },
      'y-axis-1': {
        position: 'right',
        grid: {
          color: 'rgba(255,0,0,0.3)',
        },
        ticks: {
          color: 'red'
        }
      }
    },
    plugins: {
      legend: {display: true},
    }
  };

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  constructor(
    private datePipe: DatePipe,
    private authService: AuthService,
    private usersService: UsersService,
  ) {
  }

  ngOnInit(): void {
    this.users = usersDataMock;
    this.transactions = transactionsDataMock;

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

    this.usersService.currentUser
      .subscribe((user: IUser) => {
        if (user?.name) {
          this.showMessage = true;
          this.currentUser = user;

          setTimeout(() => {
            this.showMessage = false;
          }, 3000);
        }
      });
  }

  toggleTransactionsTile(ev: boolean): void {
    this.showTransactionsTile = ev;
  }

  getFormattedDate = (date: Date): void => {
    this.currentDate = `Current date: ${this.datePipe.transform(date, 'MM.dd.yyyy hh:mm a')}`;
  }

  randomize(): void {
    for (let i = 0; i < this.lineChartData.datasets.length; i++) {
      for (let j = 0; j < this.lineChartData.datasets[i].data.length; j++) {
        this.lineChartData.datasets[i].data[j] = DashboardComponent.generateNumber(i);
      }
    }
    this.chart?.update();
  }

  changeColor(): void {
    this.lineChartData.datasets[0].borderColor = 'green';
    this.lineChartData.datasets[0].backgroundColor = `rgba(0, 255, 0, 0.3)`;
    this.disableRecolor = true;

    this.chart?.update();
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

  private static generateNumber(i: number): number {
    return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
  }
}
