package employeeoffice.employeelk.security;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;


@Component
public class TokenProvider {
    public String generateToken(Authentication authentication) {
        String username = authentication.getName();
        return "token-placeholder-" + username + "-" + System.currentTimeMillis();
    }
}