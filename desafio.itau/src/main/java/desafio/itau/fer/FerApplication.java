package desafio.itau.fer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import jakarta.annotation.PostConstruct;


@SpringBootApplication
public class FerApplication {

	public static void main(String[] args) {
		SpringApplication.run(FerApplication.class, args);
	}

	@PostConstruct
	public void logSwaggerUrl() {
		System.out.println("Swagger disponível em: http://localhost:8080/swagger-ui.html");
	}

}
