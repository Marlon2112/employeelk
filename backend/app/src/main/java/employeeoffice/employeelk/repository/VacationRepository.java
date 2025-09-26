package employeeoffice.employeelk.repository;

import employeeoffice.employeelk.model.Vacation;
import employeeoffice.employeelk.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface VacationRepository extends JpaRepository<Vacation, Long> {
    List<Vacation> findByEmployee(Employee employee);
}