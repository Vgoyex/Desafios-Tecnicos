package desafio.picpay.fer.controllers;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import desafio.picpay.fer.models.ModelCarteira;
import desafio.picpay.fer.repositories.RepositoryCarteira;
import desafio.picpay.fer.requests.RequestCarteira;
import desafio.picpay.fer.requests.RequestTransferencia;
import desafio.picpay.fer.services.ServiceCarteira;

@RestController
public class ControllerCarteira {

    @Autowired
    private ServiceCarteira serviceCarteira;

    @Autowired
    private RepositoryCarteira repositoryCarteira;

    
    @PostMapping("/transferencia")
    public ResponseEntity<?> transferencia(RequestTransferencia transferencia){
        boolean isLojista = serviceCarteira.isLojista(transferencia.id_pagador());
        if(isLojista){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Lojistas só podem receber transferências");
        }
        var transferir = serviceCarteira.transferir(transferencia);
        if(transferir == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Transação inválida!");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(transferencia);
    }


    @PostMapping("/carteira")
    public ResponseEntity<?> criarCarteira(RequestCarteira reqCarteira){
        var carteira = new ModelCarteira();
        BeanUtils.copyProperties(reqCarteira, carteira);
        var validaCarteira = serviceCarteira.validCreateCarteira(carteira);
        if(validaCarteira != null){
            repositoryCarteira.save(carteira);
            serviceCarteira.atualizarCarteiraIdUsuario(validaCarteira,carteira); 
            return ResponseEntity.status(HttpStatus.CREATED).body(carteira);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Operação inválida!");
    }

    @GetMapping("/carteiras")
    public ResponseEntity<?> listCarteira(){
        return ResponseEntity.status(HttpStatus.OK).body(repositoryCarteira.findAll());
    }
}
