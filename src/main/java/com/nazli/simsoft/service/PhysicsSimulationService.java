package com.nazli.simsoft.service;

import com.nazli.simsoft.model.Shape;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

@Service
public class PhysicsSimulationService {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    private final Map<String, Shape> shapes = new ConcurrentHashMap<>();
    private final AtomicInteger shapeIdCounter = new AtomicInteger(0);
    
    private static final double PANEL_WIDTH = 800.0;
    private static final double PANEL_HEIGHT = 600.0;
    private static final double MAX_VELOCITY = 100.0; // pixels per second
    private static final double UPDATE_RATE = 60.0; // updates per second
    private static final double DELTA_TIME = 1.0 / UPDATE_RATE;
    
    private long lastRotationTime = System.currentTimeMillis();
    private static final long ROTATION_INTERVAL = 3000; // 3 seconds
    private static final double MOVING_PERCENTAGE = 0.25; // 25% of shapes moving

    public void initializeShapes(int circles, int rectangles, int triangles) {
        shapes.clear();
        shapeIdCounter.set(0);
        
        // Create circles
        for (int i = 0; i < circles; i++) {
            createShape("circle");
        }
        
        // Create rectangles
        for (int i = 0; i < rectangles; i++) {
            createShape("rectangle");
        }
        
        // Create triangles
        for (int i = 0; i < triangles; i++) {
            createShape("triangle");
        }
        
        // Start initial movement for 25% of shapes
        startPartialMovement();
    }

    private void createShape(String type) {
        String id = "shape_" + shapeIdCounter.getAndIncrement();
        double x = Math.random() * (PANEL_WIDTH - 50) + 25;
        double y = Math.random() * (PANEL_HEIGHT - 50) + 25;
        double size = 20 + Math.random() * 30; // 20-50 pixels
        
        Shape shape = new Shape(id, type, x, y, size);
        shapes.put(id, shape);
    }

    @Scheduled(fixedRate = 16) // ~60 FPS
    public void updateSimulation() {
        // Update all moving shapes
        for (Shape shape : shapes.values()) {
            shape.updatePosition(DELTA_TIME, PANEL_WIDTH, PANEL_HEIGHT);
        }
        
        // Check if it's time to rotate which shapes are moving
        long currentTime = System.currentTimeMillis();
        if (currentTime - lastRotationTime > ROTATION_INTERVAL) {
            rotateMovingShapes();
            lastRotationTime = currentTime;
        }
        
        // Broadcast current state to all clients
        broadcastShapes();
    }

    private void rotateMovingShapes() {
        List<Shape> allShapes = new ArrayList<>(shapes.values());
        int movingCount = (int) (allShapes.size() * MOVING_PERCENTAGE);
        
        // Stop all shapes
        allShapes.forEach(Shape::stopMoving);
        
        // Randomly select shapes to start moving
        Collections.shuffle(allShapes);
        for (int i = 0; i < movingCount && i < allShapes.size(); i++) {
            allShapes.get(i).startMoving(MAX_VELOCITY);
        }
    }

    private void startPartialMovement() {
        List<Shape> allShapes = new ArrayList<>(shapes.values());
        int movingCount = (int) (allShapes.size() * MOVING_PERCENTAGE);
        
        // Randomly select shapes to start moving
        Collections.shuffle(allShapes);
        for (int i = 0; i < movingCount && i < allShapes.size(); i++) {
            allShapes.get(i).startMoving(MAX_VELOCITY);
        }
    }

    private void broadcastShapes() {
        List<Shape> shapesList = new ArrayList<>(shapes.values());
        messagingTemplate.convertAndSend("/topic/shapes", shapesList);
    }

    public List<Shape> getCurrentShapes() {
        return new ArrayList<>(shapes.values());
    }

    public void resetSimulation() {
        shapes.clear();
        shapeIdCounter.set(0);
        lastRotationTime = System.currentTimeMillis();
    }
} 