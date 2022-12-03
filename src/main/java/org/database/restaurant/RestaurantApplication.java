package org.database.restaurant;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import springfox.documentation.oas.annotations.EnableOpenApi;

import java.io.IOException;

@EnableWebSecurity
@SpringBootApplication
@EnableOpenApi
public class RestaurantApplication {

    public static void main(String[] args) throws IOException {
        SpringApplication.run(RestaurantApplication.class, args);
        Runtime.getRuntime().exec(new String[]{"cmd", "/c", "start", "http://localhost:8080/swagger-ui/index.html"});//自动打开后端文档
    }

}
