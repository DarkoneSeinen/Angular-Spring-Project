import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EstudiantesService } from '../services/estudiantes.service';
import { Estudiante } from '../models/estudiante.model';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';

interface EstudianteExcel {
  codigo: string;
  nombre: string;
  apellido: string;
  programaId: string;
}

@Component({
  selector: 'app-load-estudiantes',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './load-estudiantes.component.html',
  styleUrl: './load-estudiantes.component.css'
})
export class LoadEstudiantesComponent {
  selectedFile: File | null = null;
  previewData: Estudiante[] = [];
  displayedColumns: string[] = ['codigo', 'nombre', 'apellido', 'programaId'];

  constructor(private estudiantesService: EstudiantesService) {}

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const element = event.currentTarget as HTMLElement;
    element.classList.add('dragover');
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const element = event.currentTarget as HTMLElement;
    element.classList.remove('dragover');
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const element = event.currentTarget as HTMLElement;
    element.classList.remove('dragover');
    
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFile(files[0]);
    }
  }

  onFileSelected(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    const files = element.files;
    if (files && files.length > 0) {
      this.handleFile(files[0]);
    }
  }

  handleFile(file: File) {
    if (!file.name.match(/\.(xlsx|xls|csv)$/)) {
      Swal.fire({
        icon: 'error',
        title: 'Formato no válido',
        text: 'Por favor, selecciona un archivo Excel o CSV'
      });
      return;
    }

    this.selectedFile = file;
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      try {
        const binaryString = e.target?.result;
        const workbook = XLSX.read(binaryString, { type: 'binary' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json<EstudianteExcel>(worksheet);
        
        // Validar y transformar los datos
        this.previewData = jsonData.map(row => ({
          id: '',  // Se generará en el backend
          codigo: row.codigo,
          nombre: row.nombre,
          apellido: row.apellido,
          programaId: row.programaId,
          foto: ''  // Campo opcional
        }));

      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error al procesar el archivo',
          text: 'El archivo no tiene el formato esperado'
        });
        this.clearFile();
      }
    };
    reader.readAsBinaryString(file);
  }

  clearFile() {
    this.selectedFile = null;
    this.previewData = [];
  }

  uploadFile() {
    if (!this.selectedFile || this.previewData.length === 0) return;

    // Validar datos antes de enviar
    const invalidData = this.previewData.some(estudiante => 
      !estudiante.codigo || 
      !estudiante.nombre || 
      !estudiante.apellido || 
      !estudiante.programaId
    );

    if (invalidData) {
      Swal.fire({
        icon: 'error',
        title: 'Datos inválidos',
        text: 'Todos los campos son obligatorios'
      });
      return;
    }

    this.estudiantesService.cargarEstudiantes(this.previewData).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Los estudiantes han sido cargados correctamente'
        });
        this.clearFile();
      },
      error: (error: unknown) => {
        console.error('Error al cargar estudiantes:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al cargar los estudiantes'
        });
      }
    });
  }
}
