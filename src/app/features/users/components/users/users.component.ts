import {AfterViewInit, Component, ElementRef, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {UsersService} from "../../../../shared/services/users.service";
import {IUser} from "../../../../shared/interfaces/user.interface";
import {usersDataMock} from "../../../../../testing/mocks/usersDataMock";
import {MatButton} from "@angular/material/button";
import {animate, style, transition, trigger} from "@angular/animations";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomEmailValidator} from "../../../../shared/validators/custom-email.validator";
import {IBreadcrumb} from "../../../../shared/interfaces/breadcrumb.interface";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({opacity: 0, transform: 'scale(0.95)'}),
        animate('500ms', style({opacity: 1, transform: 'scale(1)'})),
      ]),
      transition(':leave', [
        animate('500ms', style({opacity: 0, transform: 'scale(0.95)'})),
      ]),
    ]),
  ],
})
export class UsersComponent implements AfterViewInit {
  userName = '';
  userEmail = '';
  toggleValue = false;

  inputs = Array(6).fill('');

  userFormGroup: FormGroup = new FormGroup({});

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

  @ViewChild('nameInput') nameInput!: ElementRef;
  @ViewChild('emailInput') emailInput!: ElementRef;
  @ViewChild('createUserButton') createUserButton!: MatButton;
  @ViewChild('verifyButton') verifyButton!: MatButton;

  @ViewChildren('codeInputs') codeInputs!: QueryList<ElementRef>;

  constructor(
    private usersService: UsersService,
    private fb: FormBuilder,
  ) {
    this.userFormGroup = this.fb.group({
      userName: ['', [Validators.required]],
      emailCopy: [{value: '', disabled: true}, [Validators.required]],
      email: ['', [Validators.required, CustomEmailValidator]],
      activeUser: [true, []],
    });
  }

  ngAfterViewInit() {
    this.nameInput.nativeElement.focus();
  }

  focusInput(): void {
    this.emailInput.nativeElement.focus();
  }

  focusButton(): void {
    this.createUserButton.focus();
  }

  addUser(): void {
    // const newUser: IUser = {
    //   id: null,
    //   name: this.userFormGroup.get('userName')?.value, // this.userName,
    //   email: this.userFormGroup.get('email')?.value,// this.userEmail,
    //   updatedAt: new Date().toISOString(),
    //   active: true,
    //   transactions: [],
    // };
    // const data = this.dataSource.data;
    // data.push(newUser);
  }

  setValue(event: any, index: number): void {
    const inputs = this.codeInputs.toArray();

    if (event.key === 'ArrowLeft' || event.key === 'Backspace') {
      setTimeout(() => inputs[index - 1]?.nativeElement.select());
    } else if (event.key === 'ArrowRight') {
      setTimeout(() => inputs[index + 1]?.nativeElement.select());
    } else if (!isNaN(+event.key)) {
      if (inputs[index].nativeElement?.value) {
        inputs[index].nativeElement.value = event.key;
      }

      setTimeout(() => inputs[index + 1]?.nativeElement.focus());

      if (index === inputs.length - 1) {
        setTimeout(() => this.verifyButton.focus());
      }
    }
  }

  submitForm(): void {
  }
}
