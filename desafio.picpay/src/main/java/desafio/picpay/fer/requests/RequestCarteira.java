package desafio.picpay.fer.requests;


import jakarta.validation.constraints.NotBlank;

public record RequestCarteira(
    @NotBlank Integer id_usuario,
    @NotBlank float saldo
) {

}
