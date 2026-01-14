package desafio.itau.fer.controllers;


import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import desafio.itau.fer.data.DataTransacao;
import desafio.itau.fer.models.ModelTransacao;
import desafio.itau.fer.requests.RequestTransacao;
import desafio.itau.fer.services.ServiceTransacao;

@RestController
public class ControllerTransacao {

    @Autowired
    private ServiceTransacao serviceTransacao;

    @Autowired
    private DataTransacao dataTransacao;

    @PostMapping("/transacao")
    public ResponseEntity<?> postTransacao(@RequestBody RequestTransacao req){
        var transacao = new ModelTransacao();
        BeanUtils.copyProperties(req, transacao);
        boolean valido = serviceTransacao.validTransacao(transacao);
        if(valido){
            dataTransacao.lista.add(transacao);
            return ResponseEntity.status(HttpStatus.CREATED).body("");
        }else{
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_CONTENT).body("");
        }
    }

    @DeleteMapping("/transacao")
    public ResponseEntity<?> deleteTransacao(){
        if(dataTransacao.lista.isEmpty()){
            return ResponseEntity.status(HttpStatus.OK).body("");
        }else{
            dataTransacao.lista.removeAll(dataTransacao.lista);
            return ResponseEntity.status(HttpStatus.OK).body("");
        }
    }

    @GetMapping("/estatistica")
    public ResponseEntity<?> getTransacao(){
        var estatisticas = serviceTransacao.getEstatisticas(dataTransacao.lista);
        return ResponseEntity.status(HttpStatus.OK).body(estatisticas);
    }
}
