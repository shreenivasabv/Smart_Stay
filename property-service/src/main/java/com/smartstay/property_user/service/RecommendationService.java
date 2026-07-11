package com.smartstay.property_user.service;

import com.smartstay.property_user.entity.Property;
import com.smartstay.property_user.repository.PropertyRepository;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class RecommendationService {

    private final PropertyRepository propertyRepository;

    public RecommendationService(PropertyRepository propertyRepository) {
        this.propertyRepository = propertyRepository;
    }

    // Content-based: find similar properties
    public List<Property> getSimilarProperties(Long propertyId) {

        // Get the reference property
        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new RuntimeException("Property not found"));

        // Price range ±30%
        Double minPrice = property.getPricePerNight() * 0.7;
        Double maxPrice = property.getPricePerNight() * 1.3;

        // Find by location and price
        List<Property> byLocation = propertyRepository
                .findSimilarByLocationAndPrice(
                    property.getLocation(),
                    minPrice,
                    maxPrice,
                    propertyId
                );

        // Find by property type
        List<Property> byType = propertyRepository
                .findByPropertyType(
                    property.getPropertyType(),
                    propertyId
                );

        // Combine and remove duplicates
        Set<Long> seen = new HashSet<>();
        List<Property> combined = new ArrayList<>();

        for (Property p : byLocation) {
            if (seen.add(p.getId())) {
                combined.add(p);
            }
        }
        for (Property p : byType) {
            if (seen.add(p.getId())) {
                combined.add(p);
            }
        }

        // Return top 5
        return combined.stream()
                .limit(5)
                .collect(Collectors.toList());
    }

    // Content-based: by location and price range
    public List<Property> getByLocationAndPrice(
            String location, Double minPrice, Double maxPrice) {

        return propertyRepository
                .findByLocationAndPriceRange(location, minPrice, maxPrice)
                .stream()
                .limit(10)
                .collect(Collectors.toList());
    }

    // Collaborative filtering: based on user history
    public List<Property> getRecommendationsForUser(Long userId) {

        // Get all available properties
        List<Property> allProperties = propertyRepository
                .findByAvailable(true);

        // Simple collaborative approach:
        // Return properties the user hasn't interacted with
        // In real world → analyze booking patterns of similar users

        return allProperties.stream()
                .limit(5)
                .collect(Collectors.toList());
    }
}