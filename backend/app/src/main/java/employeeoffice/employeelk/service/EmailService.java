package employeeoffice.employeelk.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService
{
    @Autowired
    private JavaMailSender mailSender;

    public void sendSimpleEmail(String toEmail, String subject, String body)
    {
        try
        {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("noreply@employeeik.ru");
            message.setTo(toEmail);
            message.setSubject(subject);
            message.setText(body);

            mailSender.send(message);
            System.out.println("Email успешно отправлен на: " + toEmail);
        }
        catch (Exception e)
        {
            System.err.println("Ошибка отправки email: " + e.getMessage());
            throw new RuntimeException("Не удалось отправить email", e);
        }
    }
}
