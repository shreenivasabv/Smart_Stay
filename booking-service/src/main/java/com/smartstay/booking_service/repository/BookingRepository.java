package com.smartstay.booking_service.repository;

import com.smartstay.booking_service.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDate;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUserId(Long userId);
    List<Booking> findByPropertyId(Long propertyId);

    @Query("SELECT b FROM Booking b WHERE b.propertyId = :propertyId " +
           "AND b.status != 'CANCELLED' " +
           "AND b.checkIn < :checkOut " +
           "AND b.checkOut > :checkIn")

    List<Booking> findConflictingBookings(
        @Param("propertyId") Long propertyId,
        @Param("checkIn") LocalDate checkIn,
        @Param("checkOut") LocalDate checkOut
    );


}