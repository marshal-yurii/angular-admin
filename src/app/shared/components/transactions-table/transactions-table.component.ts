import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {Router} from "@angular/router";
import {ITransaction} from "../../interfaces/transaction.interface";
import {TransactionStatusEnum} from "../../enums/transaction-status.enum";
import {enumToArray} from "../../helpers/utils";

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.scss'],
})
export class TransactionsTableComponent implements OnInit {
  @Input() transactionsList: ITransaction[] = [];
  @Input() isWidget!: boolean;
  @Input() showCreator!: boolean;

  displayedColumns: string[] = ['ssid', 'name', 'status'];
  dataSource: MatTableDataSource<ITransaction> = new MatTableDataSource<ITransaction>([]);

  transactionStatuses = enumToArray(TransactionStatusEnum);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    if (!this.isWidget) {
      this.displayedColumns = [...this.displayedColumns, ...['createdAt']];

      if (this.showCreator) {
        this.displayedColumns.push('createdBy');
      }
    }

    this.dataSource.data = [...this.transactionsList];
    this.dataSource.paginator = this.paginator;
  }
}
