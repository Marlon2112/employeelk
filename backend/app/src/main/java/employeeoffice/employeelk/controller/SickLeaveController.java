package employeeoffice.employeelk.controller;

import employeeoffice.employeelk.model.Employee;
import employeeoffice.employeelk.model.SickLeave;
import employeeoffice.employeelk.repository.EmployeeRepository;
import employeeoffice.employeelk.repository.SickLeaveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;

@Controller
@RequestMapping("/sickleave")
public class SickLeaveController {

    @Autowired
    private SickLeaveRepository sickLeaveRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    // Отобразить форму оформления больничного
    @GetMapping
    public String showSickLeaveForm(Model model, @RequestParam(required = false) Long employeeId) {
        SickLeave sickLeave = new SickLeave();
        if (employeeId != null) {
            Employee employee = employeeRepository.findById(employeeId).orElse(null);
            sickLeave.setEmployee(employee);
        }
        model.addAttribute("sickLeave", sickLeave);
        return "sickleave";
    }

    // Обработка отправки формы
    @PostMapping
    public String submitSickLeave(@RequestParam Long employeeId,
                                  @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
                                  @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
                                  @RequestParam(required = false) MultipartFile file,
                                  @RequestParam(required = false) String documentNumber,
                                  Model model) {

        Employee employee = employeeRepository.findById(employeeId).orElse(null);
        if (employee == null) {
            model.addAttribute("error", "Сотрудник не найден");
            return "sickleave";
        }
        SickLeave sickLeave = new SickLeave();
        sickLeave.setEmployee(employee);
        sickLeave.setStartDate(startDate);
        sickLeave.setEndDate(endDate);

        // Если прикреплён файл, можно сохранить его на диск или в БД
        if (file != null && !file.isEmpty()) {
            try {
                // Здесь можно сохранить файл, например, записав его в файловую систему
                String fileName = file.getOriginalFilename();
                // Для примера сохраняем только имя файла
                sickLeave.setDocumentInfo("Файл: " + fileName);
            } catch (Exception e) {
                e.printStackTrace();
            }
        } else if (documentNumber != null && !documentNumber.isEmpty()) {
            sickLeave.setDocumentInfo("Номер больничного: " + documentNumber);
        }

        sickLeaveRepository.save(sickLeave);
        model.addAttribute("message", "Заявка на больничный успешно подана");
        return "sickleave";
    }
}