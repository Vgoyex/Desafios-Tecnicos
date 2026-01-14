package desafio.picpay.fer.requests;

import java.math.BigDecimal;

import jakarta.validation.constraints.NotBlank;

public record RequestTransferencia(
    @NotBlank Integer id_pagador,
    @NotBlank Integer id_recebedor,
    @NotBlank BigDecimal value
) {

}
