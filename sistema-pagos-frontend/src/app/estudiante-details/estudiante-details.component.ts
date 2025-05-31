import { Component } from '@angular/core';
import { Pago } from '../models/estudiante.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { EstudiantesService } from '../services/estudiantes.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';



@Component({
  selector: 'app-estudiante-details',
  standalone: true,
  imports: [
    CommonModule, 
    MatToolbarModule, 
    MatCardModule, 
    MatDivider, 
    MatTableModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './estudiante-details.component.html',
  styleUrl: './estudiante-details.component.css'
})
export class EstudianteDetailsComponent {

  estudianteCodigo!: string;
  pagosEstudiane!: Array<Pago>;
  pagosDataSource!: MatTableDataSource<Pago>;

  public displayedColumns = ['id', 'fecha', 'cantidad', 'type', 'status', 'nombre'];

  constructor(private activatedRoute: ActivatedRoute, private estudiantesService: EstudiantesService, private router: Router) {

  }
  ngOnInit(): void {
    this.estudianteCodigo = this.activatedRoute.snapshot.params['codigo'];
    if (this.estudianteCodigo) {
      this.estudiantesService.getPagosDeEstudiante(this.estudianteCodigo).subscribe({
        next: value => {
          this.pagosEstudiane = value;
          this.pagosDataSource = new MatTableDataSource<Pago>(this.pagosEstudiane);
        },
        error: err => {
          console.log(err);
        }
      });
    }
  }

  agregarPago() {
    this.router.navigateByUrl(`/admin/new-pago/${this.estudianteCodigo}`);
  }

}
