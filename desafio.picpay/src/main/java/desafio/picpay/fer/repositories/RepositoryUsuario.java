package desafio.picpay.fer.repositories;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import desafio.picpay.fer.models.ModelUsuario;

@Repository
public interface RepositoryUsuario extends JpaRepository<ModelUsuario, Integer>{
    Optional<ModelUsuario> findByEmail(String email);
    Optional<ModelUsuario> findByCpf(String cpf);
}
