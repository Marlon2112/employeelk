package employeeoffice.employeelk.controller;

import employeeoffice.employeelk.model.Employee;
import employeeoffice.employeelk.model.Salary;
import employeeoffice.employeelk.model.WorkingTime;
import employeeoffice.employeelk.repository.EmployeeRepository;
import employeeoffice.employeelk.repository.SalaryRepository;
import employeeoffice.employeelk.repository.WorkingTimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/admin")
public class AdminController {

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
    public String addEmployee(@RequestParam String fullName, @RequestParam String email, Model model) {
        Employee employee = new Employee();
        employee.setFullName(fullName);
        employee.setEmail(email);
        employeeRepository.save(employee);
        // Можно сразу создать запись зарплаты и рабочего времени
        Salary salary = new Salary();
        salary.setEmployee(employee);
        salary.setAmount(0.0);
        salaryRepository.save(salary);

        WorkingTime wt = new WorkingTime();
        wt.setEmployee(employee);
        wt.setExtraHours(0);
        workingTimeRepository.save(wt);
        return "redirect:/admin";
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