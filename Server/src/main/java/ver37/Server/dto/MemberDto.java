package ver37.Server.dto;

import lombok.Builder;
import lombok.Getter;
import org.springframework.web.bind.annotation.PathVariable;
import ver37.Server.entity.Member;
import ver37.Server.validator.NotSpace;

import javax.validation.constraints.*;
import java.time.LocalDateTime;
import java.util.List;

public class MemberDto {

    @Getter
    public static class Post {
        @Email
        private String email;
        @NotBlank
        @Size( min = 2,max = 10)
        private String name;
        @NotBlank
        @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$",
                message = "최소 8 자, 하나 이상의 문자와 하나의 숫자를 입력해주셔야 합니다.")
        private String password;
    }

    @Getter
    public static class Patch {
        private Long memberId;
        @NotSpace
        @Size(min = 2, max = 50)
        private String name;
        @NotSpace
        @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$",
                message = "최소 8 자, 하나 이상의 문자와 하나의 숫자를 입력해주셔야 합니다.")
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
        private LocalDateTime createdAt;   //작성일
        private LocalDateTime lastModifiedDate; //수정일
        private List<String> roles;

        public Response(Member member) {
            memberId = member.getMemberId();
            email = member.getEmail();
            name = member.getName();
            password = member.getPassword();
            memberStatus = member.getMemberStatus();
            createdAt = member.getCreatedAt();
            lastModifiedDate = member.getLastModifiedAt();
            roles = member.getRoles();
        }
    }
}