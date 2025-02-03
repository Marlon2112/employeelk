package employeeoffice.employeelk.service;

import employeeoffice.employeelk.model.Login;
import employeeoffice.employeelk.repository.LoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    @Autowired
    private LoginRepository loginRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public boolean registerUser(String login, String rawPassword) {
        if (loginRepository.findByLogin(login).isPresent()) {
            return false; // Логин уже существует
        }

        Login newUser = new Login();
        newUser.setLogin(login);
        newUser.setPassword(passwordEncoder.encode(rawPassword)); // Шифруем пароль
        loginRepository.save(newUser);
        return true;
    }
}