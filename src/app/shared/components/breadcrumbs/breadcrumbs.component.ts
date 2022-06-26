import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IBreadcrumb} from "../../interfaces/breadcrumb.interface";

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent implements OnInit {
  @Input() breadcrumbs: IBreadcrumb[] = [];

  @Output() chosen: EventEmitter<IBreadcrumb> = new EventEmitter();

  identifyFn = (item: IBreadcrumb, index: number) => {
    return item.name;
  };

  constructor() { }

  ngOnInit(): void {
  }

}
