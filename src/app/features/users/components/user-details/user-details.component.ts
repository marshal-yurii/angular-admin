import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {IBreadcrumb} from "../../../../shared/interfaces/breadcrumb.interface";
import {ActivatedRoute} from "@angular/router";
import {IUser} from "../../../../shared/interfaces/user.interface";
import {usersDataMock} from "../../../../../testing/mocks/usersDataMock";
import {ITransaction} from "../../../../shared/interfaces/transaction.interface";
import {transactionsDataMock} from "../../../../../testing/mocks/transactionsDataMock";
import {UserRolesEnum} from "../../../../shared/enums/user-roles.enum";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  currentUser!: IUser;

  breadcrumbs: IBreadcrumb[] = [
    {
      path: '/',
      name: 'Dashboard',
    },
    {
      path: '/users',
      name: 'Users',
    },
    {
      path: '',
      name: 'User Details',
    },
  ];

  isSuperAdmin!: boolean;

  transactions: ITransaction[] = [];

  private readonly onDestroy$: Subject<void> = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    const userId = +this.route.snapshot.params['id'];
    this.currentUser = usersDataMock.find(el => el.id === userId) as IUser;
    this.transactions = transactionsDataMock;

    this.route.data
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((data: any) => {
        this.isSuperAdmin = data.role === UserRolesEnum.SuperAdmin;
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
