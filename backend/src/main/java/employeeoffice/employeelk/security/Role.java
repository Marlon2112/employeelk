package employeeoffice.employeelk.security;

public enum Role {
    ADMIN, HR, EMPLOYEE;
    public String asAuthority() { return "ROLE_" + name(); }
}
