package com.smartstay.property_user.controller;

import com.smartstay.property_user.entity.Property;
import com.smartstay.property_user.service.RecommendationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/recommendations")
public class RecommendationController {

    private final RecommendationService recommendationService;

    public RecommendationController(RecommendationService recommendationService) {
        this.recommendationService = recommendationService;
    }

    // Content-based: similar to a property
    @GetMapping("/similar/{propertyId}")
    public ResponseEntity<List<Property>> getSimilarProperties(
            @PathVariable Long propertyId) {
        return ResponseEntity.ok(
            recommendationService.getSimilarProperties(propertyId)
        );
    }

    // Content-based: by location and price range
    @GetMapping("/search")
    public ResponseEntity<List<Property>> searchRecommendations(
            @RequestParam String location,
            @RequestParam Double minPrice,
            @RequestParam Double maxPrice) {
        return ResponseEntity.ok(
            recommendationService.getByLocationAndPrice(location, minPrice, maxPrice)
        );
    }

    // Collaborative: based on user booking history
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Property>> getUserRecommendations(
            @PathVariable Long userId) {
        return ResponseEntity.ok(
            recommendationService.getRecommendationsForUser(userId)
        );
    }
}