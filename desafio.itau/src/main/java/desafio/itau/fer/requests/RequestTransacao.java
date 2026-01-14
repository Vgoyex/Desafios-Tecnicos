package desafio.itau.fer.requests;

import java.time.OffsetDateTime;

import jakarta.validation.constraints.NotBlank;

public record RequestTransacao(
    @NotBlank float valor,
    @NotBlank OffsetDateTime dataHora
) {
}
