package ver37.Server.dto;

import lombok.Getter;

import lombok.Setter;
import org.springframework.stereotype.Service;
import ver37.Server.entity.Answer;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import java.util.List;

public class AnswerDto {

    //게시글 작성
    @Getter
    public static class Post {
        private Long postId;
        @NotBlank(message = "답변 내용을 적어주세요.")
        private String answerBody;

    }

    @Getter
    public static class Patch {
        private long answerId;
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

        public Response(Answer answer) {
            this.answerId = answer.getAnswerId();
            this.answerBody = answer.getAnswerBody();
            this.likeCount = answer.getLikeCount();
            this.memberName = answer.getMember().getName();
        }
    }


}

