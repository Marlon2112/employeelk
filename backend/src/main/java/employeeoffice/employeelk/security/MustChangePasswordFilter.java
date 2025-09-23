package employeeoffice.employeelk.security;

import employeeoffice.employeelk.repository.LoginRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class MustChangePasswordFilter extends OncePerRequestFilter {
    private final LoginRepository loginRepository;

    public MustChangePasswordFilter(LoginRepository loginRepository) {
        this.loginRepository = loginRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
            throws ServletException, IOException {

        String path = req.getRequestURI();

        // Разрешаем логин/смену пароля (поддержим оба варианта путей)
        List<String> whitelist = List.of(
                "/api/login", "/api/login/change-password",
                "/auth/login", "/auth/change-password"
        );
        for (String open : whitelist) {
            if (path.startsWith(open)) {
                chain.doFilter(req, res);
                return;
            }
        }

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated() && !"anonymousUser".equals(auth.getPrincipal())) {
            var loginOpt = loginRepository.findByLogin(auth.getName());
            if (loginOpt.isPresent()) {
                var login = loginOpt.get();


                boolean mustChange =
                        login.getMustChangePassword();

                if (mustChange) {
                    res.sendError(HttpServletResponse.SC_FORBIDDEN, "Password change required");
                    return;
                }
            }
        }

        chain.doFilter(req, res);
    }
}
