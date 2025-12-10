package com.example.turismo.repository;

import com.example.turismo.entity.PontoTuristico;
import org.springframework.data.jpa.domain.Specification;

public class PontoTuristicoSpecification {

    public static Specification<PontoTuristico> cidade(String cidade) {
        return (root, query, cb) ->
                cidade == null ? null :
                        cb.equal(root.get("cidade"), cidade);
    }

    public static Specification<PontoTuristico> notaMinima(Double min) {
        return (root, query, cb) ->
                min == null ? null :
                        cb.greaterThanOrEqualTo(root.get("mediaNotas"), min);
    }

    public static Specification<PontoTuristico> palavraChave(String palavra) {
        return (root, query, cb) ->
                palavra == null ? null :
                        cb.or(
                                cb.like(cb.lower(root.get("nome")), "%" + palavra.toLowerCase() + "%"),
                                cb.like(cb.lower(root.get("descricao")), "%" + palavra.toLowerCase() + "%")
                        );
    }
}
