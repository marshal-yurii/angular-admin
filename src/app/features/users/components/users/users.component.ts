import {Component} from '@angular/core';
import {UsersService} from "../../../../shared/services/users.service";
import {IUser} from "../../../../shared/interfaces/user.interface";
import {usersDataMock} from "../../../../../testing/mocks/usersDataMock";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomEmailValidator} from "../../../../shared/validators/custom-email.validator";
import {IBreadcrumb} from "../../../../shared/interfaces/breadcrumb.interface";
import {fadeInOut} from "../../../../shared/animations/animations";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: [fadeInOut],
})
export class UsersComponent {
  users: IUser[] = usersDataMock;

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

  constructor(
    private usersService: UsersService,
    private fb: FormBuilder,
  ) {
  }
}
