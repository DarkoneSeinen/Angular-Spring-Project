package com.sistemapagos.Services;

import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.sistemapagos.entities.Estudiante;
import com.sistemapagos.entities.Pago;
import com.sistemapagos.enums.PagoStatus;
import com.sistemapagos.enums.TypePago;
import com.sistemapagos.repositories.EstudianteRepository;
import com.sistemapagos.repositories.PagoRepository;

@Service
@Transactional
public class PagoService {

    @Autowired
    private PagoRepository pagoRepository;

    @Autowired
    private EstudianteRepository estudianteRepository;

    public Pago savePago(MultipartFile file, double cantidad, TypePago type, LocalDate date, String codigoEstudiante) throws IOException{
        /*
        crear una ruta donde se guardara el archivo
        el sistem obtiene la ruta del home del usuario
         */
        Path folderPath = Paths.get(System.getProperty("user.home"), "enset-data", "pagos");

        if (!Files.exists(folderPath)) {
            Files.createDirectories(folderPath);
        }

        String fileName = UUID.randomUUID().toString();

        Path filepath= Paths.get(System.getProperty("user.home"),"enset-data", "pagos", fileName + ".pdf");

        Files.copy(file.getInputStream(),filepath); // obtenemos el archivo y lo guardamos en la ruta especificada
        
        Estudiante estudiante = estudianteRepository.findByCodigo(codigoEstudiante);

        Pago pago = Pago.builder()
        .type(type)
        .status(PagoStatus.CREADO)
        .fecha(date)
        .estudiante(estudiante)
        .file(filepath.toUri().toString())
        .build();

        return pagoRepository.save(pago);

    }

    public byte[] getArchivoPorId(Long pagoId) throws IOException{
        Pago pago = pagoRepository.findById(pagoId).get();
        return Files.readAllBytes(Path.of(URI.create(pago.getFile())));
    }

    public Pago actualizarPagoPorStatus(PagoStatus status, Long id){

        Pago pago = pagoRepository.findById(id).get();

        pago.setStatus(status);
        return pagoRepository.save(pago);
    }


}