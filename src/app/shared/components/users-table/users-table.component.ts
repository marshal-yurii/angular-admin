import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {IUser} from "../../interfaces/user.interface";
import {MatTableDataSource} from "@angular/material/table";
import {UsersService} from "../../services/users.service";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent implements OnInit {
  @Input() usersList: IUser[] = [];
  @Input() isWidget!: boolean;

  displayedColumns: string[] = ['name', 'email', 'active'];
  dataSource: MatTableDataSource<IUser> = new MatTableDataSource<IUser>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private usersService: UsersService,
  ) {
  }

  ngOnInit(): void {
    if (!this.isWidget) {
      this.displayedColumns.push('updatedAt');
    }

    this.dataSource.data = this.usersList;
    this.dataSource.paginator = this.paginator;
    this.usersService.currentUser.next(this.dataSource.data[this.dataSource.data.length - 1]);
  }

}
