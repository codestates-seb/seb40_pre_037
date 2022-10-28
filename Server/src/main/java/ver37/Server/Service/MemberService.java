package ver37.Server.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ver37.Server.entity.Jwt;
import ver37.Server.entity.Member;
import ver37.Server.exception.CustomException;
import ver37.Server.exception.ExceptionCode;
import ver37.Server.repository.JwtRepository;
import ver37.Server.repository.MemberRepository;
import ver37.Server.security.auth.utils.CustomAuthorityUtils;

import javax.persistence.EntityManager;
import java.util.Date;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class MemberService {

    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final CustomAuthorityUtils authorityUtils;

    private final JwtRepository jwtRepository;
    private final EntityManager em;

    @Transactional
    public Member createMember(Member member) {
        verifyEmail(member);

        //추후 시큐리티 들어가면 패스워드와 회원 권한 바꾸는 로직 채워둘것
        member.updatingPassword(bCryptPasswordEncoder.encode(member.getPassword()));
        member.changeRoles(authorityUtils.createRoles(member.getEmail()));

        return memberRepository.save(member);
    }

    @Transactional
    public Member updateMember(Member member) {
        Member verifyMember = findVerifyMember(member.getMemberId());

        Optional.ofNullable(member.getName()).ifPresent(verifyMember::updatingName);

        Optional.ofNullable(member.getPassword()).ifPresent(verifyMember::updatingPassword);

        return verifyMember;
    }

    @Transactional
    public void deleteMember(Long memberId) {
        Member verifyMember = findVerifyMember(memberId);
        verifyMember.deleteMember(Member.MemberStatus.MEMBER_SLEEP);
    }

    public String getAccessToken(String refreshToken) {

        Jwt token = jwtRepository.findRefreshToken(refreshToken).orElseThrow(() -> new CustomException(ExceptionCode.REFRESH_TOKEN_NOT_FOUND));

        String accessToken = JWT.create()
                .withExpiresAt(new Date(System.currentTimeMillis() + (60000)))
                .withClaim("id", token.getMember().getMemberId())
                .withClaim("username", token.getMember().getEmail())
                .sign(Algorithm.HMAC256("zion"));

        token.changeAccessToken(accessToken);
        em.flush();
        em.clear();
        return accessToken;
    }
    @Transactional
    public void deleteToken(String refreshToken) {
        jwtRepository.deleteJwtToken(refreshToken);
    }



    //존재하는 멤버 찾는 메서드
    public Member findVerifyMember(Long memberId) {
        //리펙터링 포인트 예외 처리로직으로 대체할것
        return memberRepository.findById(memberId).orElseThrow(() -> new CustomException(ExceptionCode.MEMBER_NOT_FOUND));
    }


    public void verifyEmail(Member member) {
        if (memberRepository.findByEmail(member.getEmail()).isPresent()) {
            //리펙터링 포인트 예외 처리로직으로 대체할것
            throw new CustomException(ExceptionCode.DUPLICATE_MEMBER);
        }
    }

    public Member getMemberFromToken(String token) {
        String pureToken = token.replace("Bearer ", "");

        Jwt jwt = jwtRepository.findAccessToken(pureToken).orElseThrow(() -> new CustomException(ExceptionCode.MISMATCH_ACCESS_TOKEN));
        Member verifyMember = findVerifyMember(jwt.getMember().getMemberId());

        return verifyMember;
    }
}
