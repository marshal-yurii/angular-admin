import {Component, OnInit} from "@angular/core";
import {IBreadcrumb} from "../../../../shared/interfaces/breadcrumb.interface";
import {IUser} from "../../../../shared/interfaces/user.interface";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../../../../shared/services/users.service";
import {take} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
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
      name: 'Edit User',
    },
  ];

  currentUser!: IUser;
  userFormGroup: FormGroup = new FormGroup({});

  stateList: string[] = [
    'NY',
    'TX',
    'AR',
    'CA',
    'CL',
    'WS D.C.',
  ];

  get alternativePhones() {
    return this.userFormGroup.controls['alternativePhoneNumbers'] as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.userFormGroup = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.email]],
      isActive: [true, []],
      phone: [null, [Validators.minLength(10)]],
      address: this.fb.group({
        street: ['', []],
        city: ['', []],
        state: ['', []],
      }),
      alternativePhoneNumbers: this.fb.array([]),
    });

    this.userService.currentUser
      .pipe(take(1))
      .subscribe((user: IUser) => {
        this.currentUser = user;
        this.userFormGroup.patchValue(user);
      });
  }

  addAlternativePhone() {
    const phoneForm = this.fb.group({
      phone: [null, [Validators.required, Validators.minLength(10)]],
    });

    this.alternativePhones.push(phoneForm);
  }

  deleteAlternativePhone(index: number) {
    this.alternativePhones.removeAt(index);
  }

  saveUser(form: FormGroup): void {
    if (form.valid) {
      this.userService.updateCurrentUser(form.getRawValue())
        .pipe(take(1))
        .subscribe((userId: number) => {
          this.router.navigateByUrl('/users/' + userId);
        });
    }
  }

  cancelEdit(): void {
    this.router.navigateByUrl('/users');
  }
}
