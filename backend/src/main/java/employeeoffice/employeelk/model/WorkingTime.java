package employeeoffice.employeelk.model;

import jakarta.persistence.*;

@Entity
@Table(name = "working_times")
public class WorkingTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Связь с сотрудником
    @ManyToOne
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    // Дополнительные смены или часы (например, extraHours)
    private Integer extraHours;

    // Геттеры и сеттеры
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public Employee getEmployee() {
        return employee;
    }
    public void setEmployee(Employee employee) {
        this.employee = employee;
    }
    public Integer getExtraHours() {
        return extraHours;
    }
    public void setExtraHours(Integer extraHours) {
        this.extraHours = extraHours;
    }
}
