package employeeoffice.employeelk.service;

import employeeoffice.employeelk.dto.EmployeeRequest;
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
    public boolean registerUser(String login, String rawPassword) {
        if (loginRepository.findByLogin(login).isPresent()) {
            logger.info("Пользователь с логином '{}' уже существует", login);
            return false;
        }

        Login newUser = new Login();
        newUser.setLogin(login);
        newUser.setPassword(passwordEncoder.encode(rawPassword));
        logger.info("Сохраняю пользователя: {}", login);
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

        Employee newEmployee = new Employee();
        newEmployee.setEmail(email);
        newEmployee.setFullName(fullName);
        newEmployee.setSalary(salary);
        logger.info("Сохраняю сотрудника:  {}, e-mail:  {}", fullName, email);
        employeeRepository.save(newEmployee);
        logger.info("Новый сотрудник добавлен в базу данных, id: {}", newEmployee.getId());
        return true;


    }
}