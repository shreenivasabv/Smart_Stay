package com.smartstay.api_gateway;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

@RestController 
public class TestController {
    @GetMapping("/test")
    public String test(){
        return "API Gateway is working";
    }
    
    
}
