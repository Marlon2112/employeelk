package employeeoffice.employeelk.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "employees")
@Getter
@Setter
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ФИО сотрудника
    @Column(nullable = false)
    private String fullName;

    // Дополнительные поля, например, email, должность и т.д.
    private String email;

    // Текущая зарплата
    private Double salary;
}