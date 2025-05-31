import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { Estudiante } from '../models/estudiante.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EstudiantesService } from '../services/estudiantes.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-estudiantes',
  standalone: true,
  imports: [MatCardModule, MatDividerModule, MatButtonModule, MatTableModule, CommonModule],
  templateUrl: './estudiantes.component.html',
  styleUrl: './estudiantes.component.css'
})
export class EstudiantesComponent implements OnInit {

  estudiantes!: Array<Estudiante>;
  estudiantesDataSource!: MatTableDataSource<Estudiante>;
  displayedColumns: string[] = ['id','nombre','apellido','codigo','programaId','pagos']

  constructor(private estudianteService: EstudiantesService,private router:Router) {
   
  }

  ngOnInit(): void {
    this.estudianteService.getAllEstudiantes().subscribe({
      next: value => {
        this.estudiantes = value;
        this.estudiantesDataSource = new MatTableDataSource<Estudiante>(this.estudiantes);
      },
      error: err => {
        console.log(err);
      }
    })
  }

  listarPagosDeEstudiante(estudiante:Estudiante){
    this.router.navigateByUrl(`/admin/estudiantes/${estudiante.codigo}`)
  }

}
