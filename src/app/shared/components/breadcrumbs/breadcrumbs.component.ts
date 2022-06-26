import {Component, EventEmitter, Input, OnInit, Output, TrackByFunction} from '@angular/core';
import {IBreadcrumb} from "../../interfaces/breadcrumb.interface";

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent implements OnInit {
  @Input() breadcrumbs: IBreadcrumb[] = [];

  @Output() chosen: EventEmitter<IBreadcrumb> = new EventEmitter();

  identifyFn: TrackByFunction<IBreadcrumb> = (index: number, item: IBreadcrumb) => item.name;

  constructor() { }

  ngOnInit(): void {
  }

}
