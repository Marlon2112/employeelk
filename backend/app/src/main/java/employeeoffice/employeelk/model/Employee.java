package employeeoffice.employeelk.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ФИО сотрудника
    @Column(name = "full_name", nullable = false)
    private String fullName;

    // Дополнительные поля, например, email, должность и т.д.
    @Column(name = "email")
    private String email;

    // Текущая зарплата
    private Double salary;
    
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "login_id", referencedColumnName = "id")
    private Login login;
    
    @Override
    public String toString(){
        return String.format("Сотрудник с именен: %s, имеет логин: %s", this.fullName, this.login.getLogin());
    }
}