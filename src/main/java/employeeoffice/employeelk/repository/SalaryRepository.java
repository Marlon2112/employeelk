package employeeoffice.employeelk.repository;

import employeeoffice.employeelk.model.Salary;
import employeeoffice.employeelk.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SalaryRepository extends JpaRepository<Salary, Long> {
    Salary findByEmployee(Employee employee);
}