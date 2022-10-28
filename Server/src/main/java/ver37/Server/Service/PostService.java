package ver37.Server.Service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ver37.Server.entity.Jwt;
import ver37.Server.entity.Member;
import ver37.Server.entity.Post;
import ver37.Server.repository.JwtRepository;
import ver37.Server.repository.MemberRepository;
import ver37.Server.repository.PostRepository;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final JwtRepository jwtRepository;
    private final MemberService memberService;
    private final HttpServletRequest request;
    //String jwtToken = request.getHeader("Authorization").replace("Bearer ", "");

    public Post creatPost(Post post) { //컨트롤러에서는 헤더와 post디티오를 받아와야함
        Member member = getMemberByRequest();
        post.addMember(member);

        //토큰 가져오기 확인
        return postRepository.save(post);
    }

    private Member getMemberByRequest() {
        String replace = request.getHeader("Authorization").replace("Bearer ", "");
        Member member = memberService.getMemberFromToken(replace);
        return member;
    }

    public Post patchPost(Post post) {
        Post verifyPost = findVerifyPost(post.getPostId());
        Member memberByRequest = getMemberByRequest();
        if (verifyPost.equals(memberByRequest)) {
            throw new RuntimeException("본인이 작성한 글만 수정가능합니다.");
        }

        verifyPost.changeSubject(post.getTitle(), post.getPostBody(), post.getTags());
        return verifyPost;
    }

    //타이틀 바디 태그
    public Post findVerifyPost(Long postId) {
        return postRepository.findPostId(postId).orElseThrow(() -> new RuntimeException("존재하지 않는 게시글입니다."));
    }

}
