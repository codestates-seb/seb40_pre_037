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
    public ResponseEntity postPost(@RequestHeader("Authorization") String token,
                                   @RequestBody PostDto.Post post) {
        Post postAble =
                postService.creatPost(postMapper.postDtoToPost(post), token);

        return new ResponseEntity<>(postMapper.PostToPostResponse(postAble), HttpStatus.CREATED);
    }

}
