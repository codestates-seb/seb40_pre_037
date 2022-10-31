package ver37.Server.dto;


import lombok.Getter;
import lombok.Setter;
import ver37.Server.validator.NotSpace;

import javax.persistence.criteria.CriteriaBuilder;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.List;

public class PostDto {

    //게시글 작성
    @Getter
    public static class Post {
        @NotBlank
        @Size(min = 5 ,message = "5자 이상 입력해주세요")
        private String title;
        @NotSpace
        private String body;

        private List<String> tags;
    }

    //게시글 수정
    @Getter
    @Setter
    public static class Patch {
        private Long postId;
        @Size(min = 15 ,message = "15자 이상 입력해주세요")
        private String title;
        @NotSpace
        private String body;

        private List<String> tags;

        //게시글 수정
        public Patch(String title, String body, List<String> tags) {
            this.title = title;
            this.body = body;
            this.tags = tags;
        }

    }

    @Getter
    public static class Response {

        private Long postId;
        private String title;
        private String body;
        private List<String> tags;
        private Integer viewCount;
        private Integer likeCount;

        private Integer answerCount;
        private LocalDateTime createdAt;   //작성일
        private LocalDateTime lastModifiedDate; //수정일
        private String memberName;

        public Response(ver37.Server.entity.Post post) {
            this.postId = post.getPostId();
            this.title = post.getTitle();
            this.body = post.getPostBody();
            this.likeCount = post.getLikeCount();
            this.viewCount = post.getViewCount();
            this.answerCount = post.getAnswers().size();
            this.memberName = post.getMember().getName();
            this.tags = post.getTags();
            this.createdAt = post.getCreatedAt();
            lastModifiedDate = post.getLastModifiedAt();
        }
    }
}

