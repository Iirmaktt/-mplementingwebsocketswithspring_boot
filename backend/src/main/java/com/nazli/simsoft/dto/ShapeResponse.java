package com.nazli.simsoft.dto;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShapeResponse {
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