package com.smartstay.booking_service.messaging;

import com.smartstay.booking_service.event.BookingEvent;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class BookingProducer {

    private final RabbitTemplate rabbitTemplate;

    @Value("${rabbitmq.exchange}")
    private String exchange;

    @Value("${rabbitmq.routing.key}")
    private String routingKey;

    public BookingProducer(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void sendBookingConfirmation(BookingEvent event) {
        rabbitTemplate.convertAndSend(exchange, routingKey, event);
        System.out.println("Booking event sent to RabbitMQ: " + event.getBookingId());
    }
}