package org.database.restaurant;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.IOException;

@SpringBootApplication
@MapperScan("org.database.restaurant.mapper")
public class RestaurantApplication {

    public static void main(String[] args) throws IOException {
        SpringApplication.run(RestaurantApplication.class, args);
        Runtime.getRuntime().exec(new String[]{"cmd", "/c", "start", "http://localhost:8080/swagger-ui/index.html"});//自动打开后端文档
    }

}
