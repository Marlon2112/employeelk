package employeeoffice.employeelk.repository;

import employeeoffice.employeelk.model.Login;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface LoginRepository extends JpaRepository<Login, Long> {
    Optional<Login> findByLogin(String login); // Поиск пользователя по логину
}
