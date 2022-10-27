package ver37.Server.security.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ver37.Server.entity.Member;
import ver37.Server.repository.MemberRepository;

//이로직은 http://localhost:8080/login 일때 동작을 해야하지만, 우리가 formLogin을 비활성화 했기 때문에
// 스프링 시큐리티의 기본적인 로그링 url에서는 동작하지 않는다. 그래서 우리는 필터를 만들어서 로그인 URL을 설정해 줄것이다.
@Service
@RequiredArgsConstructor
public class CustomDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Member member = memberRepository
                .findByEmail(username)
                .orElseThrow(() -> new RuntimeException("로그인 시도중 -> 해당 유저가 존재하지 않습니다."));

        return new CustomDetails(member);
    }
}
