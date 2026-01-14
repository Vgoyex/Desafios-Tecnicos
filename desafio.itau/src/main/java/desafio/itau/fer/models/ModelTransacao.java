package desafio.itau.fer.models;

import java.time.OffsetDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ModelTransacao {
    private float valor;
    private OffsetDateTime dataHora;
}
