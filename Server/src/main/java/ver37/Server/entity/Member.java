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
public class Member extends Auditing {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    private String email;

    private String name;

    private String password;
    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    private MemberStatus memberStatus= MemberStatus.MEMBER_ACTIVE;

    @OneToMany(mappedBy = "member")
    private List<Post> posts = new ArrayList<>();

    //유저 권한 바꾸기 메서드
    public void changeRoles(List<String> roles) {
        this.roles = roles;
    }
    //패스워드 변경 메서드
    public void updatingPassword(String password) {
        this.password = password;
    }
    //사용자 이름 변경 메서드
    public void updatingName(String name) {
        this.name = name;
    }

    //Member 생성자
    @Builder
    public Member(Long memberId, String email, String name, String password, List<String> roles) {
        this.memberId = memberId;
        this.email = email;
        this.name = name;
        this.password = password;
        this.roles = roles;
    }

    public enum MemberStatus {
        MEMBER_ACTIVE,
        MEMBER_SLEEP
    }

    public void deleteMember(MemberStatus memberStatus) {
        this.memberStatus = MemberStatus.MEMBER_SLEEP;
    }
}