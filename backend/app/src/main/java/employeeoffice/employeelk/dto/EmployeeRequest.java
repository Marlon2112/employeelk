package employeeoffice.employeelk.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmployeeRequest {
    private String fullName;
    private String email;
    private String login;
    private String password;
    // Текущая зарплата
    private Double salary;
}
