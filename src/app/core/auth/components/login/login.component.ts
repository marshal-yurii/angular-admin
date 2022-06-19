import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomEmailValidator} from "../../../../shared/validators/custom-email.validator";
import {Router} from "@angular/router";
import {Observable, Subject, takeUntil} from "rxjs";
import {Select, Store} from "@ngxs/store";
import {Login} from "../../../../shared/states/auth/auth.actions";
import {AuthState} from "../../../../shared/states/auth/auth.state";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  wrongUser!: boolean;

  private readonly onDestroy$: Subject<void> = new Subject<void>();

  @Select(AuthState.loginStatus) loginStatus$!: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store,
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, CustomEmailValidator]],
      password: ['', [Validators.required]],
    });

    this.loginStatus$.pipe(takeUntil(this.onDestroy$))
      .subscribe((success: boolean) => {
        if (success !== undefined) {
          if (success) {
            this.router.navigateByUrl('/');
          } else {
            this.wrongUser = true;
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  login(): void {
    this.wrongUser = false;

    this.store.dispatch(new Login(this.loginForm.value))
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((_: any) => {}); // dispatcher returns whole store, subscribe to @Select at ngOnInit()
  }
}
