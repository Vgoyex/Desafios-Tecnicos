package desafio.itau.fer.data;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import desafio.itau.fer.models.ModelTransacao;

@Repository
public class DataTransacao{
    public List<ModelTransacao> lista = new ArrayList<ModelTransacao>();
}
