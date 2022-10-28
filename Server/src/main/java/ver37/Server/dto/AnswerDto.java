package ver37.Server.dto;

import lombok.Getter;

import lombok.Setter;
import org.springframework.stereotype.Service;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

public class AnswerDto {

    //게시글 작성
    @Getter
    public static class Post {
        @Positive
        private long answerId;
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
        private long answerId;
        private String answerBody;
    }


}

