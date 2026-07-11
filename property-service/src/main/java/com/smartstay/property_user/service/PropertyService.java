package com.smartstay.property_user.service;

import com.smartstay.property_user.entity.Property;
import com.smartstay.property_user.repository.PropertyRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class PropertyService {

    private final PropertyRepository propertyRepository;

    public PropertyService(PropertyRepository propertyRepository) {
        this.propertyRepository = propertyRepository;
    }

    public Property addProperty(Property property) {
        return propertyRepository.save(property);
    }

    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }

    public Optional<Property> getPropertyById(Long id) {
        return propertyRepository.findById(id);
    }

    public List<Property> getByLocation(String location) {
        return propertyRepository.findByLocation(location);
    }

    public void deleteProperty(Long id) {
        propertyRepository.deleteById(id);
    }
}