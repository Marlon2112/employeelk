package employeeoffice.employeelk.controller;

import employeeoffice.employeelk.dto.EmployeeRequest;
import employeeoffice.employeelk.model.Employee;
import employeeoffice.employeelk.model.Salary;
import employeeoffice.employeelk.model.WorkingTime;
import employeeoffice.employeelk.repository.EmployeeRepository;
import employeeoffice.employeelk.repository.SalaryRepository;
import employeeoffice.employeelk.repository.WorkingTimeRepository;
import employeeoffice.employeelk.service.LoginService;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

//TODO поменять /api  на /api/admin, записать путь в SecurityConfig
@RestController
@RequestMapping("/api/employees")
public class AdminController {

    private Logger logger = LoggerFactory.getLogger(AdminController.class);

    @Autowired
    private LoginService loginService;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private SalaryRepository salaryRepository;

    @Autowired
    private WorkingTimeRepository workingTimeRepository;

    // Отобразить панель администратора со списком сотрудников
    @GetMapping
    public String adminPanel(Model model) {
        model.addAttribute("employees", employeeRepository.findAll());
        return "admin";
    }

    // Добавление нового сотрудника

    @PostMapping("/add-employee")
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
        String fullName = request.getName();
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