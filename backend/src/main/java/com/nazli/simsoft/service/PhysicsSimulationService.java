package com.nazli.simsoft.service;

import com.nazli.simsoft.model.Shape;
import com.nazli.simsoft.util.Constants;
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
    
    @Autowired
    private PanelConfigService panelConfigService;

    private final Map<String, Shape> shapes = new ConcurrentHashMap<>();
    private final AtomicInteger shapeIdCounter = new AtomicInteger(0);
    
    private long lastRotationTime = System.currentTimeMillis();

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
        double panelWidth = panelConfigService.getWidth();
        double panelHeight = panelConfigService.getHeight();
        double x = Math.random() * (panelWidth - 50) + 25;
        double y = Math.random() * (panelHeight - 50) + 25;
        double size = Constants.MIN_SIZE + Math.random() * (Constants.MAX_SIZE - Constants.MIN_SIZE);
        
        Shape shape = new Shape(id, type, x, y, size);
        shapes.put(id, shape);
    }

    @Scheduled(fixedRate = 16) // ~60 FPS
    public void updateSimulation() {
        // Update all moving shapes
        for (Shape shape : shapes.values()) {
            shape.updatePosition(Constants.DELTA_TIME, panelConfigService.getWidth(), panelConfigService.getHeight());
        }
        
        // Check if it's time to rotate which shapes are moving
        long currentTime = System.currentTimeMillis();
        if (currentTime - lastRotationTime > Constants.ROTATION_INTERVAL) {
            rotateMovingShapes();
            lastRotationTime = currentTime;
        }
        
        // Broadcast current state to all clients
        broadcastShapes();
    }

    private void rotateMovingShapes() {
        List<Shape> allShapes = new ArrayList<>(shapes.values());
        int movingCount = (int) (allShapes.size() * Constants.MOVING_PERCENTAGE);
        
        // Stop all shapes
        allShapes.forEach(Shape::stopMoving);
        
        // Randomly select shapes to start moving
        Collections.shuffle(allShapes);
        for (int i = 0; i < movingCount && i < allShapes.size(); i++) {
            allShapes.get(i).startMoving(Constants.MAX_VELOCITY);
        }
    }

    private void startPartialMovement() {
        List<Shape> allShapes = new ArrayList<>(shapes.values());
        int movingCount = (int) (allShapes.size() * Constants.MOVING_PERCENTAGE);
        
        // Randomly select shapes to start moving
        Collections.shuffle(allShapes);
        for (int i = 0; i < movingCount && i < allShapes.size(); i++) {
            allShapes.get(i).startMoving(Constants.MAX_VELOCITY);
        }
    }

    private void broadcastShapes() {
        List<Shape> shapesList = new ArrayList<>(shapes.values());
        messagingTemplate.convertAndSend(Constants.TOPIC_SHAPES, shapesList);
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