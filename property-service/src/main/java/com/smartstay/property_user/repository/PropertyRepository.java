package com.smartstay.property_user.repository;

import com.smartstay.property_user.entity.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PropertyRepository extends JpaRepository<Property, Long> {
    List<Property> findByLocation(String location);
    List<Property> findByAvailable(Boolean available);
}