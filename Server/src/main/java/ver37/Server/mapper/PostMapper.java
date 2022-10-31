package ver37.Server.mapper;


import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.springframework.web.servlet.View;
import ver37.Server.dto.PostDto;
import ver37.Server.entity.Post;


import java.util.List;
import java.util.stream.Collectors;


@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface PostMapper {


    default Post postDtoToPost(PostDto.Post postDto) {
        Post post = Post.builder()
                .title(postDto.getTitle())
                .postBody(postDto.getBody())
                .tags(postDto.getTags())
                .build();

//        Views views = new Views(post);
//        post.addView(views);

        return post;
    }

    default Post patchToPostResponse(PostDto.Patch patch) {
        Post post = Post.builder()
                .postId(patch.getPostId())
                .title(patch.getTitle())
                .postBody(patch.getBody())
                .tags(patch.getTags())
                .build();
        return post;
    }

    default PostDto.Response postToPostResponse(Post post) {
        PostDto.Response response = new PostDto.Response(post);
        return response;
    }

    default List<PostDto.Response> postsToPostResponses(List<Post> posts) {
        List<PostDto.Response> responses = posts.stream().map(post -> postToPostResponse(post)).collect(Collectors.toList());
        return responses;
    }
}
