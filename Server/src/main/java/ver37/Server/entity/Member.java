package ver37.Server.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    private String email;

    private String name;

    private String password;
    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    private String memberStatus;

    //유저 권한 바꾸기 메서드
    public void changeRoles(List<String> roles) {
        this.roles = roles;
    }
    //패스워드 인코딩용 메서드
    public void encodingPassword(String password) {
        this.password = password;
    }

    //Member 생성자
    @Builder
    public Member(Long memberId, String email, String name, String password, List<String> roles, String memberStatus) {
        this.memberId = memberId;
        this.email = email;
        this.name = name;
        this.password = password;
        this.memberStatus = memberStatus;
        this.roles = roles;
    }

    public enum MemberStatus {
        MEMBER_ACTIVE,
        MEMBER_SLEEP
    }

}
