package employeeoffice.employeelk.controller;

import employeeoffice.employeelk.dto.LoginRequest;
import employeeoffice.employeelk.model.Login;
import employeeoffice.employeelk.repository.LoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/login")
public class AuthController {

    @Autowired
    private LoginRepository loginRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        String login = request.getLogin();
        String password = request.getPassword();

        return loginRepository.findByLogin(login)
                .filter(user -> passwordEncoder.matches(password, user.getPassword()))
                .map(user -> ResponseEntity.ok(Map.of("message", "Авторизация успешна!")))
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Неверные логин или пароль")));
    }
}