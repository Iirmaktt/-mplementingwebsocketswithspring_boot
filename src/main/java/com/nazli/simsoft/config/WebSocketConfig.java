package com.nazli.simsoft.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker //Spring’in WebSocket + STOMP mesajlaşma altyapısını aktif eder.
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic", "/queue");
        config.setApplicationDestinationPrefixes("/app");
        config.setUserDestinationPrefix("/user"); //Tekil kullanıcılara yönelik mesajlaşmada kullanılır.
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws/shapes")  //İstemcilerin WebSocket üzerinden ilk bağlantıyı kuracağı URL’yi tanımlar.
                .setAllowedOriginPatterns("*") //tüm domaine izin verir
                .withSockJS();
    }
} 