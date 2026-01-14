package desafio.picpay.fer.controllers;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import desafio.picpay.fer.models.ModelUsuario;
import desafio.picpay.fer.repositories.RepositoryUsuario;
import desafio.picpay.fer.requests.RequestUsuario;
import desafio.picpay.fer.services.ServiceUsuario;

@RestController
public class ControllerUsuario {
    @Autowired
    private ServiceUsuario serviceUsuario;
    
    @Autowired
    private RepositoryUsuario repositoryUsuario;

    @PostMapping("/usuario")
    public ResponseEntity<?> registrarUsuario(RequestUsuario reqUsuario){
        var usuario = new ModelUsuario();
        BeanUtils.copyProperties(reqUsuario, usuario);
        boolean usuarioValido = serviceUsuario.validarCriacaoUsuario(usuario);
        if(usuarioValido){
            repositoryUsuario.save(usuario);
            return ResponseEntity.status(HttpStatus.CREATED).body(usuario);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Usuário já existe!");
    }

    @GetMapping("/usuarios")
    public ResponseEntity<?> listUsers(){
        return ResponseEntity.status(HttpStatus.OK).body(repositoryUsuario.findAll());
    }
}
