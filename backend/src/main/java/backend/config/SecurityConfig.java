package backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class SecurityConfig {

    @Value("${spring.security.oauth2.resourceserver.jwt.jwk-set-uri}")
    private String jwkSetUri;

    /**
     * Este bean es el que le faltaba a Spring. Permite verificar la firma RSA
     * del JWT emitido por Supabase.
     */
    @Bean
    public JwtDecoder jwtDecoder() {
        NimbusJwtDecoder decoder = NimbusJwtDecoder
                .withJwkSetUri(jwkSetUri)
                .jwsAlgorithm(org.springframework.security.oauth2.jose.jws.SignatureAlgorithm.ES256)
                .build();

        return decoder;
    }

    /**
     * Configuración principal de seguridad: - No hay login en Spring - No hay
     * sesiones - Solo acepta Bearer Token de Supabase
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                // API REST → sin CSRF
                .csrf(csrf -> csrf.disable())
                // Necesario para frontend en localhost (React/Vite/Next)
                .cors(Customizer.withDefaults())
                // Autorización de endpoints
                .authorizeHttpRequests(auth -> auth
                .requestMatchers(
                        "/",
                        "/api/auth/**",
                        "/error"
                ).permitAll()
                .anyRequest().authenticated()
                )
                // AQUÍ es donde Spring valida el JWT de Supabase
                .oauth2ResourceServer(oauth2 -> oauth2
                .jwt(Customizer.withDefaults())
                );

        return http.build();
    }

    /**
     * Permite llamadas desde tu frontend
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration config = new CorsConfiguration();

        config.addAllowedOrigin("http://localhost:3000"); // Next

        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return source;
    }
}
