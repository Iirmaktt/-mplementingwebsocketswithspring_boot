package com.nazli.simsoft.controller;

import com.nazli.simsoft.service.PhysicsSimulationService;
import com.nazli.simsoft.service.PanelConfigService;
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
    
    @Autowired
    private PanelConfigService panelConfigService;

    @MessageMapping("/initializeShapes")
    @SendTo(Constants.TOPIC_SHAPES)
    public Object initializeShapes(Map<String, Object> request) {
        // Handle null request
        if (request == null) {
            request = new HashMap<>();
        }
        
        int circles = ((Number) request.getOrDefault("circles", 0)).intValue();
        int rectangles = ((Number) request.getOrDefault("rectangles", 0)).intValue();
        int triangles = ((Number) request.getOrDefault("triangles", 0)).intValue();
        
        // Handle panel size if provided
        if (request.containsKey("panelWidth") && request.containsKey("panelHeight")) {
            double width = ((Number) request.get("panelWidth")).doubleValue();
            double height = ((Number) request.get("panelHeight")).doubleValue();
            panelConfigService.setPanelSize(width, height);
        }
        
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
    
    @MessageMapping("/getPanelConfig")
    @SendTo(Constants.TOPIC_SHAPES)
    public Object getPanelConfig() {
        return panelConfigService.getCurrentConfig();
    }
    
    @MessageMapping("/setPanelSize")
    @SendTo(Constants.TOPIC_SHAPES)
    public Object setPanelSize(Map<String, Object> request) {
        if (request == null || !request.containsKey("width") || !request.containsKey("height")) {
            return panelConfigService.getCurrentConfig();
        }
        
        double width = ((Number) request.get("width")).doubleValue();
        double height = ((Number) request.get("height")).doubleValue();
        
        try {
            return panelConfigService.setPanelSize(width, height);
        } catch (IllegalArgumentException e) {
            // Return current config if validation fails
            return panelConfigService.getCurrentConfig();
        }
    }
} 