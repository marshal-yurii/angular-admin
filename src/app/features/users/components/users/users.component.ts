import {Component, OnDestroy, OnInit} from '@angular/core';
import {IUser} from "../../../../shared/interfaces/user.interface";
import {usersDataMock} from "../../../../../testing/mocks/usersDataMock";
import {FormControl} from "@angular/forms";
import {IBreadcrumb} from "../../../../shared/interfaces/breadcrumb.interface";
import {fadeInOut} from "../../../../shared/animations/animations";
import {debounceTime, distinctUntilChanged, filter, startWith, switchMap} from "rxjs/operators";
import {combineLatest, Subject, takeUntil} from "rxjs";
import {AuthService} from "../../../../core/sevices/auth.service";
import {UsersService} from "../../../../shared/services/users.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: [fadeInOut],
})
export class UsersComponent implements OnInit, OnDestroy {
  usersInitial: IUser[] = usersDataMock;
  users: IUser[] = [...this.usersInitial];

  breadcrumbs: IBreadcrumb[] = [
    {
      path: '/',
      name: 'Dashboard',
    },
    {
      path: '',
      name: 'Users',
    },
  ];

  searchUserControl: FormControl = new FormControl('');

  onDestroy$: Subject<void> = new Subject<void>();

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {
  }

  ngOnInit(): void {
    this.searchUserControl.valueChanges
      .pipe(
        takeUntil(this.onDestroy$),
        distinctUntilChanged(),
        startWith(''),
        debounceTime(200),
        // exclude word 'third' from the search, the observable fires only if meet this condition
        filter((value: string) => value.toLowerCase() !== 'third'),
      )
      .subscribe((value: string) => {
        this.users = [...this.usersInitial.filter((user: IUser) => {
          return user.name.toLowerCase().includes(value.toLowerCase());
        })];
      });

    // get users list for exactly current user id and their state
    combineLatest([
      this.authService.getCurrentUser(),
      this.authService.getCurrentState(),
    ])
      .pipe(
        takeUntil(this.onDestroy$),
        switchMap(([user, state]: [any, number]) => {
          return this.usersService.getUsers({
            state,
            id: user?.id,
          });
        }),
      )
      .subscribe((users: IUser[]) => this.users = users);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
