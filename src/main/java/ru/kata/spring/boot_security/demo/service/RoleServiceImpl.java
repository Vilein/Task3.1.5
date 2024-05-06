package ru.kata.spring.boot_security.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.repositories.RoleRepository;

import java.util.List;
@Service
public class RoleServiceImpl implements RoleService{
    private final RoleRepository roleRepository;
    @Autowired
    public RoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }
    @Override
    @Transactional
    public List<Role> getRoles() {
        return roleRepository.findAll();
    }
    @Transactional
    public List<Role> findALL() throws UsernameNotFoundException {
        List<Role> roles = roleRepository.findAll();
        if (roles == null) {
            new UsernameNotFoundException("нет ролей");
        }
        return roles;
    }
}
