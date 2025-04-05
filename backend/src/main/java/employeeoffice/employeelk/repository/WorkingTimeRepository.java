package employeeoffice.employeelk.repository;

import employeeoffice.employeelk.model.WorkingTime;
import employeeoffice.employeelk.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface WorkingTimeRepository extends JpaRepository<WorkingTime, Long> {
    List<WorkingTime> findByEmployee(Employee employee);
}