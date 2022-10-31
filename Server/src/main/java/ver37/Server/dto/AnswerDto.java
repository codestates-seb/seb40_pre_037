package ver37.Server.dto;

import lombok.Getter;

import lombok.Setter;
import org.springframework.stereotype.Service;
import ver37.Server.entity.Answer;
import ver37.Server.validator.NotSpace;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.List;

public class AnswerDto {

    //게시글 작성
    @Getter
    public static class Post {
        private Long postId;

        @NotBlank(message = "답변 내용을 적어주세요.")
        @Size(min = 15 ,message = "15자 이상 입력해주세요")
        private String answerBody;


    }

    @Getter
    @Setter
    public static class Patch {
        private long answerId;
        @NotBlank(message = "답변 내용을 적어주세요.")
        @Size(min = 15 ,message = "15자 이상 입력해주세요")
        private String answerBody;
    }

    @Getter
    public static class Response {

        private Long answerId;
        private String answerBody;
        //        private Integer viewCount;
        private Integer likeCount;
        //        private LocalDateTime Ask;   //작성일
//        private LocalDateTime Modified; //수정일
        private String memberName;
        private LocalDateTime createdAt;   //작성일
        private LocalDateTime lastModifiedDate; //수정일

        public Response(Answer answer) {
            this.answerId = answer.getAnswerId();
            this.answerBody = answer.getAnswerBody();
            this.likeCount = answer.getLikeCount();
            this.memberName = answer.getMember().getName();
            this.createdAt = answer.getCreatedAt();
            this.lastModifiedDate = answer.getLastModifiedAt();
        }
    }


}

