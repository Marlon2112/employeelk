package employeeoffice.passwordtool;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;
import org.springframework.security.crypto.password.PasswordEncoder;

@Import(employeeoffice.securitycommon.SecurityConfig.class)
public class PasswordToolApplication implements CommandLineRunner {

    private final PasswordEncoder encoder;

    public PasswordToolApplication(PasswordEncoder encoder) {
        this.encoder = encoder;
    }

    public static void main(String[] args) {
        SpringApplication.run(PasswordToolApplication.class, args);
    }

    @Override
    public void run(String... args) {
        if (args.length == 0) {
            System.out.println("❌ Укажите пароль для генерации, например:");
            System.out.println("   java -jar password-tool.jar MySecret123");
            return;
        }

        String rawPassword = args[0];
        String hash = encoder.encode(rawPassword);

        System.out.println("🔑 Пароль: " + rawPassword);
        System.out.println("💾 BCrypt-хэш: " + hash);
    }
}
