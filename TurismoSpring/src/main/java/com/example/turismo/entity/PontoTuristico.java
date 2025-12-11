package com.example.turismo.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class PontoTuristico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String descricao;

    private String cidade;
    private String estado;
    private String pais;
    private Double latitude;
    private Double longitude;
    private String endereco;

    // média das avaliações
    private Double mediaNotas = 0.0;

    @ManyToOne
    @JoinColumn(name = "criado_por")
    private Usuario criadoPor;
}
