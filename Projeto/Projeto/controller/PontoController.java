// com.example.demo.controller.PontoController.java
package com.example.demo.controller;

import com.example.demo.model.Ponto;
import com.example.demo.model.Foto;
import com.example.demo.service.PontoService;
import com.example.demo.service.FotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

@RestController // Define a classe como um Controller REST
@RequestMapping("/pontos") // Prefixo base para todos os endpoints: /pontos
public class PontoController {

    @Autowired
    private PontoService pontoService;

    @Autowired
    private FotoService fotoService;

    // 1. ENDPOINT: Criar Ponto (POST /pontos)
    @PostMapping
    public Ponto criarPonto(@RequestBody Ponto ponto) {
        return pontoService.salvar(ponto);
    }

    // 2. ENDPOINT: Buscar Ponto e Testar Cache (GET /pontos/{id})
    @GetMapping("/{id}")
    public Ponto buscarPorId(@PathVariable String id) {
        // Esta chamada registra o acesso e usa o cache Redis
        return pontoService.buscarPontoPorId(id)
                .orElseThrow(() -> new RuntimeException("Ponto não encontrado."));
    }

    // 3. ENDPOINT: Upload de Fotos (POST /pontos/{pontoId}/fotos)
    @PostMapping("/{pontoId}/fotos")
    public Foto uploadFoto(
            @PathVariable String pontoId,
            @RequestParam("file") MultipartFile file) throws IOException {

        return fotoService.salvarFoto(pontoId, file);
    }

    // 4. ENDPOINT: Listar Fotos (GET /pontos/{pontoId}/fotos)
    @GetMapping("/{pontoId}/fotos")
    public List<Foto> listarFotos(@PathVariable String pontoId) {
        return fotoService.listarFotosPorPonto(pontoId);
    }

    // 5. ENDPOINT: Ranking de Pontos Mais Acessados (GET /pontos/ranking)
    @GetMapping("/ranking")
    public List<Ponto> listarRanking(
            @RequestParam(defaultValue = "10") long limit) {

        return pontoService.listarTopAcessados(limit);
}
}