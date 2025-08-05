package com.nazli.simsoft.util;

public final class Constants {
    
    // Simulation constants
    public static final double PANEL_WIDTH = 800.0;
    public static final double PANEL_HEIGHT = 600.0;
    public static final double MAX_VELOCITY = 100.0; // pixels per second
    public static final double UPDATE_RATE = 60.0; // updates per second
    public static final double DELTA_TIME = 1.0 / UPDATE_RATE;
    
    // Timing constants
    public static final long ROTATION_INTERVAL = 3000; // 3 seconds
    public static final double MOVING_PERCENTAGE = 0.25; // 25% of shapes moving
    
    // Shape constants
    public static final double MIN_SIZE = 20.0;
    public static final double MAX_SIZE = 50.0;
    public static final double ANGULAR_VELOCITY_RANGE = 2.0; // radians per second
    
    // API constants
    public static final String API_BASE_PATH = "/api";
    public static final String WEBSOCKET_ENDPOINT = "/ws/shapes";
    public static final String TOPIC_SHAPES = "/topic/shapes";
    
    // Color constants
    public static final String[] SHAPE_COLORS = {
        "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", 
        "#FFEAA7", "#DDA0DD", "#98D8C8"
    };
    
    private Constants() {
        // Utility class - prevent instantiation
    }
} 