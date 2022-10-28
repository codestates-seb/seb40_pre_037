package ver37.Server.controller;



import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ver37.Server.Service.PostService;
import ver37.Server.dto.MultiResponseDto;
import ver37.Server.dto.PostDto;
import ver37.Server.entity.Post;
import ver37.Server.mapper.PostMapper;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/post")
@RequiredArgsConstructor
@Valid
public class PostController {
    private final PostService postService;
    private final PostMapper postMapper;

    @PostMapping
    public ResponseEntity postPost(@RequestBody PostDto.Post post) {
        Post postAble =
                postService.creatPost(postMapper.postDtoToPost(post));

        return new ResponseEntity<>(postMapper.postToPostResponse(postAble), HttpStatus.CREATED);
    }

    @PatchMapping("/{post-id}")
    public ResponseEntity patchPost(@PathVariable("post-id") Long postId,
                                    @RequestBody PostDto.Patch patch) {
        patch.setPostId(postId);
        Post post = postService.patchPost(postMapper.patchToPostResponse(patch));
        return new ResponseEntity<>(postMapper.postToPostResponse(post), HttpStatus.OK);
    }

    @GetMapping("/{post-id}")
    public ResponseEntity getPost(@PathVariable("post-id") Long postId) {
        Post verifyPost = postService.findVerifyPost(postId);
        return new ResponseEntity<>(postMapper.postToPostResponse(verifyPost), HttpStatus.OK);
    }
    @GetMapping("/present")
    public ResponseEntity getPresentPost(@RequestParam("page") @Positive int page,
                                         @RequestParam("size") @Positive int size) {
        Page<Post> presentPost = postService.getPresentPost(page - 1, size);

        List<Post> content = presentPost.getContent();
        return new ResponseEntity(new MultiResponseDto<>(postMapper.postsToPostResponses(content), presentPost), HttpStatus.OK);
    }


    @PostMapping("/like/up")
    public ResponseEntity likeup() {
        return new ResponseEntity(HttpStatus.ACCEPTED);
    }
    @PostMapping("/like/down")
    public ResponseEntity likedown() {
        return new ResponseEntity(HttpStatus.ACCEPTED);
    }
}
