import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EstudiantesService } from '../services/estudiantes.service';
import { MatPaginatorModule } from '@angular/material/paginator';


@Component({
  selector: 'app-pagos',
  imports: [MatCardModule, MatDividerModule,MatPaginatorModule, MatSortModule, MatTableModule],
  templateUrl: './pagos.component.html',
  styleUrl: './pagos.component.css'
})
export class PagosComponent {


  public pagos: any;
  public dataSource: any;
  public displayedColumns = ['id', 'fecha', 'cantidad', 'type', 'status', 'nombre'];

  /*
  - @ViewChild: Decorador que permite acceder a un componente hijo del DOM
  */
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient,private estudianteService:EstudiantesService) { }

  ngOnInit(): void {
    this.estudianteService.getAllPagos().subscribe({
      next: data => {
        this.pagos = data;
        this.dataSource = new MatTableDataSource(this.pagos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: err => {
        console.log(err);
      }
    })
  }

}
