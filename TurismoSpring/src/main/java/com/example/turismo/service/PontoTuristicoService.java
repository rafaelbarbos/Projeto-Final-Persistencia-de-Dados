package com.example.turismo.service;

import com.example.turismo.entity.PontoTuristico;
import com.example.turismo.repository.PontoTuristicoRepository;
import com.example.turismo.repository.PontoTuristicoSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PontoTuristicoService {

    private final PontoTuristicoRepository repo;

    public List<PontoTuristico> buscar(String cidade, Double notaMinima, String palavra) {

        Specification<PontoTuristico> spec = Specification
                .where(PontoTuristicoSpecification.cidade(cidade))
                .and(PontoTuristicoSpecification.notaMinima(notaMinima))
                .and(PontoTuristicoSpecification.palavraChave(palavra));

        return repo.findAll(spec);
    }
}
