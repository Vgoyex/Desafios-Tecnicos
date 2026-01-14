package desafio.picpay.fer.services;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import desafio.picpay.fer.models.ModelCarteira;
import desafio.picpay.fer.models.ModelUsuario;
import desafio.picpay.fer.repositories.RepositoryCarteira;
import desafio.picpay.fer.repositories.RepositoryUsuario;
import desafio.picpay.fer.requests.RequestTransferencia;
import jakarta.transaction.Transactional;

@Service
public class ServiceCarteira {
    @Autowired
    private RepositoryUsuario repositoryUsuario;
    @Autowired
    private RepositoryCarteira repositoryCarteira;

    

    @Transactional
    public RequestTransferencia transferir(RequestTransferencia transferencia) {
        boolean validUsuarios = validUsers(transferencia.id_pagador(), transferencia.id_recebedor());
        var carteiras = getCarteiras(transferencia.id_pagador(), transferencia.id_recebedor());
        // saldos[0] = pagador; saldos[1] = recebedor
        boolean invalidSaldo = (transferencia.value().compareTo(carteiras.get(0).getSaldo()) > 0);
        if (validUsuarios && !invalidSaldo) {
            boolean autorizado = autorizationService();
            if (autorizado) {
                var transacao = transacao(carteiras.get(0), carteiras.get(1), transferencia.value());
                // Utilizando envioEmailFake para não ter latencia nos testes
                servicoEnvioEmailFAKE();
                if(transacao != null)
                    return transferencia;
            }
        }
        return null;
    }

    @Transactional
    public List<ModelCarteira> transacao(ModelCarteira carteiraPagador, ModelCarteira carteiraRecebedor,
            BigDecimal valorPago) {
        List<ModelCarteira> result = new ArrayList<>();
        BigDecimal resultPagador = carteiraPagador.getSaldo().subtract(valorPago);
        BigDecimal resultRecebedor = carteiraRecebedor.getSaldo().add(valorPago);

        carteiraPagador.setSaldo(resultPagador);
        carteiraRecebedor.setSaldo(resultRecebedor);

        repositoryCarteira.save(carteiraPagador);
        repositoryCarteira.save(carteiraRecebedor);

        result.add(carteiraPagador);
        result.add(carteiraRecebedor);
        return result;
    }

    public void servicoEnvioEmailFAKE() {
        // enviaEmail(emailPagador);
        // enviaEmail(emailRecebedor);
    }

    public boolean servicoEnvioEmail() {
        boolean result = false;
        try {
            RestTemplate restTemplate = new RestTemplate();
            restTemplate.postForObject(
                    "https://util.devi.tools/api/v2/authorize",
                    null,
                    String.class);
        } catch (Exception e) {
            System.out.println(e);
        }
        return result;
    }

    public boolean autorizationService() {
        boolean result = false;
        RestTemplate restTemplate = new RestTemplate();
        try {
            String resp = restTemplate.getForObject(
                    "https://util.devi.tools/api/v2/authorize",
                    String.class);
            JsonNode json = new ObjectMapper().readTree(resp);
            result = json.path("data").path("authorization").asBoolean();
        } catch (Exception e) {
            System.out.println(e);
        }
        return result;
    }

    public List<Optional> getUsuarios(Integer idPagador, Integer idRecebedor) {
        List<Optional> result = new ArrayList<>();
        var pagador = repositoryUsuario.findById(idPagador);
        var recebedor = repositoryUsuario.findById(idRecebedor);
        if (pagador.isPresent() && recebedor.isPresent()) {
            result.add(pagador);
            result.add(recebedor);
        } else {
            result = null;
        }
        return result;
    }

    public List<ModelCarteira> getCarteiras(Integer idPagador, Integer idRecebedor) {
        List<ModelCarteira> result = new ArrayList<>();
        var carteiraPagador = repositoryCarteira.findByIdUsuario(idPagador).get();
        var carteiraRecebedor = repositoryCarteira.findByIdUsuario(idRecebedor).get();
        if (carteiraPagador != null && carteiraPagador != null) {
            result.add(carteiraPagador);
            result.add(carteiraRecebedor);
        }
        return result;
    }

    public boolean validUsers(Integer idPagador, Integer idRecebedor) {
        boolean validPagador = repositoryUsuario.findById(idPagador).isPresent();
        boolean validRecebedor = repositoryUsuario.findById(idRecebedor).isPresent();
        if (!validPagador || !validRecebedor)
            return false;
        return true;
    }

    public boolean isLojista(Integer id_usuario) {
        boolean isLojista = false;
        var usuario = repositoryUsuario.findById(id_usuario);
        if (usuario.isPresent()) {
            isLojista = usuario.get().isLojista();
        }
        return isLojista;
    }

    public ModelUsuario validCreateCarteira(ModelCarteira carteira) {
        var usuario = repositoryUsuario.findById(carteira.getId_usuario());
        var carteiraExists = repositoryCarteira.findByIdUsuario(carteira.getId_usuario()).isPresent();
        if (usuario.isPresent() || !carteiraExists) {
            ModelUsuario usuarioSet = new ModelUsuario();
            BeanUtils.copyProperties(usuario, usuarioSet);
            return usuarioSet;
        }
        return null;
    }

    public ModelUsuario atualizarCarteiraIdUsuario(ModelUsuario usuario, ModelCarteira carteira) {
        usuario.setId_carteira(carteira.getId());
        repositoryUsuario.save(usuario);
        return usuario;
    }

}
