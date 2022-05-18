import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  users: any[] = [];

  constructor(
    private datePipe: DatePipe,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.datePipe.transform(new Date(), 'MM/dd/yyyy');

    this.authService.getUsers().subscribe((users: any) => this.users = users)
  }

}
