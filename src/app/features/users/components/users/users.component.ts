import {Component, OnDestroy, OnInit} from '@angular/core';
import {IUser} from "../../../../shared/interfaces/user.interface";
import {usersDataMock} from "../../../../../testing/mocks/usersDataMock";
import {FormControl} from "@angular/forms";
import {IBreadcrumb} from "../../../../shared/interfaces/breadcrumb.interface";
import {fadeInOut} from "../../../../shared/animations/animations";
import {debounceTime, distinctUntilChanged, filter, startWith, switchMap} from "rxjs/operators";
import {combineLatest, Subject, takeUntil} from "rxjs";
import {Store} from "@ngxs/store";
import {GetUsers} from "../../../../shared/states/users/users.actions";
import {GetCurrentState, GetCurrentUser} from "../../../../shared/states/auth/auth.actions";
import {UserRolesEnum} from "../../../../shared/enums/user-roles.enum";
import {AuthState} from "../../../../shared/states/auth/auth.state";

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
    private store: Store,
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

    // simplified emulation of API
    combineLatest([
      this.store.dispatch(new GetCurrentUser()),
      this.store.dispatch(new GetCurrentState()),
    ])
      .pipe(
        takeUntil(this.onDestroy$),
        switchMap(([_, __]: [any, any]) => {
          return this.store.dispatch(new GetUsers({
            state: this.store.selectSnapshot(AuthState.currentState),
            id: this.store.selectSnapshot(AuthState.currentUser)?.id,
          }));
        }),
      )
      .subscribe(() => {}); // you don't need to retrieve user here, let's do it at the NGXS state instead
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
