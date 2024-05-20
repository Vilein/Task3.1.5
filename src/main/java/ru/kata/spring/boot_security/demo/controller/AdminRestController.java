package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/userss")
public class AdminRestController {
    private UserService userService;
    @Autowired
    public AdminRestController(UserService userService) {
        this.userService = userService;
    }

//    @GetMapping("/userss")
//    public ResponseEntity<User> getUserData (Principal principal) {
//        User user = (User) userService.loadUserByUsername(principal.getName());
//        return new ResponseEntity<>(user, HttpStatus.OK);
//    }
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById (@PathVariable("id") Long id) {
        User user = userService.getUserById(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
    @GetMapping
    public ResponseEntity<List<User>> showUsers() {
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }

    @PostMapping("/addUser")
    public ResponseEntity<HttpStatus> saveNewUser(@RequestBody User user) {
        userService.add(user);
        return new ResponseEntity<> (HttpStatus.OK);
    }

    @PutMapping(value = "/addUser")
    public ResponseEntity<HttpStatus> updateUser(@RequestBody User user) {
        userService.add(user);
        return new ResponseEntity<> (HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteUser(@PathVariable("id") Long id) {
        userService.delete(id);
        return new ResponseEntity<> (HttpStatus.OK);
    }
}
