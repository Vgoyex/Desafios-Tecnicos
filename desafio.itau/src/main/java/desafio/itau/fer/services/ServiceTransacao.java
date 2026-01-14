package desafio.itau.fer.services;

import java.time.OffsetDateTime;

import org.springframework.stereotype.Service;

import java.util.DoubleSummaryStatistics;
import java.util.HashMap;
import java.util.List;


import desafio.itau.fer.models.ModelTransacao;

@Service
public class ServiceTransacao {

    public boolean validTransacao(ModelTransacao transacao){
        if(transacao.getValor() < 0){
            return false;
        }
        if(transacao.getDataHora().isAfter(OffsetDateTime.now())){
            return false;
        }
        return true;
    }

    public Object getEstatisticas(List<ModelTransacao> transacoes){
        DoubleSummaryStatistics estatistica = new DoubleSummaryStatistics();
        var result = new HashMap<>();
        for(var x : transacoes){
            var data60secs = x.getDataHora().isAfter(OffsetDateTime.now().minusSeconds(60));
            if(data60secs){
                estatistica.accept(x.getValor());
            }else{
                continue;
            }
        }

        if(estatistica.getCount() <= 0){
            result.put("count", "0");
            result.put("sum", "0");
            result.put("avg", "0");
            result.put("min", "0");
            result.put("max", "0");
            return result;
        }

        result.put("count", estatistica.getCount());
        result.put("sum", estatistica.getSum());
        result.put("avg", estatistica.getAverage());
        result.put("min", estatistica.getMin());
        result.put("max", estatistica.getMax());
        return result;
    }
}
