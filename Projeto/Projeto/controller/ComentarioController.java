// com.example.demo.controller.ComentarioController.java
package com.example.demo.controller;

import com.example.demo.model.Comentario;
import com.example.demo.model.Resposta;
import com.example.demo.service.ComentarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/comentarios")
public class ComentarioController {

    @Autowired
    private ComentarioService comentarioService;

    // 1. Endpoint: Adicionar Comentário (POST /comentarios/{pontoId})
    @PostMapping("/{pontoId}")
    public Comentario adicionarComentario(
            @PathVariable String pontoId,
            @RequestBody Comentario comentario) {

        comentario.setPontoId(pontoId);
        return comentarioService.salvar(comentario);
    }

    // 2. Endpoint: Listar Comentários (GET /comentarios/ponto/{pontoId})
    @GetMapping("/ponto/{pontoId}")
    public List<Comentario> listarComentariosPorPonto(@PathVariable String pontoId) {
        return comentarioService.listarPorPonto(pontoId);
    }

    // 3. Endpoint: Adicionar Resposta (POST /comentarios/{comentarioId}/respostas)
    @PostMapping("/{comentarioId}/respostas")
    public ResponseEntity<Comentario> adicionarResposta(
            @PathVariable String comentarioId,
            @RequestBody Resposta resposta) {

        return comentarioService.adicionarResposta(comentarioId, resposta)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
}
}