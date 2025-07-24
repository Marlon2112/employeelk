package employeeoffice.employeelk.service;

import employeeoffice.employeelk.model.Login;
import employeeoffice.employeelk.model.Role;
import employeeoffice.employeelk.repository.LoginRepository;
import employeeoffice.employeelk.repository.RoleRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;

@Service
public class LoginService {

    private static final Logger logger = LoggerFactory.getLogger(LoginService.class);

    @Autowired
    private LoginRepository loginRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RoleRepository roleRepository;

    @Transactional
    public boolean registerUser(String login, String rawPassword) {
        if (loginRepository.findByLogin(login).isPresent()) {
            logger.info("Пользователь с логином '{}' уже существует", login);
            return false;
        }

        Login newUser = new Login();
        newUser.setLogin(login);
        newUser.setPassword(passwordEncoder.encode(rawPassword));
        // Назначаем роль EMPLOYEE
        Role employeeRole = roleRepository.findByName("EMPLOYEE").orElseThrow(() -> new RuntimeException("Роль EMPLOYEE не найдена"));
        newUser.setRoles(Collections.singleton(employeeRole));
        logger.info("Сохраняю пользователя: {}", login);
        loginRepository.save(newUser);
        logger.info("Сохранил пользователя, id: {}", newUser.getId());
        Login saved = loginRepository.save(newUser);
        logger.info("ID нового пользователя после save: {}", saved.getId());
        return true;
    }
}