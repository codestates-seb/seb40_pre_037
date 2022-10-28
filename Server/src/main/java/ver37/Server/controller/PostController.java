package ver37.Server.controller;



import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ver37.Server.Service.PostService;
import ver37.Server.dto.PostDto;
import ver37.Server.entity.Post;
import ver37.Server.mapper.PostMapper;

import javax.validation.Valid;

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
        return new ResponseEntity(postMapper.postToPostResponse(post), HttpStatus.OK);
    }

}
