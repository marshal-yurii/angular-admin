import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {UsersService} from "../../../../shared/services/users.service";
import {IUser} from "../../../../shared/interfaces/user.interface";
import {usersDataMock} from "../../../../../testing/mocks/usersDataMock";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'email', 'updatedAt', 'active'];
  dataSource = new MatTableDataSource<IUser>(usersDataMock);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private usersService: UsersService,
  ) {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.usersService.currentUser.next(this.dataSource.data[this.dataSource.data.length - 1]);
  }

}
