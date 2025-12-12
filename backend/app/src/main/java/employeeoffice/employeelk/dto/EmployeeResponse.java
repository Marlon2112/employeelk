package employeeoffice.employeelk.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Builder
public class EmployeeResponse {
    private String fullName;
    private String email;
    private String login;
    private String salary;
}
