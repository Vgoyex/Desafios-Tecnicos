package desafio.picpay.fer.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import desafio.picpay.fer.models.ModelCarteira;

@Repository
public interface RepositoryCarteira extends JpaRepository<ModelCarteira, Integer>{
    @Query("SELECT u FROM ModelCarteira u WHERE u.id_usuario = :id_usuario")
    Optional<ModelCarteira> findByIdUsuario(@Param("id_usuario") Integer id_usuario);
}
