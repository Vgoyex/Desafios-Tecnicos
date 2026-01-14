package desafio.picpay.fer.requests;

import jakarta.validation.constraints.NotBlank;

public record RequestUsuario(
    String nomeCompleto,
    boolean lojista,
    @NotBlank String cpf,
    @NotBlank String email,
    @NotBlank String senha
) {

}
