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

import java.util.List;

@Controller
@RequestMapping("/personalinfo")
public class PersonalInfoController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private SalaryRepository salaryRepository;

    @Autowired
    private WorkingTimeRepository workingTimeRepository;

    // Отобразить информацию о сотруднике
    @GetMapping
    public String getPersonalInfo(@RequestParam Long employeeId, Model model) {
        Employee employee = employeeRepository.findById(employeeId).orElse(null);
        if (employee == null) {
            model.addAttribute("error", "Сотрудник не найден");
            return "personalinfo";
        }
        Salary salary = salaryRepository.findByEmployee(employee);
        List<WorkingTime> workingTimes = workingTimeRepository.findByEmployee(employee);

        model.addAttribute("employee", employee);
        model.addAttribute("salary", salary);
        model.addAttribute("workingTimes", workingTimes);
        return "personalinfo";
    }
}