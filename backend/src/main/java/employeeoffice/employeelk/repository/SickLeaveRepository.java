package employeeoffice.employeelk.repository;

import employeeoffice.employeelk.model.SickLeave;
import employeeoffice.employeelk.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SickLeaveRepository extends JpaRepository<SickLeave, Long> {
    List<SickLeave> findByEmployee(Employee employee);
}