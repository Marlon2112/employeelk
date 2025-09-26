package employeeoffice.employeelk;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;

@SpringBootApplication
@Import(employeeoffice.securitycommon.SecurityConfig.class)
public class EmployeelkApplication {

	public static void main(String[] args) {
		SpringApplication.run(EmployeelkApplication.class, args);
	}

}
