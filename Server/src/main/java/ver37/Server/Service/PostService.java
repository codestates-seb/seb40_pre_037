package ver37.Server.Service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ver37.Server.entity.Jwt;
import ver37.Server.entity.Member;
import ver37.Server.entity.Post;
import ver37.Server.repository.JwtRepository;
import ver37.Server.repository.MemberRepository;
import ver37.Server.repository.PostRepository;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final JwtRepository jwtRepository;
    private final MemberService memberService;

    public Post creatPost(Post post, String token) { //컨트롤러에서는 헤더와 post디티오를 받아와야함
        Member member = memberService.getMemberFromToken(token);
        post.addMember(member);
        return postRepository.save(post);
    }
}
