package com.nazli.simsoft.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureWebMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.messaging.simp.stomp.StompSessionHandlerAdapter;
import org.springframework.test.context.TestPropertySource;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.messaging.WebSocketStompClient;
import org.springframework.web.socket.sockjs.client.SockJsClient;
import org.springframework.web.socket.sockjs.client.WebSocketTransport;

import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureWebMvc
@TestPropertySource(properties = {
    "spring.jpa.hibernate.ddl-auto=create-drop",
    "spring.datasource.url=jdbc:h2:mem:testdb"
})
class WebSocketIntegrationTest {

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testWebSocketConnection() throws Exception {
        // Create WebSocket client
        WebSocketStompClient stompClient = new WebSocketStompClient(new SockJsClient(
            List.of(new WebSocketTransport(new StandardWebSocketClient()))
        ));

        // Create a future to capture the session
        CompletableFuture<StompSession> sessionFuture = new CompletableFuture<>();

        // Connect to WebSocket
        stompClient.connect("ws://localhost:8080/ws/shapes", new StompSessionHandlerAdapter() {
            @Override
            public void afterConnected(StompSession session, org.springframework.messaging.simp.stomp.StompHeaders connectedHeaders) {
                sessionFuture.complete(session);
            }
        });

        // Wait for connection
        StompSession session = sessionFuture.get(5, TimeUnit.SECONDS);
        assertNotNull(session);
        assertTrue(session.isConnected());

        // Test sending a message
        CompletableFuture<String> messageFuture = new CompletableFuture<>();
        
        session.subscribe("/topic/shapes", new StompSessionHandlerAdapter() {
            @Override
            public void handleFrame(org.springframework.messaging.simp.stomp.StompHeaders headers, Object payload) {
                messageFuture.complete(payload.toString());
            }
        });

        // Send initialize message
        String initializeMessage = "{\"circles\":2,\"rectangles\":3,\"triangles\":1}";
        session.send("/app/initializeShapes", initializeMessage.getBytes());

        // Wait for response
        String response = messageFuture.get(10, TimeUnit.SECONDS);
        assertNotNull(response);
        assertFalse(response.isEmpty());

        // Clean up
        session.disconnect();
    }
} 