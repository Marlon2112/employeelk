package employeeoffice.employeelk.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "salaries")
@Getter
@Setter
public class Salary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Связь с сотрудником
    @OneToOne
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    // Текущая зарплата
    private Double salary;
}
