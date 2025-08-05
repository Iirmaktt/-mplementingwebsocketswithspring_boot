package com.nazli.simsoft.controller;

import com.nazli.simsoft.dto.ShapeResponse;
import com.nazli.simsoft.dto.TotalShapesResponse;
import com.nazli.simsoft.service.ShapeService;
import com.nazli.simsoft.service.ShapeService.ShapeConfiguration;
import com.nazli.simsoft.util.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping(Constants.API_BASE_PATH)
public class ShapeController {

    @Autowired
    private ShapeService shapeService;

    @GetMapping("/setShapes")
    public ResponseEntity<ShapeResponse> setShapes(
            @RequestParam(defaultValue = "0") int circles,
            @RequestParam(defaultValue = "0") int rects,
            @RequestParam(defaultValue = "0") int triangles) {
        
        ShapeConfiguration config = shapeService.setShapes(circles, rects, triangles);
        ShapeResponse response = new ShapeResponse(config.getCircles(), config.getRects(), config.getTriangles());
        return ResponseEntity.ok(response);
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
} 