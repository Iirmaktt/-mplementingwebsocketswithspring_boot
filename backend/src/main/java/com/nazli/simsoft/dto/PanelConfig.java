package com.nazli.simsoft.dto;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PanelConfig {
    private double width;
    private double height;
    private String message;
    
    public PanelConfig(double width, double height) {
        this.width = width;
        this.height = height;
        this.message = String.format("Panel configured: %.0f x %.0f", width, height);
    }
} 