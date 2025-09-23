package employeeoffice.employeelk;

import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class BcryptTest {
    @Test
    void gen() {
        System.out.println(new BCryptPasswordEncoder(10).encode("Admin12345!"));
    }
}