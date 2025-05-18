/*
 * esto es un repositorio para la entidad Estudiante
 * sirve para acceder a la base de datos
 * y realizar operaciones CRUD
 */

package com.sistemapagos.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sistemapagos.entities.Estudiante;

public interface EstudianteRepository extends JpaRepository<Estudiante, String> {

    Estudiante findByCodigo(String codigo); // busca un estudiante por su id

    List<Estudiante> findByProgramaId(String programId); // busca estudiantes por su id de programa

    
}