package com.example.demo;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HomeController {

    @RequestMapping("/check")
    public String main() {
        return "check";
    }

    @RequestMapping(value = "/")
    public String home() {
        return "login";
    }

    @RequestMapping(value = "/login")
    public String login() {
        return "login";
    }

    @RequestMapping("/toBack")
    public @ResponseBody String toBack(String data){
        System.out.println(data);
        return "success";
    }
}
