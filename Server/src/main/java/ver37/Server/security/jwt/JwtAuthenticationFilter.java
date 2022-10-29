package ver37.Server.security.jwt;


import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import ver37.Server.dto.LoginDto;
import ver37.Server.entity.Jwt;
import ver37.Server.repository.JwtRepository;
import ver37.Server.security.auth.CustomDetails;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

//스프링 시큐리티에서 UsernamePasswordAuthenticationFilter 가 있다.
//login 요청해서 username, password 전송하면(post)
//UsernamePasswordAuthenticationFilter 동작을 한다. 하지만 우리는 form 로그인 방식을 사용안하기로 했으니까
//이 filter 를 시큐리티필터에 적용시켜주어야 한다.


@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;

    private final JwtRepository jwtRepository;



    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            LoginDto loginDto = objectMapper.readValue(request.getInputStream(), LoginDto.class);

            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword());

            //이게 실행되면 CustomDetailsService 의 loadUserByUsername()함수가 실행된다.
            Authentication authentication =
                    authenticationManager.authenticate(authenticationToken);
            //메네저가 로그인 인증을 대신해준다.

            //그리고 authentication 을 리턴하면 이 객체는 세션영역에 저장된다.
            //세션에 저장시키는 이유는 권한 관리를 Security 가 대신 해주기 때문이다.
            return authentication;

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    //AttemptAuthentication 실행 후 인증이 정상적으로 되었으면 successfulAuthentication 함수가 실행된다.
    //JWT 토큰을 만들어서 request 요청한 사용자에게 JWT 토큰을 response 해주면 된다.
    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) throws IOException, ServletException {
        CustomDetails principal = (CustomDetails) authResult.getPrincipal();



        //jwt 토큰 만드는 라이브러리
        String accessToken = JWT.create()
                .withSubject("JWT")
                .withExpiresAt(new Date(System.currentTimeMillis() + (60000 * 100)))
                .withClaim("id", principal.getMember().getMemberId())
                .withClaim("username", principal.getUsername())
                .sign(Algorithm.HMAC256("zion"));

//        System.out.println(jwtToken+"전송완료");

        jwtRepository.findMemberId(principal.getMember().getMemberId()).ifPresent(jwtRepository::delete);

        String refreshToken = JWT.create()
                .withExpiresAt(new Date(System.currentTimeMillis() + (600000) * 4))
                .withClaim("id", principal.getMember().getMemberId())
                .withClaim("username", principal.getUsername())
                .sign(Algorithm.HMAC256("zion"));


        Jwt jwt = new Jwt(accessToken,refreshToken, principal.getMember());

        jwtRepository.save(jwt);

        //Access 토큰을 전닳한다.
        response.addHeader("Authorization", "Bearer " + accessToken);
        response.addHeader("Refresh", refreshToken);
    }


}
