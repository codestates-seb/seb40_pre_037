package ver37.Server.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ver37.Server.dto.MemberDto;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Jwt {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long jwtId;

    private String refreshToken;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    public Jwt(String refreshToken, Member member) {
        this.refreshToken = refreshToken;
        this.member = member;
    }
}
