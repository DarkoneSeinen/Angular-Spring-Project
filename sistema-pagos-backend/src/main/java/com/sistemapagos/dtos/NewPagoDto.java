package com.sistemapagos.dtos;

import java.time.LocalDate;

import com.sistemapagos.enums.TypePago;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor 

public class NewPagoDto {

    private double conatidad;
    private TypePago typePago;
    private LocalDate date;
    private String codigoEstudiante;

}