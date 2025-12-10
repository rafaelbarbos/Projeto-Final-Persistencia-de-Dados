package com.example.turismo.service;

import com.example.turismo.entity.Avaliacao;
import com.example.turismo.entity.PontoTuristico;
import com.example.turismo.repository.AvaliacaoRepository;
import com.example.turismo.repository.PontoTuristicoRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AvaliacaoService {

    private final AvaliacaoRepository avaliacaoRepository;
    private final PontoTuristicoRepository pontoTuristicoRepository;

    @Transactional
    public Avaliacao salvarAvaliacao(Avaliacao avaliacao) {

        if (avaliacao.getNota() < 1 || avaliacao.getNota() > 5)
            throw new IllegalArgumentException("Nota deve ser entre 1 e 5.");

        Avaliacao salva = avaliacaoRepository.save(avaliacao);

        recalcularMedia(avaliacao.getPontoTuristico().getId());

        return salva;
    }

    private void recalcularMedia(Long pontoId) {
        PontoTuristico pt = pontoTuristicoRepository.findById(pontoId)
                .orElseThrow();

        Double novaMedia = avaliacaoRepository.findAll().stream()
                .filter(a -> a.getPontoTuristico().getId().equals(pontoId))
                .mapToInt(Avaliacao::getNota)
                .average()
                .orElse(0.0);

        pt.setMediaNotas(novaMedia);
        pontoTuristicoRepository.save(pt);
    }
}
