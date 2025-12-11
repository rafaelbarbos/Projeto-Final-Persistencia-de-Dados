package com.example.turismo.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Hospedagem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private PontoTuristico pontoTuristico;

    @Column(nullable = false)
    private String nome;

    private String endereco;
    private String telefone;
    private Double precoMedio;
    private String tipo; // hotel, pousada, hostel, etc.
    private String linkReserva;
}
