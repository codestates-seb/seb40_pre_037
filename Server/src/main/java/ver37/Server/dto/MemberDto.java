package ver37.Server.dto;

import lombok.Builder;
import lombok.Getter;
import ver37.Server.entity.Member;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.util.List;

public class MemberDto {

    @Getter
    public static class Post {
        @Email
        private String email;
        @NotBlank
        private String name;
        @NotBlank
        private String password;
    }

    @Getter
    public static class Patch {
        private Long memberId;
        private String name;
        private String password;

        public void addMemberId(Long memberId) {
            this.memberId = memberId;
        }
    }



    @Getter
    public static class Response {
        private Long memberId;
        private String email;
        private String name;
        private String password;
        private Member.MemberStatus memberStatus;
        private List<String> roles;

        public Response(Member member) {
            memberId = member.getMemberId();
            email = member.getEmail();
            name = member.getName();
            password = member.getPassword();
            memberStatus = member.getMemberStatus();
            roles = member.getRoles();
        }
    }
}