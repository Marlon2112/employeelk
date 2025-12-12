package employeeoffice.employeelk.service;

import employeeoffice.employeelk.dto.EmployeeRequest;
import employeeoffice.employeelk.dto.LoginRequest;
import employeeoffice.employeelk.model.Employee;
import employeeoffice.employeelk.model.Login;
import employeeoffice.employeelk.repository.EmployeeRepository;
import employeeoffice.employeelk.repository.LoginRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class LoginService {

    private static final Logger logger = LoggerFactory.getLogger(LoginService.class);

    @Autowired
    private LoginRepository loginRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public boolean registerUser(LoginRequest loginRequest) {
        logger.info("Регестрируем Логин");
        if (loginRepository.findByLogin(loginRequest.getLogin()).isPresent()) {
            logger.info("Пользователь с логином '{}' уже существует", loginRequest);
            return false;
        }

        logger.info("Логин request{}", loginRequest);
        logger.info("Логин request поле ЛОГИН: {}", loginRequest.getLogin());
        logger.info("Логин request поле ПАССФОРД: {}", loginRequest.getPassword());
        
        Login newUser = new Login();
        newUser.setLogin(loginRequest.getLogin());
        newUser.setPassword(passwordEncoder.encode(loginRequest.getPassword()));
        logger.info("Сохраняю пользователя: {}", loginRequest.getLogin());
        loginRepository.save(newUser);
        logger.info("Сохранил пользователя, id: {}", newUser.getId());
        Login saved = loginRepository.save(newUser);
        logger.info("ID нового пользователя после save: {}", saved.getId());
        return true;
    }


    @Transactional
    public boolean registerEmployee(EmployeeRequest employeeRequest){
        String email = employeeRequest.getEmail();
        String fullName = employeeRequest.getFullName();
        Double salary = employeeRequest.getSalary();
        
        String login = employeeRequest.getLogin();
        String password = employeeRequest.getPassword();

        if (fullName == null || fullName.trim().isEmpty()){
            logger.info("Имя сотрудника не может быть пустым");
            return false;
        }

        if (email == null || email.trim().isEmpty()){
            logger.info("Email сотрудника не может быть пустым");
            return false;
        }


        if(employeeRepository.findByEmail(email).isPresent()){
            logger.info("Сотрудник с email:  {}, существует", email);
            return false;
        }
        
        Login newLogin = new Login();
        newLogin.setLogin(login);
        newLogin.setPassword(passwordEncoder.encode(password));
        loginRepository.save(newLogin);
        

        Employee newEmployee = new Employee();
        newLogin.setEmployee(newEmployee);
        newEmployee.setEmail(email);
        newEmployee.setFullName(fullName);
        newEmployee.setLogin(newLogin);
        newEmployee.setSalary(salary);
        logger.info("Сохраняю сотрудника:  {}, e-mail:  {}", fullName, email);
        employeeRepository.save(newEmployee);
        logger.info("Новый сотрудник добавлен в базу данных, id: {}", newEmployee.getId());
        return true;

    }
}