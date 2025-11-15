package employeeoffice.employeelk.dto;

public class EmailRequest
{
    private String toEmail;
    private String subject;
    private String message;

    // Конструкторы
    public EmailRequest() {}

    public EmailRequest(String toEmail, String subject, String message)
    {
        this.toEmail = toEmail;
        this.subject = subject;
        this.message = message;
    }

    // Геттеры и сеттеры
    public String getToEmail() { return toEmail; }
    public void setToEmail(String toEmail) { this.toEmail = toEmail; }

    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
