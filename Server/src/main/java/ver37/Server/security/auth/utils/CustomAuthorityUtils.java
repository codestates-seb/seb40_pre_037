package ver37.Server.security.auth.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CustomAuthorityUtils {
    @Value("${mail.address.admin}")
    private String adminMailAddress;

    private final List<String> ADMIN_ROLES = List.of("ADMIN", "USER");
    private final List<String> USER_ROLES = List.of("USER");


    // DB에 저장된 Role을 기반으로 권한 정보 생성
    public List<GrantedAuthority> createAuthorities(List<String> roles) {
       List<GrantedAuthority> authorities = roles.stream()
               .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
               .collect(Collectors.toList());
       return authorities;
    }

    // DB 저장 용
    public List<String> createRoles(String email) {
        if (email.equals(adminMailAddress)) {
            return ADMIN_ROLES;
        }
        return USER_ROLES;
    }
}
