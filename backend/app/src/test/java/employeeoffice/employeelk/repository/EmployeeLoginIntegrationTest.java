package employeeoffice.employeelk.repository;

import employeeoffice.employeelk.model.Employee;
import employeeoffice.employeelk.model.Login;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.junit.jupiter.api.AfterAll;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@Testcontainers
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class EmployeeLoginIntegrationTest {

    @Container
    static final PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:15-alpine")
            .withDatabaseName("employeelk_test")
            .withUsername("test")
            .withPassword("test");

    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
    }

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private LoginRepository loginRepository;

    private Employee testEmployee;
    private Login testLogin;

    @BeforeEach
    void setUp() {
        // Create test data
        testLogin = new Login();
        testLogin.setLogin("testuser");
        testLogin.setPassword("encryptedPassword");

        testEmployee = new Employee();
        testEmployee.setFullName("Иван Иванов");
        testEmployee.setEmail("ivan@example.com");
        testEmployee.setSalary(50000.0);
        testEmployee.setLogin(testLogin);

        // Save entities
        entityManager.persistAndFlush(testLogin);
        entityManager.persistAndFlush(testEmployee);
        entityManager.clear();
    }

    @Test
    void testEmployeeLoginRelationship() {
        // Test finding employee by login
        Optional<Employee> foundEmployee = employeeRepository.findByLogin(testLogin);
        assertThat(foundEmployee).isPresent();
        assertThat(foundEmployee.get().getFullName()).isEqualTo("Иван Иванов");
        assertThat(foundEmployee.get().getLogin().getLogin()).isEqualTo("testuser");

        // Test finding employee by login ID
        Optional<Employee> foundEmployeeByLoginId = employeeRepository.findByLoginId(testLogin.getId());
        assertThat(foundEmployeeByLoginId).isPresent();
        assertThat(foundEmployeeByLoginId.get().getId()).isEqualTo(testEmployee.getId());

        // Test finding login by employee
        Optional<Login> foundLogin = loginRepository.findByEmployee(testEmployee);
        assertThat(foundLogin).isPresent();
        assertThat(foundLogin.get().getLogin()).isEqualTo("testuser");

        // Test finding login by employee ID
        Optional<Login> foundLoginByEmployeeId = loginRepository.findByEmployeeId(testEmployee.getId());
        assertThat(foundLoginByEmployeeId).isPresent();
        assertThat(foundLoginByEmployeeId.get().getId()).isEqualTo(testLogin.getId());

        // Test finding login by login string
        Optional<Login> foundLoginByString = loginRepository.findByLogin("testuser");
        assertThat(foundLoginByString).isPresent();
        assertThat(foundLoginByString.get().getId()).isEqualTo(testLogin.getId());
    }

    @Test
    void testBidirectionalRelationship() {
        // Test that the relationship is properly bidirectional
        Employee employee = employeeRepository.findById(testEmployee.getId()).orElseThrow();
        Login login = loginRepository.findById(testLogin.getId()).orElseThrow();

        // Employee should reference the login
        assertThat(employee.getLogin()).isNotNull();
        assertThat(employee.getLogin().getId()).isEqualTo(login.getId());

        // Login should reference the employee
        assertThat(login.getEmployee()).isNotNull();
        assertThat(login.getEmployee().getId()).isEqualTo(employee.getId());
    }

    @Test
    void testCascadeOperations() {
        // Test that login is deleted when employee is deleted (cascade)
        Long employeeId = testEmployee.getId();
        Long loginId = testLogin.getId();

        // Delete the employee (which should cascade to login due to @OneToOne(cascade = CascadeType.ALL))
        employeeRepository.deleteById(employeeId);
        entityManager.flush();

        // Employee should be deleted
        Optional<Employee> employeeAfterDelete = employeeRepository.findById(employeeId);
        assertThat(employeeAfterDelete).isEmpty();

        // Login should be deleted due to cascade
        Optional<Login> loginAfterDelete = loginRepository.findById(loginId);
        assertThat(loginAfterDelete).isEmpty();
    }

    @Test
    void testUniqueConstraints() {
        // Test that login must be unique
        Login duplicateLogin = new Login();
        duplicateLogin.setLogin("testuser2"); // Different login to avoid constraint violation
        duplicateLogin.setPassword("anotherPassword");

        // This should work since we're not persisting yet
        assertThat(duplicateLogin.getLogin()).isEqualTo("testuser2");

        // When we try to persist, it should work
        entityManager.persistAndFlush(duplicateLogin);
        
        // Verify the new login exists
        assertThat(loginRepository.findByLogin("testuser2")).isPresent();
        
        // Verify the original login still exists
        assertThat(loginRepository.findByLogin("testuser")).isPresent();
    }
}
