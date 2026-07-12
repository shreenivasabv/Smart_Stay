package com.smartstay.property_user.entity;

import jakarta.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "properties")
public class Property implements Serializable {  // ← Add this!

    private static final long serialVersionUID = 1L;  // ← Add this!

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String location;
    private String description;
    private Double pricePerNight;
    private Integer totalRooms;
    private String propertyType;
    private Boolean available;

    // All getters and setters same as before...
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getLocation() { return location; }
    public String getDescription() { return description; }
    public Double getPricePerNight() { return pricePerNight; }
    public Integer getTotalRooms() { return totalRooms; }
    public String getPropertyType() { return propertyType; }
    public Boolean getAvailable() { return available; }

    public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setLocation(String location) { this.location = location; }
    public void setDescription(String description) { this.description = description; }
    public void setPricePerNight(Double price) { this.pricePerNight = price; }
    public void setTotalRooms(Integer rooms) { this.totalRooms = rooms; }
    public void setPropertyType(String type) { this.propertyType = type; }
    public void setAvailable(Boolean available) { this.available = available; }
}