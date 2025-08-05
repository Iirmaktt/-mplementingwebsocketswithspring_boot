package com.nazli.simsoft.model;

import com.nazli.simsoft.util.Constants;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Shape {
    private String id;
    private String type; // "circle", "rectangle", "triangle"
    private double x;
    private double y;
    private double velocityX;
    private double velocityY;
    private double angle;
    private double angularVelocity;
    private boolean isMoving;
    private String color;
    private double size;
    
    public Shape(String id, String type, double x, double y, double size) {
        this.id = id;
        this.type = type;
        this.x = x;
        this.y = y;
        this.size = size;
        this.velocityX = 0;
        this.velocityY = 0;
        this.angle = 0;
        this.angularVelocity = 0;
        this.isMoving = false;
        this.color = getRandomColor();
    }
    
    private String getRandomColor() {
        return Constants.SHAPE_COLORS[(int) (Math.random() * Constants.SHAPE_COLORS.length)];
    }
    
    public void updatePosition(double deltaTime, double panelWidth, double panelHeight) {
        if (!isMoving) return;
        
        // Update position
        x += velocityX * deltaTime;
        y += velocityY * deltaTime;
        
        // Update angle
        angle += angularVelocity * deltaTime;
        
        // Handle boundary collisions
        handleBoundaryCollision(panelWidth, panelHeight);
    }
    
    private void handleBoundaryCollision(double panelWidth, double panelHeight) {
        double halfSize = size / 2;
        
        // Left and right boundaries
        if (x - halfSize <= 0) {
            x = halfSize;
            velocityX = Math.abs(velocityX);
        } else if (x + halfSize >= panelWidth) {
            x = panelWidth - halfSize;
            velocityX = -Math.abs(velocityX);
        }
        
        // Top and bottom boundaries
        if (y - halfSize <= 0) {
            y = halfSize;
            velocityY = Math.abs(velocityY);
        } else if (y + halfSize >= panelHeight) {
            y = panelHeight - halfSize;
            velocityY = -Math.abs(velocityY);
        }
    }
    
    public void setRandomVelocity(double maxVelocity) {
        this.velocityX = (Math.random() - 0.5) * maxVelocity;
        this.velocityY = (Math.random() - 0.5) * maxVelocity;
        this.angularVelocity = (Math.random() - 0.5) * Constants.ANGULAR_VELOCITY_RANGE;
    }
    
    public void stopMoving() {
        this.velocityX = 0;
        this.velocityY = 0;
        this.angularVelocity = 0;
        this.isMoving = false;
    }
    
    public void startMoving(double maxVelocity) {
        this.isMoving = true;
        setRandomVelocity(maxVelocity);
    }
} 