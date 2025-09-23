package employeeoffice.employeelk.controller;

import employeeoffice.employeelk.dto.EmployeeRequest;
import employeeoffice.employeelk.model.Employee;
import employeeoffice.employeelk.model.Salary;
import employeeoffice.employeelk.model.WorkingTime;
import employeeoffice.employeelk.repository.EmployeeRepository;
import employeeoffice.employeelk.repository.SalaryRepository;
import employeeoffice.employeelk.repository.WorkingTimeRepository;
import employeeoffice.employeelk.service.LoginService;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final Logger logger = LoggerFactory.getLogger(AdminController.class);

    @Autowired
    private LoginService loginService;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private SalaryRepository salaryRepository;

    @Autowired
    private WorkingTimeRepository workingTimeRepository;

    // Получение списка сотрудников
    @GetMapping("/employees")
    public ResponseEntity<?> getAllEmployees() {
        try {
            List<Employee> employees = employeeRepository.findAllByOrderByFullNameAsc();
            logger.info("Данные сотрудников: {}", employees);
            return new ResponseEntity<>(employees, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Ошибка получения списка сотрудников: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Внутренняя ошибка сервера"));
        }
    }

    // Получение сотрудника
    @GetMapping("/employees/{id}")
    public ResponseEntity<?> getEmployee(@PathVariable long id) {
        try {
            Employee employee = employeeRepository.findById(id);
            logger.info("Данные сотрудника с id {}: {}", id, employee);
            return new ResponseEntity<>(employee, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Ошибка получения сотрудника: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Внутренняя ошибка сервера"));
        }
    }

    // Добавление нового сотрудника
    @PostMapping("/employee")
    public ResponseEntity<?> addEmployee(@RequestBody EmployeeRequest request) {
        /* Employee employee = new Employee();
        logger.debug(String.format("Full Name: ", fullName));
        employee.setFullName(fullName);
        logger.debug(String.format("E-mail: ", email));
        employee.setEmail(email);
        employeeRepository.save(employee);
         */
        // Можно сразу создать запись зарплаты и рабочего времени
        // Salary salary = new Salary();к
        // salary.setEmployee(employee);
        // salary.setAmount(0.0);
        // salaryRepository.save(salary);

        // WorkingTime wt = new WorkingTime();
        // wt.setEmployee(employee);
        // wt.setExtraHours(0);
        // workingTimeRepository.save(wt);
        // 
        String email = request.getEmail();
        String fullName = request.getFullName();
        logger.info("Получен запрос на добавление сотрудника: {}, e-mail: {}", fullName, email);

        if (fullName == null || fullName.trim().isEmpty()){
            return ResponseEntity.badRequest()
                .body(Map.of("error", "Имя сотрудника не может быть пустым"));
        }

        if (email == null || email.trim().isEmpty()){
            return ResponseEntity.badRequest()
                .body(Map.of("error", "Email сотрудника не может быть пустым"));
        }

        try {
            if (loginService.registerEmployee(fullName, email)) {
                return ResponseEntity.ok(Map.of("message", "Сотрудник добавлен!"));
            } else {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body(Map.of("error", "Этот email уже занят."));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Внутренняя ошибка сервера"));
        }
    }

    // Обновление данных сотрудника
    @PutMapping("/employee")
    public ResponseEntity<?> updateEmployee(@RequestBody Employee request) {
        String email = request.getEmail();
        String fullName = request.getFullName();
        long id = request.getId();
        logger.info("Получен запрос на обновление сотрудника: {}, e-mail: {}", fullName, email);

        try {
            // Проверяем, существует ли сотрудник
            Employee existingEmployee = employeeRepository.findById(id);
            if (existingEmployee == null) {
                logger.error("Сотрудник с ID {} не найден", id);
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "Сотрудник не найден"));
            }

            if (fullName == null || fullName.trim().isEmpty()){
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "Имя сотрудника не может быть пустым"));
            }

            if (email == null || email.trim().isEmpty()){
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "Email сотрудника не может быть пустым"));
            }

            if(employeeRepository.findByEmail(email).isPresent()){
                logger.info("Сотрудник с email:  {}, существует", email);
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body(Map.of("error", "Этот email уже занят."));
            }

            employeeRepository.save(request);
            logger.info("Сотрудник с ID {} успешно обновлен", id);
            return ResponseEntity.ok(Map.of("message", "Сотрудник обновлен!"));
        } catch (Exception e) {
            logger.error("Ошибка при обновлении сотрудника: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Внутренняя ошибка сервера"));
        }
    }

    // Удаление данных сотрудника
    @DeleteMapping("/employee/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable long id) {
        logger.info("Получен запрос на удаление сотрудника с ID {}", id);

        try {
            // Проверяем, существует ли сотрудник
            Employee existingEmployee = employeeRepository.findById(id);
            if (existingEmployee == null) {
                logger.error("Сотрудник с ID {} не найден", id);
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "Сотрудник не найден"));
            }

            employeeRepository.deleteById(id);
            logger.info("Сотрудник с ID {} успешно удален", id);
            return ResponseEntity.ok(Map.of("message", "Сотрудник удален!"));
        } catch (Exception e) {
            logger.error("Ошибка при удалении сотрудника: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Внутренняя ошибка сервера"));
        }
    }


    // Обновление зарплаты сотрудника
    @PostMapping("/updateSalary")
    public String updateSalary(@RequestParam Long employeeId, @RequestParam Double amount) {
        Salary salary = salaryRepository.findByEmployee(employeeRepository.findById(employeeId).orElse(null));
        if (salary != null) {
            salary.setAmount(amount);
            salaryRepository.save(salary);
        }
        return "redirect:/admin";
    }

    // Добавление доп. часов сотруднику
    @PostMapping("/addExtraHours")
    public String addExtraHours(@RequestParam Long employeeId, @RequestParam Integer extraHours) {
        WorkingTime wt = workingTimeRepository.findByEmployee(employeeRepository.findById(employeeId).orElse(null))
                .stream().findFirst().orElse(null);
        if (wt != null) {
            wt.setExtraHours(wt.getExtraHours() + extraHours);
            workingTimeRepository.save(wt);
        }
        return "redirect:/admin";
    }
}