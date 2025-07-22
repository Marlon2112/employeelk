package employeeoffice.employeelk.repository;

import employeeoffice.employeelk.model.Employee;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    // Дополнительные методы поиска, например, по email или ФИО
    Employee findByFullName(String fullName);

    Optional<Employee> findByEmail(String email);
}
