import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {IUser} from "../../interfaces/user.interface";
import {MatTableDataSource} from "@angular/material/table";
import {UsersService} from "../../services/users.service";
import {MatPaginator} from "@angular/material/paginator";
import {Router} from "@angular/router";

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent implements OnInit {
  @Input() usersList: IUser[] = [];
  @Input() isWidget!: boolean;

  displayedColumns: string[] = ['name', 'email', 'status'];
  dataSource: MatTableDataSource<IUser> = new MatTableDataSource<IUser>([]);

  phoneNumber: number[] = [];
  editMode: boolean[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private usersService: UsersService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    if (!this.isWidget) {
      this.displayedColumns = [...this.displayedColumns, ...['updatedAt', 'amount', 'phone', 'actions']];
    }

    this.editMode = Array(this.usersList.length).fill(false);
    this.phoneNumber = this.usersList.map((el: IUser) => el.phone as number);
    this.dataSource.data = [...this.usersList];
    this.dataSource.paginator = this.paginator;
    this.usersService.currentUser.next(this.dataSource.data[this.dataSource.data.length - 1]);
  }

  editUser(user: IUser): void {
    this.usersService.currentUser.next(user);
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
}
