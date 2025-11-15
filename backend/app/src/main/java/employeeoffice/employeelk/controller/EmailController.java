package employeeoffice.employeelk.controller;

import employeeoffice.employeelk.dto.EmailRequest;
import employeeoffice.employeelk.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
@CrossOrigin(origins = "*")

public class EmailController
{
    @Autowired
    private EmailService emailService;

    // Вариант 1: Через @RequestParam (для простых форм)
    @PostMapping("/send")
    public ResponseEntity<String> sendEmail(@RequestParam String toEmail,
                                            @RequestParam String subject,
                                            @RequestParam String message) {
        try
        {
            emailService.sendSimpleEmail(toEmail, subject, message);
            return ResponseEntity.ok("Email успешно отправлен на: " + toEmail);
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body("Ошибка отправки email: " + e.getMessage());
        }
    }

    // Вариант 2: Через @RequestBody (для JSON)
    @PostMapping("/send-json")
    public ResponseEntity<String> sendEmailJson(@RequestBody EmailRequest emailRequest)
    {
        try
        {
            emailService.sendSimpleEmail(
                    emailRequest.getToEmail(),
                    emailRequest.getSubject(),
                    emailRequest.getMessage()
            );
            return ResponseEntity.ok("Email успешно отправлен на: " + emailRequest.getToEmail());
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body("Ошибка отправки email: " + e.getMessage());
        }
    }

    // Для отправки приветственного письма
    @PostMapping("/welcome")
    public ResponseEntity<String> sendWelcomeEmail(@RequestParam String toEmail)
    {
        String subject = "Добро пожаловать в EmployeeIK!";
        String message = "Здравствуйте!\n\n" +
                "Вы успешно зарегистрированы в системе EmployeeIK.\n\n" +
                "С уважением,\nКоманда EmployeeIK";

        try
        {
            emailService.sendSimpleEmail(toEmail, subject, message);
            return ResponseEntity.ok("Приветственное письмо отправлено на: " + toEmail);
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body("Ошибка отправки: " + e.getMessage());
        }
    }
    // Тестовый endpoint
    @GetMapping("/test")
    public String test()
    {
        return "Email controller is working!";
    }
}
