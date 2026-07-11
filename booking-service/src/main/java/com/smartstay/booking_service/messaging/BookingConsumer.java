package com.smartstay.booking_service.messaging;

import com.smartstay.booking_service.event.BookingEvent;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
public class BookingConsumer {

    @RabbitListener(queues = "${rabbitmq.queue.booking}")
    public void receiveBookingConfirmation(BookingEvent event) {
        System.out.println("=================================");
        System.out.println("Booking Confirmation Received!");
        System.out.println("Booking ID  : " + event.getBookingId());
        System.out.println("User ID     : " + event.getUserId());
        System.out.println("Property ID : " + event.getPropertyId());
        System.out.println("Check-in    : " + event.getCheckIn());
        System.out.println("Check-out   : " + event.getCheckOut());
        System.out.println("Total Price : " + event.getTotalPrice());
        System.out.println("Status      : " + event.getStatus());
        System.out.println("=================================");
    }
}