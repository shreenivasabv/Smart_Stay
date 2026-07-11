package com.smartstay.booking_service.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDate;

@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private Long propertyId;
    private LocalDate checkIn;
    private LocalDate checkOut;
    private Double totalPrice;
    private String status;

    public Long getId() { return id; }
    public Long getUserId() { return userId; }
    public Long getPropertyId() { return propertyId; }
    public LocalDate getCheckIn() { return checkIn; }
    public LocalDate getCheckOut() { return checkOut; }
    public Double getTotalPrice() { return totalPrice; }
    public String getStatus() { return status; }

    public void setId(Long id) { this.id = id; }
    public void setUserId(Long userId) { this.userId = userId; }
    public void setPropertyId(Long propertyId) { this.propertyId = propertyId; }
    public void setCheckIn(LocalDate checkIn) { this.checkIn = checkIn; }
    public void setCheckOut(LocalDate checkOut) { this.checkOut = checkOut; }
    public void setTotalPrice(Double totalPrice) { this.totalPrice = totalPrice; }
    public void setStatus(String status) { this.status = status; }
}