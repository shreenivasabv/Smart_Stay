package com.smartstay.property_user.service;

import com.smartstay.property_user.entity.Property;
import com.smartstay.property_user.repository.PropertyRepository;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class PropertyService {

    private final PropertyRepository propertyRepository;

    public PropertyService(PropertyRepository propertyRepository) {
        this.propertyRepository = propertyRepository;
    }

    // Cache all properties for 10 minutes
    @Cacheable(value = "allProperties")
    public List<Property> getAllProperties() {
        System.out.println("Fetching from DATABASE...");
        return propertyRepository.findAll();
    }

    // Cache single property by ID
    @Cacheable(value = "property", key = "#id")
    public Optional<Property> getPropertyById(Long id) {
        System.out.println("Fetching property " + id + " from DATABASE...");
        return propertyRepository.findById(id);
    }

    // Clear cache when new property added
    @CacheEvict(value = {"allProperties", "property"}, allEntries = true)
    public Property addProperty(Property property) {
        System.out.println("Cache cleared! New property added.");
        return propertyRepository.save(property);
    }

    // Clear cache when property deleted
    @CacheEvict(value = {"allProperties", "property"}, allEntries = true)
    public void deleteProperty(Long id) {
        System.out.println("Cache cleared! Property deleted.");
        propertyRepository.deleteById(id);
    }

    public List<Property> getByLocation(String location) {
        return propertyRepository.findByLocation(location);
    }
}