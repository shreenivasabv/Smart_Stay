package com.smartstay.booking_service.event;

import java.io.Serializable;
import java.time.LocalDate;

public class BookingEvent implements Serializable {

    private Long bookingId;
    private Long userId;
    private Long propertyId;
    private LocalDate checkIn;
    private LocalDate checkOut;
    private Double totalPrice;
    private String status;

    public BookingEvent() {}

    public BookingEvent(Long bookingId, Long userId, Long propertyId,
                       LocalDate checkIn, LocalDate checkOut,
                       Double totalPrice, String status) {
        this.bookingId = bookingId;
        this.userId = userId;
        this.propertyId = propertyId;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.totalPrice = totalPrice;
        this.status = status;
    }

    // Getters
    public Long getBookingId() { return bookingId; }
    public Long getUserId() { return userId; }
    public Long getPropertyId() { return propertyId; }
    public LocalDate getCheckIn() { return checkIn; }
    public LocalDate getCheckOut() { return checkOut; }
    public Double getTotalPrice() { return totalPrice; }
    public String getStatus() { return status; }

    // Setters
    public void setBookingId(Long bookingId) { this.bookingId = bookingId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public void setPropertyId(Long propertyId) { this.propertyId = propertyId; }
    public void setCheckIn(LocalDate checkIn) { this.checkIn = checkIn; }
    public void setCheckOut(LocalDate checkOut) { this.checkOut = checkOut; }
    public void setTotalPrice(Double totalPrice) { this.totalPrice = totalPrice; }
    public void setStatus(String status) { this.status = status; }
}