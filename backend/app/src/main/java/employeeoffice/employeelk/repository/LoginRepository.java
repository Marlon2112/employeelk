package employeeoffice.employeelk.repository;

import employeeoffice.employeelk.model.Employee;
import employeeoffice.employeelk.model.Login;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface LoginRepository extends JpaRepository<Login, Long> {
    Optional<Login> findByLogin(String login); // Поиск пользователя по логину
    Optional<Login> findByEmployee(Employee employee); 
    Optional<Login> findByEmployeeEmail(String email); 
    Optional<Login> findByEmployeeId(Long employeeId); 
}
