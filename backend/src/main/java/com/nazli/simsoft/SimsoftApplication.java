package com.nazli.simsoft;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@ComponentScan(basePackages = {"com.nazli.simsoft"})
@EnableScheduling
public class SimsoftApplication {

    public static void main(String[] args) {
        SpringApplication.run(SimsoftApplication.class, args);
    }

} 