package ver37.Server.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class PostDto {

    //게시글 작성
    @Getter
    public static class Post {

        @Positive
        private Long questionId;

        @NotBlank(message = "질문 제목을 적어주세요.")
        private String title;

        @NotBlank(message = "질문 내용을 적어주세요.")
        private String body;

        @NotBlank(message = "태그를 적어주세요.")
        private List<TagDto> Tags = new ArrayList<>();

    }
    //게시글 수정
    @Getter
    public static class patch {

        private Long questionId;

        //제목 수정
        private String title;
        //내용 수정
        private String body;

        //여러 태그 추가
        private List<TagDto> questionTags = new ArrayList<>();

        //게시글 수정
        public patch(String title, String body, List<TagDto> questionTags) {
            this.title = title;
            this.body = body;
            this.questionTags = questionTags;
        }

        //게시글 삭제
    }

    @Getter
    public class PostToAnswer {

        private Long questionId;
        private String body;
        private Integer view;
        private LocalDateTime createdAt;
        private LocalDateTime updateAt;

    }


    @Getter
    public static class vote {

        //좋아요 수정
        private Integer vote;

        public vote(Integer vote) {
            this.vote = vote;
        }
    }




}
