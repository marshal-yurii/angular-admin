import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {IUser} from "../../interfaces/user.interface";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {Router} from "@angular/router";
import {Store} from "@ngxs/store";
import {UpdateCurrentUser} from "../../states/users/users.actions";

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent implements OnInit {
  @Input() set usersList(users: IUser[]) {
    this.users = users;
    this.initUsersDataSource();
  }

  @Input() isWidget!: boolean;

  users: IUser[] = [];

  displayedColumns: string[] = ['name', 'email', 'status'];
  dataSource: MatTableDataSource<IUser> = new MatTableDataSource<IUser>([]);

  phoneNumber: number[] = [];
  editMode: boolean[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private store: Store,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    if (!this.isWidget) {
      this.displayedColumns = [...this.displayedColumns, ...['updatedAt', 'amount', 'phone', 'actions']];
    }

    this.initUsersDataSource();
  }

  editUser(user: IUser): void {
    this.store.dispatch(new UpdateCurrentUser(user))
    this.router.navigateByUrl('users/user/' + user.id);
  }

  removeUser(i: number): void {
    const users = [...this.dataSource.data];
    users.splice(i, 1);
    this.dataSource.data = users;
  }

  savePhone(i: number): void {
    const users = [...this.dataSource.data];
    users[i].phone = this.phoneNumber[i];
    this.dataSource.data = users;
    this.editMode[i] = false;
  }

  cancelPhone(i: number): void {
    const users = [...this.dataSource.data];
    this.phoneNumber[i] = users[i].phone as number;
    this.dataSource.data = users;
    this.editMode[i] = false;
  }

  private initUsersDataSource(): void {
    this.editMode = Array(this.users.length).fill(false);
    this.phoneNumber = this.users.map((el: IUser) => el.phone as number);
    this.dataSource.data = [...this.users];
    this.dataSource.paginator = this.paginator;
    this.store.dispatch(new UpdateCurrentUser(this.dataSource.data[this.dataSource.data.length - 1]));
  }
}
