package com.example.turismo.repository;

import com.example.turismo.entity.PontoTuristico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface PontoTuristicoRepository
        extends JpaRepository<PontoTuristico, Long>, JpaSpecificationExecutor<PontoTuristico> {
}
