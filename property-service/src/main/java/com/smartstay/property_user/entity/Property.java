package com.smartstay.property_user.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "properties")
public class Property {

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
    public void setPricePerNight(Double pricePerNight) { this.pricePerNight = pricePerNight; }
    public void setTotalRooms(Integer totalRooms) { this.totalRooms = totalRooms; }
    public void setPropertyType(String propertyType) { this.propertyType = propertyType; }
    public void setAvailable(Boolean available) { this.available = available; }
}