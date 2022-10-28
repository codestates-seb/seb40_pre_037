package ver37.Server.Service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ver37.Server.entity.Answer;
import ver37.Server.entity.Member;
import ver37.Server.repository.AnswerRepository;
import ver37.Server.repository.PostRepository;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AnswerService {

    private final AnswerRepository answerRepository;
    private final MemberService memberService;
    private final PostRepository postRepository;



    public Answer createAnswer(Answer answer, String token) {
        Member member = memberService.getMemberFromToken(token);
        answer.addMember(member);
        answer.addPost(postRepository.findById(answer.getCheckingPostId())
                .orElseThrow(() -> new RuntimeException("존재하지 않는 포스트 입니다.")));
        return answerRepository.save(answer);
    }

}
