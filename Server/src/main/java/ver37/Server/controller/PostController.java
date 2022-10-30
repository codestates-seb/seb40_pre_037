package ver37.Server.controller;



import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import ver37.Server.Service.PostService;
import ver37.Server.dto.MultiResponseDto;
import ver37.Server.dto.PostDto;
import ver37.Server.entity.Post;
import ver37.Server.mapper.PostMapper;

import javax.servlet.SessionCookieConfig;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/post")
@RequiredArgsConstructor
@Validated
public class PostController {
    private final PostService postService;
    private final PostMapper postMapper;



    @PostMapping
    public ResponseEntity postPost(@Valid @RequestBody PostDto.Post post) {
        Post postAble =
                postService.creatPost(postMapper.postDtoToPost(post));

        return new ResponseEntity<>(postMapper.postToPostResponse(postAble), HttpStatus.CREATED);
    }

    @PatchMapping("/{post-id}")
    public ResponseEntity patchPost(@PathVariable("post-id") Long postId,
                                    @Valid @RequestBody PostDto.Patch patch) {
        patch.setPostId(postId);
        Post post = postService.patchPost(postMapper.patchToPostResponse(patch));
        return new ResponseEntity<>(postMapper.postToPostResponse(post), HttpStatus.OK);
    }

    @GetMapping("/{post-id}")
    public ResponseEntity getPost(@PathVariable("post-id") Long postId) {

        Post verifyPost = postService.findPostAndPlusViewCount(postId);


        return new ResponseEntity<>(postMapper.postToPostResponse(verifyPost), HttpStatus.OK);
    }

    @GetMapping("/present")
    public ResponseEntity getPresentPost(@RequestParam("page") @Positive int page,
                                         @RequestParam("size") @Positive int size) {
        Page<Post> presentPost = postService.getPresentPost(page - 1, size);

        List<Post> content = presentPost.getContent();
        return new ResponseEntity(new MultiResponseDto<>(postMapper.postsToPostResponses(content), presentPost), HttpStatus.OK);
    }
    @GetMapping("/like")
    public ResponseEntity getLIkePost(@RequestParam("page") @Positive int page,
                                      @RequestParam("size") @Positive int size) {
        Page<Post> presentPost = postService.getLikePost(page - 1, size);

        List<Post> content = presentPost.getContent();
        return new ResponseEntity(new MultiResponseDto<>(postMapper.postsToPostResponses(content), presentPost), HttpStatus.OK);
    }
    @GetMapping("/view")
    public ResponseEntity getViewPost(@RequestParam("page") @Positive int page,
                                      @RequestParam("size") @Positive int size) {
        Page<Post> presentPost = postService.getViewPost(page - 1, size);

        List<Post> content = presentPost.getContent();
        return new ResponseEntity(new MultiResponseDto<>(postMapper.postsToPostResponses(content), presentPost), HttpStatus.OK);
    }


    @PostMapping("/like/up/{post-id}")
    public ResponseEntity likeUp(@PathVariable("post-id") Long postId) {
        Post post = postService.likeChange(postId,1);
        return new ResponseEntity(postMapper.postToPostResponse(post),HttpStatus.ACCEPTED);
    }

    @PostMapping("/like/down/{post-id}")
    public ResponseEntity likeDown(@PathVariable("post-id") Long postId) {
        Post post = postService.likeChange(postId,-1);
        return new ResponseEntity(postMapper.postToPostResponse(post), HttpStatus.ACCEPTED);
    }
}
