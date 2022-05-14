import {Component, OnInit} from '@angular/core';
import {IVisitor} from "../../shared/interfaces/visitor.interface";
import {visitorsDataMock} from "../../../testing/mocks/visitorsDataMock";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {MatTableDataSource} from "@angular/material/table";

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  visitors: IVisitor[] = [];
  currentVisitor!: IVisitor;

  users: string[] = [
    'John',
    'David',
    'Julia',
  ];

  phone = 8094753456;

  columns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource: MatTableDataSource<PeriodicElement> = new MatTableDataSource();

  constructor() {
  }

  ngOnInit(): void {
    this.dataSource.data = ELEMENT_DATA;

    const obj1 = {
      name: '',
      email: '',
    }

    let url = 'https://google.com';
    url = 'jira';

    obj1.name = 'Test';

    const setVisitorName = () => {
      obj1.name = url;
    };

    this.visitors.forEach((el: IVisitor) => {
      el.fullName = obj1.name;
    });

    this.getAllVisitors();
    this.currentVisitor = {...this.visitors[1], ...this.visitors[0]};

    const isJuliaExisting = this.users.includes(' Julia '.trim());
  }

  getAllVisitors(id: number = 0, url?: string) {
    // TODO: get real endpoint
    this.visitors = [...visitorsDataMock] as IVisitor[];
    const currentVisitor = '';

    return {
      currentVisitor,
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  }
}
