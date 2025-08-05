package com.nazli.simsoft.controller;

import com.nazli.simsoft.service.PhysicsSimulationService;
import com.nazli.simsoft.util.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.util.HashMap;
import java.util.Map;

@Controller
public class WebSocketController {

    @Autowired
    private PhysicsSimulationService physicsSimulationService;

    @MessageMapping("/initializeShapes")
    @SendTo(Constants.TOPIC_SHAPES)
    public Object initializeShapes(Map<String, Integer> request) {
        // Handle null request
        if (request == null) {
            request = new HashMap<>();
        }
        
        int circles = request.getOrDefault("circles", 0);
        int rectangles = request.getOrDefault("rectangles", 0);
        int triangles = request.getOrDefault("triangles", 0);
        
        physicsSimulationService.initializeShapes(circles, rectangles, triangles);
        return physicsSimulationService.getCurrentShapes();
    }

    @MessageMapping("/getShapes")
    @SendTo(Constants.TOPIC_SHAPES)
    public Object getShapes() {
        return physicsSimulationService.getCurrentShapes();
    }

    @MessageMapping("/reset")
    @SendTo(Constants.TOPIC_SHAPES)
    public Object resetSimulation() {
        physicsSimulationService.resetSimulation();
        return physicsSimulationService.getCurrentShapes();
    }
} 