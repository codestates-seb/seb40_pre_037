package ver37.Server.dto;


import lombok.Getter;

import javax.validation.constraints.NotBlank;
import java.util.List;

public class PostDto {

    //게시글 작성
    @Getter
    public static class Post {

        @NotBlank(message = "질문 제목을 적어주세요.")
        private String title;

        @NotBlank(message = "질문 내용을 적어주세요.")
        private String body;

        private List<String> tags;


    }

    //게시글 수정
    @Getter
    public static class Patch {

        private Long postId;

        //제목 수정
        private String title;
        //내용 수정
        private String body;

        //여러 태그 추가
        private List<String> tags;

//        //게시글 수정
//        public patch(String title, String body, List<TagDto> questionTags) {
//            this.title = title;
//            this.body = body;
//            this.questionTags = questionTags;
//        }

        //게시글 삭제
    }

    @Getter
    public static class Response {

        private Long postId;
        private String title;
        private String body;
        private List<String> tags;
        //        private Integer viewCount;
        private Integer likeCount;
        //        private LocalDateTime Ask;   //작성일
//        private LocalDateTime Modified; //수정일
        private String memberName;

        public Response(ver37.Server.entity.Post post) {
            this.postId = post.getPostId();
            this.title = post.getTitle();
            this.body = post.getPostBody();
            this.likeCount = post.getLikeCount();
            this.memberName = post.getMember().getName();
//            this.tags = post.getPostTags().stream().map(postTag -> postTag.getTag().getTagName()).collect(Collectors.toList());
            this.tags = post.getTags();
        }
    }
}

