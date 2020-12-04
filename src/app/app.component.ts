import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MatTableDataSource } from "@angular/material/table";
import { SelectionModel } from "@angular/cdk/collections";
export interface DataDemo {
  essay: any;
  place_of_publication: string;
  start_year: number;
  publisher: string;
  county: any;
  edition: null;
  frequency: string;
  url: string;
  id: string;
  country: string;
  type: string;
  title_normal: string;
  oclc: string;
}

const ELEMENT_DATA: DataDemo[] = [];

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "CodeSandbox";
  displayedColumns: string[] = [
    "select",
    "essay",
    "place_of_publication",
    "start_year",
    "publisher"
  ];
  dataSource = new MatTableDataSource<DataDemo>(ELEMENT_DATA);
  selection = new SelectionModel<DataDemo>(true, []);
  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.httpClient
      .get(
        "https://chroniclingamerica.loc.gov/search/titles/results/?terms=michigan&format=json&page=1&itemsPerPage=10"
      )
      .subscribe((resp: any) => {
        console.log("resp", resp);
        this.dataSource.data = resp.items;
      });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected($event?) {
    console.log("event", $event);
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.dataSource.data.forEach((row: any) =>
        this.selection.deselect(row.id)
      );
    } else {
      this.dataSource.data.forEach((row: any) => this.selection.select(row.id));
    }
  }
}
