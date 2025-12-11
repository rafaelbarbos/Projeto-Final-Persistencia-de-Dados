package com.example.turismo.controller;

import com.example.turismo.entity.PontoTuristico;
import com.example.turismo.service.PontoTuristicoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pontos")
@RequiredArgsConstructor
public class PontoTuristicoController {

    private final PontoTuristicoService service;

    @GetMapping("/search")
    public List<PontoTuristico> search(
            @RequestParam(required = false) String cidade,
            @RequestParam(required = false) Double notaMinima,
            @RequestParam(required = false) String palavra
    ) {
        return service.buscar(cidade, notaMinima, palavra);
    }
}
