package employeeoffice.employeelk.controller;

import employeeoffice.employeelk.dto.LoginRequest;
import employeeoffice.employeelk.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import java.util.Map;

@RestController
@RequestMapping("/api/register")
public class RegistrationController {

    @Autowired
    private LoginService loginService;

    @PostMapping
    public ResponseEntity<?> registerUser(@RequestBody LoginRequest request) {
        String login = request.getLogin();
        String password = request.getPassword();

        if (loginService.registerUser(login, password)) {
            return ResponseEntity.ok(Map.of("message", "Регистрация успешна!"));
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("error", "Этот логин уже занят."));
        }
    }
}