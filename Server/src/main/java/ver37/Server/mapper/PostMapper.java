package ver37.Server.mapper;


import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import ver37.Server.dto.PostDto;
import ver37.Server.entity.Post;




@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface PostMapper  {


    default Post postDtoToPost(PostDto.Post postDto) {
        Post post = Post.builder()
                .title(postDto.getTitle())
                .postBody(postDto.getBody())
                .build();
        postDto.getTags().stream().forEach(tag -> {
            post.getTags().add(tag);
        });

//        postDto.getTags().stream().map(tag-> new Tag(tag)).forEach(tag -> {
//            PostTag postTag = new PostTag();
//            postTag.addTag(tag,post);
//        });
        return post;
    }

    default PostDto.Response PostToPostResponse(Post post) {
        PostDto.Response response = new PostDto.Response(post);
        return response;
    }
}
