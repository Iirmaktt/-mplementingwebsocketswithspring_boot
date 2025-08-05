package com.nazli.simsoft.dto;

import lombok.Data;
import lombok.AllArgsConstructor;

@Data
@AllArgsConstructor
public class TotalShapesResponse {
    private int totalShapes;
    private String message;
    
    public TotalShapesResponse(int totalShapes) {
        this.totalShapes = totalShapes;
        this.message = "Total shapes: " + totalShapes;
    }
} 