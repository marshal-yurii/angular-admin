import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../../sevices/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomEmailValidator} from "../../../../shared/validators/custom-email.validator";
import {Router} from "@angular/router";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  wrongUser!: boolean;

  private readonly onDestroy$: Subject<void> = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, CustomEmailValidator]],
      password: ['', [Validators.required]],
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  login(): void {
    this.wrongUser = false;

    this.authService.login(this.loginForm.value)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((success: boolean) => {
        if (success) {
          this.router.navigateByUrl('/dashboard');
        } else {
          this.wrongUser = true;
        }
      });
  }
}
