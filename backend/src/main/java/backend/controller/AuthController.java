package backend.controller;

import java.util.Map;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    private final JdbcTemplate jdbcTemplate;

    public AuthController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @GetMapping("/api/auth/me")
    public Map<String, Object> me(@AuthenticationPrincipal Jwt jwt) {
        String id = jwt.getSubject();                   // UUID del usuario
        String email = jwt.getClaimAsString("email");   // Email de Google
        String role = jwt.getClaimAsString("role");    // "authenticated"

        // Upsert en tabla users
        String sql = """
    INSERT INTO users (id, username, created_at, updated_at)
    VALUES (CAST(? AS uuid), ?, NOW(), NOW())
    ON CONFLICT (id) DO UPDATE
    SET username = EXCLUDED.username,
        updated_at = NOW();
""";

        jdbcTemplate.update(sql, id, email);

        // Retornar info al frontend
        return Map.of(
                "id", id,
                "email", email,
                "role", role,
                "issued_at", jwt.getIssuedAt(),
                "expires_at", jwt.getExpiresAt()
        );
    }
}
