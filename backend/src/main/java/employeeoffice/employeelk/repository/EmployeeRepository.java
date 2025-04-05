package employeeoffice.employeelk.repository;

import employeeoffice.employeelk.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    // Дополнительные методы поиска, например, по email или ФИО
    Employee findByFullName(String fullName);
}
