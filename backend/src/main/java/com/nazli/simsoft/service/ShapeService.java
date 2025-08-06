package com.nazli.simsoft.service;

import org.springframework.stereotype.Service;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Service
public class ShapeService {

    private ShapeConfiguration currentConfiguration = new ShapeConfiguration(0, 0, 0);

    /*public ShapeConfiguration setShapes(int circles, int rects, int triangles) {
        // Validate input parameters
        if (circles < 0 || rects < 0 || triangles < 0) {
            throw new IllegalArgumentException("Shape counts cannot be negative");
        }
        
        // Update the current configuration
        currentConfiguration = new ShapeConfiguration(circles, rects, triangles);
        
        return currentConfiguration;
    } */

    public ShapeConfiguration getCurrentShapes() {
        return currentConfiguration;
    }

    public int getTotalShapes() {
        return currentConfiguration.getCircles() + 
               currentConfiguration.getRects() + 
               currentConfiguration.getTriangles();
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ShapeConfiguration {
        private int circles;
        private int rects;
        private int triangles;
        private String message;
        
        public ShapeConfiguration(int circles, int rects, int triangles) {
            this.circles = circles;
            this.rects = rects;
            this.triangles = triangles;
            this.message = String.format("Shapes configured: %d circles, %d rectangles, %d triangles", 
                                       circles, rects, triangles);
        }
    }
} 