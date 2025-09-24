package employeeoffice.employeelk.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmployeeRequest {
    private String fullName;
    private String email;
    // Текущая зарплата
    private Double salary;
}
