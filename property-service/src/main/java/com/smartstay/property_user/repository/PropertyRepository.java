package com.smartstay.property_user.repository;

import com.smartstay.property_user.entity.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface PropertyRepository extends JpaRepository<Property, Long> {

    List<Property> findByLocation(String location);
    List<Property> findByAvailable(Boolean available);

    // Content-based: same location, similar price
    @Query("SELECT p FROM Property p WHERE p.location = :location " +
           "AND p.pricePerNight BETWEEN :minPrice AND :maxPrice " +
           "AND p.available = true " +
           "AND p.id != :excludeId")
    List<Property> findSimilarByLocationAndPrice(
        @Param("location") String location,
        @Param("minPrice") Double minPrice,
        @Param("maxPrice") Double maxPrice,
        @Param("excludeId") Long excludeId
    );

    // Content-based: same property type
    @Query("SELECT p FROM Property p WHERE p.propertyType = :propertyType " +
           "AND p.available = true " +
           "AND p.id != :excludeId")
    List<Property> findByPropertyType(
        @Param("propertyType") String propertyType,
        @Param("excludeId") Long excludeId
    );

    // By location and price range
    @Query("SELECT p FROM Property p WHERE p.location = :location " +
           "AND p.pricePerNight BETWEEN :minPrice AND :maxPrice " +
           "AND p.available = true")
    List<Property> findByLocationAndPriceRange(
        @Param("location") String location,
        @Param("minPrice") Double minPrice,
        @Param("maxPrice") Double maxPrice
    );
}