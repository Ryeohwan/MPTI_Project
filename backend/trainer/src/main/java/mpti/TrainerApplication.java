package mpti;


import mpti.domain.trainer.config.AppProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(AppProperties.class)
public class TrainerApplication {
	public static void main(String[] args) {
		SpringApplication.run(TrainerApplication.class, args);
	}
}
