package employeeoffice.employeelk.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/login")
public class AuthController {

    @PostMapping
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        String login = request.get("login");
        String password = request.get("password");

        // Здесь должна быть логика проверки пользователя, пока заглушка:
        if ("admin".equals(login) && "admin".equals(password)) {
            return ResponseEntity.ok(Map.of("message", "Авторизация успешна!"));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Неверные логин или пароль"));
        }
    }
}