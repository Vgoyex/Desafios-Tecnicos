package desafio.picpay.fer.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import desafio.picpay.fer.models.ModelUsuario;
import desafio.picpay.fer.repositories.RepositoryUsuario;

@Service
public class ServiceUsuario {
    @Autowired
    private RepositoryUsuario repositoryUsuario;

    public boolean validarCriacaoUsuario(ModelUsuario usuario){
        boolean emailExists = repositoryUsuario.findByEmail(usuario.getEmail()).isPresent();
        boolean cpfExists = repositoryUsuario.findByCpf(usuario.getCpf()).isPresent();
        if(emailExists || cpfExists){
            return false;
        }
        return true;
    }
}
