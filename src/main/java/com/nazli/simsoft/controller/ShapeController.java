package com.nazli.simsoft.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import com.nazli.simsoft.service.ShapeService;
import com.nazli.simsoft.service.ShapeService.ShapeConfiguration;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@RestController
@RequestMapping("/api")
public class ShapeController {

    @Autowired
    private ShapeService shapeService;

    @GetMapping("/setShapes")
    public ResponseEntity<ShapeResponse> setShapes(
            @RequestParam(defaultValue = "0") int circles,
            @RequestParam(defaultValue = "0") int rects,
            @RequestParam(defaultValue = "0") int triangles) {
        
        try {
            ShapeConfiguration config = shapeService.setShapes(circles, rects, triangles);
            ShapeResponse response = new ShapeResponse(config.getCircles(), config.getRects(), config.getTriangles());
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new ShapeResponse(0, 0, 0, "Error: " + e.getMessage()));
        }
    }

    @GetMapping("/getShapes")
    public ResponseEntity<ShapeResponse> getShapes() {
        ShapeConfiguration config = shapeService.getCurrentShapes();
        ShapeResponse response = new ShapeResponse(config.getCircles(), config.getRects(), config.getTriangles());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/getTotalShapes")
    public ResponseEntity<TotalShapesResponse> getTotalShapes() {
        int total = shapeService.getTotalShapes();
        return ResponseEntity.ok(new TotalShapesResponse(total));
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ShapeResponse {
        private int circles;
        private int rects;
        private int triangles;
        private String message;
        
        public ShapeResponse(int circles, int rects, int triangles) {
            this.circles = circles;
            this.rects = rects;
            this.triangles = triangles;
            this.message = String.format("Shapes set successfully: %d circles, %d rectangles, %d triangles", 
                                       circles, rects, triangles);
        }
    }

    @Data
    @AllArgsConstructor
    public static class TotalShapesResponse {
        private int totalShapes;
        private String message;
        
        public TotalShapesResponse(int totalShapes) {
            this.totalShapes = totalShapes;
            this.message = "Total shapes: " + totalShapes;
        }
    }
} 