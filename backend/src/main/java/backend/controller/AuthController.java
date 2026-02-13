package backend.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public AuthController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @GetMapping("/api/auth/me")
public Map<String, Object> me(@AuthenticationPrincipal Jwt jwt) {
    String id = jwt.getSubject();
    String email = jwt.getClaimAsString("email");
    
    System.out.println("=== CREANDO USUARIO EN DB ===");
    System.out.println("ID: " + id);
    System.out.println("Email: " + email);

    // Versión simplificada - SOLO INSERT
    String sql = """
        INSERT INTO public.users (id, username, created_at, updated_at)
        VALUES (CAST(? AS uuid), ?, NOW(), NOW())
        ON CONFLICT (id) DO UPDATE
        SET username = EXCLUDED.username,
            updated_at = NOW();
    """;

    try {
        int rowsAffected = jdbcTemplate.update(sql, id, email);
        System.out.println("Filas afectadas: " + rowsAffected);
    } catch (ExceptionInInitializerError e) {
        System.err.println("ERROR al insertar usuario en bd : " + e.getMessage());
    }

    return Map.of(
            "id", id,
            "email", email,
            "created", true,
            "issued_at", jwt.getIssuedAt(),
            "expires_at", jwt.getExpiresAt()
    );
}

}