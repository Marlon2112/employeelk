package employeeoffice.employeelk.controller;

import employeeoffice.employeelk.dto.LoginRequest;
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
                .map(user -> ResponseEntity.ok(Map.of(
                        "message", "Авторизация успешна!",
                        "role", user.getRole().name(),
                        "mustChangePassword", Boolean.TRUE.equals(user.getMustChangePassword())
                )))
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Неверные логин или пароль")));
    }

    // === смена пароля (доступно даже если mustChangePassword=true) ===
    public static class ChangePasswordRequest {
        private String login;
        private String oldPassword;
        private String newPassword;

        public String getLogin() { return login; }
        public void setLogin(String login) { this.login = login; }
        public String getOldPassword() { return oldPassword; }
        public void setOldPassword(String oldPassword) { this.oldPassword = oldPassword; }
        public String getNewPassword() { return newPassword; }
        public void setNewPassword(String newPassword) { this.newPassword = newPassword; }
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest req) {
        var userOpt = loginRepository.findByLogin(req.getLogin());
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Пользователь не найден"));
        }
        var user = userOpt.get();
        if (!passwordEncoder.matches(req.getOldPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("error", "Неверный текущий пароль"));
        }
        if (req.getNewPassword() == null || req.getNewPassword().length() < 10) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "Пароль слишком короткий (мин. 10 символов)"));
        }
        user.setPassword(passwordEncoder.encode(req.getNewPassword()));
        user.setMustChangePassword(false);
        loginRepository.save(user);
        return ResponseEntity.noContent().build();
    }
}
