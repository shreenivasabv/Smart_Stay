package com.smartstay.property_user;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class TestController {

    @GetMapping("/test")
    public String test() {
        return "Property Service Running";
    }
}
