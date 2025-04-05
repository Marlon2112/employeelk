package employeeoffice.employeelk.controller;

import employeeoffice.employeelk.model.Employee;
import employeeoffice.employeelk.model.Vacation;
import employeeoffice.employeelk.repository.EmployeeRepository;
import employeeoffice.employeelk.repository.VacationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@Controller
@RequestMapping("/vacation")
public class VacationController {

    @Autowired
    private VacationRepository vacationRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    // Отобразить форму оформления отпуска
    @GetMapping
    public String showVacationForm(Model model, @RequestParam(required = false) Long employeeId) {
        Vacation vacation = new Vacation();
        if (employeeId != null) {
            Employee employee = employeeRepository.findById(employeeId).orElse(null);
            vacation.setEmployee(employee);
        }
        model.addAttribute("vacation", vacation);
        return "vacation";
    }

    // Обработка отправки формы
    @PostMapping
    public String submitVacation(@RequestParam Long employeeId,
                                 @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
                                 @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
                                 Model model) {
        Employee employee = employeeRepository.findById(employeeId).orElse(null);
        if (employee == null) {
            model.addAttribute("error", "Сотрудник не найден");
            return "vacation";
        }
        Vacation vacation = new Vacation();
        vacation.setEmployee(employee);
        vacation.setStartDate(startDate);
        vacation.setEndDate(endDate);
        vacationRepository.save(vacation);
        model.addAttribute("message", "Заявка на отпуск успешно подана");
        return "vacation";
    }
}