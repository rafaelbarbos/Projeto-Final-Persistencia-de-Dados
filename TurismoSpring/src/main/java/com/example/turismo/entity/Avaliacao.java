package com.example.turismo.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(
        uniqueConstraints = @UniqueConstraint(
                columnNames = {"usuario_id", "ponto_turistico_id"}
        )
)
public class Avaliacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;


    @ManyToOne(optional = false)
    @JoinColumn(name = "ponto_turistico_id")
    private PontoTuristico pontoTuristico;

    @Column(nullable = false)
    private Integer nota; // 1 a 5

    @Column(length = 500)
    private String comentario;
}
