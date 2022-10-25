package ver37.Server.Service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ver37.Server.entity.Member;
import ver37.Server.repository.MemberRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberService {

    private final MemberRepository memberRepository;

    @Transactional
    public Member createMember(Member member) {
        verifyEmail(member);

        //추후 시큐리티 들어가면 패스워드와 회원 권한 바꾸는 로직 채워둘것

        return memberRepository.save(member);
    }

    @Transactional
    public Member updateMember(Member member) {
        Member verifyMember  = findVerifyMember(member.getMemberId());

        Optional.ofNullable(member.getName()).ifPresent(verifyMember::updatingName);

        Optional.ofNullable(member.getPassword()).ifPresent(verifyMember::updatingPassword);

        return verifyMember;
    }

    @Transactional
    public void deleteMember(Long memberId) {
        Member verifyMember = findVerifyMember(memberId);
        verifyMember.deleteMember(Member.MemberStatus.MEMBER_SLEEP);
    }

    //존재하는 멤버 찾는 메서드
    public Member findVerifyMember(Long memberId) {
        //리펙터링 포인트 예외 처리로직으로 대체할것
        return memberRepository.findById(memberId).orElseThrow(() -> new RuntimeException("존재하지 않는 회원입니다."));
    }


    public void verifyEmail(Member member) {
        if (memberRepository.findByEmail(member.getEmail()).isPresent()) {
            //리펙터링 포인트 예외 처리로직으로 대체할것
            throw new RuntimeException("이미 존재하는 회원입니다.");
        }
    }
}
