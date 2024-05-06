package ru.kata.spring.boot_security.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.security.Principal;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Controller
@RequestMapping("/admin")
public class AdminController {
    private final UserService userService;
    private final RoleService roleService;

    public AdminController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }
    @GetMapping("/users")
    public String getAllUsers(Model model, Principal principal, Long id) {
        User user = (User) userService.loadUserByUsername(principal.getName());
        List<User> allUsers = userService.getAllUsers();
        List<Role> roles = roleService.getRoles();
        String role = user.roleToString();

        model.addAttribute("newUser", new User());
        model.addAttribute("allUsers", allUsers);
        model.addAttribute("userBN", user);
        model.addAttribute("allRoles", roles);
        model.addAttribute("role", role);

        return "users";
    }
    @PostMapping()
    public String create(@ModelAttribute("user") User user) {
        userService.add(user);
        return "redirect:/admin/users";
    }

    @PutMapping(value = "/updateInfo/{id}")
    public String updateUser(@ModelAttribute("user") User updatedUser) {
        userService.update(updatedUser);
        return "redirect:/admin/users";
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable("id") Long id) {
        userService.delete(id);
        return "redirect:/admin/users";
    }
}