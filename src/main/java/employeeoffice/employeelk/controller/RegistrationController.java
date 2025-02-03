package employeeoffice.employeelk.controller;

import employeeoffice.employeelk.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/register")
public class RegistrationController {

    @Autowired
    private LoginService loginService;

    @GetMapping
    public String showRegistrationForm() {
        return "register";
    }

    @PostMapping
    public String registerUser(@RequestParam String login,
                               @RequestParam String password,
                               Model model) {
        if (loginService.registerUser(login, password)) {
            model.addAttribute("message", "Регистрация успешна!");
        } else {
            model.addAttribute("error", "Этот логин уже занят.");
        }
        return "register";
    }
}