package com.sistemapagos.web;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sistemapagos.entities.Estudiante;
import com.sistemapagos.entities.Pago;
import com.sistemapagos.enums.PagoStatus;
import com.sistemapagos.repositories.EstudianteRepository;
import com.sistemapagos.repositories.PagoRepository;

@RestController
@CrossOrigin(origins = "*")
public class DashboardController {

    @Autowired
    private EstudianteRepository estudianteRepository;

    @Autowired
    private PagoRepository pagoRepository;

    @GetMapping("/api/dashboard/stats")
    public Map<String, Object> getDashboardStats() {
        List<Estudiante> estudiantes = estudianteRepository.findAll();
        List<Pago> pagos = pagoRepository.findAll();
        List<Pago> pagosMensuales = pagos.stream()
            .filter(p -> p.getFecha().getMonth() == LocalDate.now().getMonth())
            .collect(Collectors.toList());
        List<Pago> pagosNoValidados = pagos.stream()
            .filter(p -> p.getStatus() == PagoStatus.CREADO)
            .collect(Collectors.toList());

        return Map.of(
            "totalStudents", estudiantes.size(),
            "totalPayments", pagos.size(),
            "monthlyRevenue", pagosMensuales.stream().mapToDouble(Pago::getCantidad).sum(),
            "pendingPayments", pagosNoValidados.size()
        );
    }

    @GetMapping("/api/dashboard/monthly-payments")
    public Map<String, Object> getMonthlyPayments() {
        List<Double> amounts = new ArrayList<>(12);
        LocalDate now = LocalDate.now();
        
        // Initialize with zeros
        for (int i = 0; i < 12; i++) {
            amounts.add(0.0);
        }

        // Group payments by month and sum amounts
        List<Pago> pagos = pagoRepository.findAll();
        for (Pago pago : pagos) {
            if (pago.getFecha().getYear() == now.getYear()) {
                int month = pago.getFecha().getMonthValue() - 1; // 0-based index
                amounts.set(month, amounts.get(month) + pago.getCantidad());
            }
        }

        return Map.of("amounts", amounts);
    }

    @GetMapping("/api/dashboard/payment-status")
    public Map<String, Object> getPaymentStatus() {
        List<Pago> pagos = pagoRepository.findAll();
        
        long validated = pagos.stream().filter(p -> p.getStatus() == PagoStatus.VALIDADO).count();
        long created = pagos.stream().filter(p -> p.getStatus() == PagoStatus.CREADO).count();
        long rejected = pagos.stream().filter(p -> p.getStatus() == PagoStatus.RECHAZADO).count();

        return Map.of(
            "onTime", validated,
            "late", rejected,
            "pending", created
        );
    }
}
