package ver37.Server.security.jwt;




import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import ver37.Server.entity.Member;
import ver37.Server.exception.CustomException;
import ver37.Server.exception.ExceptionCode;
import ver37.Server.repository.MemberRepository;
import ver37.Server.security.auth.CustomDetails;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


import static org.springframework.security.config.Elements.JWT;

//시큐리티가 filter가지고 있는데 그 필터중에 BasicAuthenticationFilter라는 것이있다.
//권한이나 인증이 필요한 특정 주소를 요청했을 때 위 필터를 무조건 타게 되어 있다.
//만약에 권한이 인증이 필요한 주소가 아니라면 이필터를 타지 않는다.
//필터를 만든 목적 Jwt를 검증하기 위해 (사용가능 유/무)
public class JwtAuthorizationFilter extends BasicAuthenticationFilter {
    private final MemberRepository memberRepository;

    public JwtAuthorizationFilter(AuthenticationManager authenticationManager, MemberRepository memberRepository) {
        super(authenticationManager);
        this.memberRepository = memberRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        //super.doFilterInternal(request, response, chain); 이부분을 지워야 오류가 안생김
        String jwtHeader = request.getHeader("Authorization");
//        System.out.println("jwtHeader = " + jwtHeader);

        //JWT 토큰을 검증을 해서 정상적인 사용자인지 확인하는 로직

        //header 존재유무 확인
        if (jwtHeader == null || !jwtHeader.startsWith("Bearer")) {
            chain.doFilter(request, response);
            return;
        }

        String jwtToken = request.getHeader("Authorization").replace("Bearer ", "");
//        System.out.println("jwtToken@@@@@@@@@@@@@@@@@@@@@@@@@ = " + jwtToken);


        String username = com.auth0.jwt.JWT.require(Algorithm.HMAC256("zion")).build().verify(jwtToken).getClaim("username").asString();


        //username 이 존재한다면 서명이 정상적으로 되었다는 의미
        if (username != null) {
            Member member = memberRepository.findByEmail(username).orElseThrow(() -> new CustomException(ExceptionCode.USER_NOT_FOUNT));

            CustomDetails customDetails = new CustomDetails(member);

            //Jwt 토큰 서명을 통해서 서명이 정상미연 Authentication 객체를 만들어주기 (이미 위에서 검증완료) 때문에 패스워드 부분이 null 이라도 상관없다.
            Authentication authentication =
                    new UsernamePasswordAuthenticationToken(customDetails,null,customDetails.getAuthorities());

            //강제로 시큐리티의 세션에 접근하여 Authentication 객체를 저장한다.
            SecurityContextHolder.getContext().setAuthentication(authentication);

            chain.doFilter(request, response);
        }
    }
}
