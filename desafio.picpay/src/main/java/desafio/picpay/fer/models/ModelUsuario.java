package desafio.picpay.fer.models;


// import org.hibernate.validator.constraints.br.CPF;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
// import jakarta.validation.constraints.Email;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@Entity
@Table(name="usuarios")
public class ModelUsuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String nomeCompleto;
    // @CPF
    private String cpf;
    // @Email
    private String email;
    private String senha;
    private boolean lojista;
    private Integer id_carteira;
}
