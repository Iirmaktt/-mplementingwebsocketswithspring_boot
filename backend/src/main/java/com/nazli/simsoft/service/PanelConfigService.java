package com.nazli.simsoft.service;

import com.nazli.simsoft.dto.PanelConfig;
import com.nazli.simsoft.util.Constants;
import org.springframework.stereotype.Service;

@Service
public class PanelConfigService {
    
    private PanelConfig currentConfig = new PanelConfig(Constants.PANEL_WIDTH, Constants.PANEL_HEIGHT);
    
    public PanelConfig getCurrentConfig() {
        return currentConfig;
    }
    
    public PanelConfig setPanelSize(double width, double height) {
        // Validate panel dimensions
        if (width < 200 || height < 200) {
            throw new IllegalArgumentException("Panel dimensions must be at least 200x200");
        }
        if (width > 2000 || height > 2000) {
            throw new IllegalArgumentException("Panel dimensions cannot exceed 2000x2000");
        }
        
        currentConfig = new PanelConfig(width, height);
        return currentConfig;
    }
    
    public PanelConfig resetToDefault() {
        currentConfig = new PanelConfig(Constants.PANEL_WIDTH, Constants.PANEL_HEIGHT);
        return currentConfig;
    }
    
    public double getWidth() {
        return currentConfig.getWidth();
    }
    
    public double getHeight() {
        return currentConfig.getHeight();
    }
} 