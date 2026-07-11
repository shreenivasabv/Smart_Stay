package com.smartstay.booking_service.service;

import com.smartstay.booking_service.entity.Booking;
import com.smartstay.booking_service.event.BookingEvent;
import com.smartstay.booking_service.messaging.BookingProducer;
import com.smartstay.booking_service.repository.BookingRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final BookingProducer bookingProducer;

    public BookingService(BookingRepository bookingRepository,
                         BookingProducer bookingProducer) {
        this.bookingRepository = bookingRepository;
        this.bookingProducer = bookingProducer;
    }

    public Booking createBooking(Booking booking) {

        // Step 1: Validate dates
        if (booking.getCheckIn() == null || booking.getCheckOut() == null) {
            throw new RuntimeException("Check-in and check-out dates required!");
        }
        if (!booking.getCheckOut().isAfter(booking.getCheckIn())) {
            throw new RuntimeException("Check-out must be after check-in!");
        }

        // Step 2: Check conflicts
        List<Booking> conflicts = bookingRepository.findConflictingBookings(
            booking.getPropertyId(),
            booking.getCheckIn(),
            booking.getCheckOut()
        );

        if (!conflicts.isEmpty()) {
            throw new RuntimeException(
                "Property already booked from " +
                conflicts.get(0).getCheckIn() +
                " to " +
                conflicts.get(0).getCheckOut()
            );
        }

        // Step 3: Save booking
        booking.setStatus("PENDING");
        Booking saved = bookingRepository.save(booking);

        // Step 4: Send to RabbitMQ
        BookingEvent event = new BookingEvent(
            saved.getId(),
            saved.getUserId(),
            saved.getPropertyId(),
            saved.getCheckIn(),
            saved.getCheckOut(),
            saved.getTotalPrice(),
            saved.getStatus()
        );
        bookingProducer.sendBookingConfirmation(event);

        return saved;
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Optional<Booking> getBookingById(Long id) {
        return bookingRepository.findById(id);
    }

    public List<Booking> getBookingsByUser(Long userId) {
        return bookingRepository.findByUserId(userId);
    }

    public Booking confirmBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        booking.setStatus("CONFIRMED");

        Booking confirmed = bookingRepository.save(booking);

        // Send confirmation event
        BookingEvent event = new BookingEvent(
            confirmed.getId(),
            confirmed.getUserId(),
            confirmed.getPropertyId(),
            confirmed.getCheckIn(),
            confirmed.getCheckOut(),
            confirmed.getTotalPrice(),
            confirmed.getStatus()
        );
        bookingProducer.sendBookingConfirmation(event);

        return confirmed;
    }

    public Booking cancelBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        booking.setStatus("CANCELLED");
        return bookingRepository.save(booking);
    }
}