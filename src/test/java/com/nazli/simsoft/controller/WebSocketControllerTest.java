package com.nazli.simsoft.controller;

import com.nazli.simsoft.model.Shape;
import com.nazli.simsoft.service.PhysicsSimulationService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class WebSocketControllerTest {

    @Mock
    private PhysicsSimulationService physicsSimulationService;

    @Mock
    private SimpMessagingTemplate messagingTemplate;

    @InjectMocks
    private WebSocketController webSocketController;

    private List<Shape> mockShapes;

    @BeforeEach
    void setUp() {
        // Create mock shapes for testing
        mockShapes = Arrays.asList(
            new Shape("shape_0", "circle", 100.0, 200.0, 30.0),
            new Shape("shape_1", "rectangle", 300.0, 400.0, 40.0),
            new Shape("shape_2", "triangle", 500.0, 600.0, 35.0)
        );
    }

    @Test
    void testInitializeShapes() {
        // Arrange
        Map<String, Integer> request = new HashMap<>();
        request.put("circles", 2);
        request.put("rectangles", 3);
        request.put("triangles", 1);

        when(physicsSimulationService.getCurrentShapes()).thenReturn(mockShapes);

        // Act
        Object result = webSocketController.initializeShapes(request);

        // Assert
        assertNotNull(result);
        assertEquals(mockShapes, result);
        
        // Verify that initializeShapes was called with correct parameters
        verify(physicsSimulationService).initializeShapes(2, 3, 1);
        verify(physicsSimulationService).getCurrentShapes();
    }

    @Test
    void testInitializeShapesWithDefaultValues() {
        // Arrange
        Map<String, Integer> request = new HashMap<>();
        // Empty request - should use default values

        when(physicsSimulationService.getCurrentShapes()).thenReturn(mockShapes);

        // Act
        Object result = webSocketController.initializeShapes(request);

        // Assert
        assertNotNull(result);
        assertEquals(mockShapes, result);
        
        // Verify that initializeShapes was called with default values (0, 0, 0)
        verify(physicsSimulationService).initializeShapes(0, 0, 0);
    }

    @Test
    void testInitializeShapesWithPartialValues() {
        // Arrange
        Map<String, Integer> request = new HashMap<>();
        request.put("circles", 5);
        // Missing rectangles and triangles

        when(physicsSimulationService.getCurrentShapes()).thenReturn(mockShapes);

        // Act
        Object result = webSocketController.initializeShapes(request);

        // Assert
        assertNotNull(result);
        assertEquals(mockShapes, result);
        
        // Verify that initializeShapes was called with partial values
        verify(physicsSimulationService).initializeShapes(5, 0, 0);
    }

    @Test
    void testGetShapes() {
        // Arrange
        when(physicsSimulationService.getCurrentShapes()).thenReturn(mockShapes);

        // Act
        Object result = webSocketController.getShapes();

        // Assert
        assertNotNull(result);
        assertEquals(mockShapes, result);
        verify(physicsSimulationService).getCurrentShapes();
    }

    @Test
    void testGetShapesWithEmptyList() {
        // Arrange
        when(physicsSimulationService.getCurrentShapes()).thenReturn(new ArrayList<>());

        // Act
        Object result = webSocketController.getShapes();

        // Assert
        assertNotNull(result);
        assertTrue(((List<?>) result).isEmpty());
        verify(physicsSimulationService).getCurrentShapes();
    }

    @Test
    void testResetSimulation() {
        // Arrange
        when(physicsSimulationService.getCurrentShapes()).thenReturn(mockShapes);

        // Act
        Object result = webSocketController.resetSimulation();

        // Assert
        assertNotNull(result);
        assertEquals(mockShapes, result);
        verify(physicsSimulationService).resetSimulation();
        verify(physicsSimulationService).getCurrentShapes();
    }

    @Test
    void testResetSimulationWithEmptyResult() {
        // Arrange
        when(physicsSimulationService.getCurrentShapes()).thenReturn(new ArrayList<>());

        // Act
        Object result = webSocketController.resetSimulation();

        // Assert
        assertNotNull(result);
        assertTrue(((List<?>) result).isEmpty());
        verify(physicsSimulationService).resetSimulation();
        verify(physicsSimulationService).getCurrentShapes();
    }

    @Test
    void testInitializeShapesWithNullRequest() {
        // Arrange
        when(physicsSimulationService.getCurrentShapes()).thenReturn(mockShapes);

        // Act
        Object result = webSocketController.initializeShapes(null);

        // Assert
        assertNotNull(result);
        assertEquals(mockShapes, result);
        
        // Should handle null gracefully and use default values
        verify(physicsSimulationService).initializeShapes(0, 0, 0);
    }

    @Test
    void testInitializeShapesWithLargeValues() {
        // Arrange
        Map<String, Integer> request = new HashMap<>();
        request.put("circles", 100);
        request.put("rectangles", 200);
        request.put("triangles", 150);

        when(physicsSimulationService.getCurrentShapes()).thenReturn(mockShapes);

        // Act
        Object result = webSocketController.initializeShapes(request);

        // Assert
        assertNotNull(result);
        assertEquals(mockShapes, result);
        
        // Should handle large values
        verify(physicsSimulationService).initializeShapes(100, 200, 150);
    }
} 