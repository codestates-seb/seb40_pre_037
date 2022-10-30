package ver37.Server.Service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ver37.Server.entity.Answer;
import ver37.Server.entity.Member;
import ver37.Server.exception.CustomException;
import ver37.Server.exception.ExceptionCode;
import ver37.Server.repository.AnswerRepository;
import ver37.Server.repository.PostRepository;

import javax.servlet.http.HttpServletRequest;

@Service
@RequiredArgsConstructor
@Transactional
public class AnswerService {

    private final AnswerRepository answerRepository;
    private final MemberService memberService;
    private final PostRepository postRepository;

    private final HttpServletRequest request;



    public Answer createAnswer(Answer answer) {
        Member member = getMemberByAccess();
        answer.addMember(member);
        answer.addPost(postRepository.findById(answer.getCheckingPostId())
                .orElseThrow(() -> new CustomException(ExceptionCode.POST_NOT_FOUND)));
        return answerRepository.save(answer);
    }

    public Answer patchAnswer(Answer answer) {
        Answer verifyAnswer = findVerifyAnswer(answer.getAnswerId());
        Member memberByRequest = getMemberByAccess();

        verifyAnswer.changeSubject(answer.getAnswerBody());
        return verifyAnswer;
    }

    public Page<Answer> getAllAnswer(int page, int size) {
        return answerRepository.findAll(PageRequest.of(page, size, Sort.by("likeCount").descending()));
    }

    private Answer findVerifyAnswer(Long answerId) {
        Answer answer = answerRepository
                .findById(answerId).orElseThrow(() -> new CustomException(ExceptionCode.ANSWER_NOT_FOUND));
        return answer;
    }
    private Member getMemberByAccess() {
        if (request.getHeader("Authorization") == null) {
            throw new CustomException(ExceptionCode.MISSING_HEADER_ACCESS_TOKEN);
        }

        String replace = request.getHeader("Authorization").replace("Bearer ", "");

        Member member = memberService.getMemberFromToken(replace);
        return member;
    }


    public Answer likeChange(Long answerId,int V) {
        Answer verifyAnswer = findVerifyAnswer(answerId);
        Member memberByAccess = getMemberByAccess();
        if (verifyAnswer.getLikeRepo().get(answerId) == null) {
            verifyAnswer.changeLikeCount(V);
            verifyAnswer.getLikeRepo().put(answerId, V);
        } else if (verifyAnswer.getLikeRepo().get(answerId) == V) {
            throw new CustomException(ExceptionCode.LIKE_NOT_ACCEPTED);
        }else if (verifyAnswer.getLikeRepo().get(answerId) == 0) {
            verifyAnswer.changeLikeCount(V);
            verifyAnswer.getLikeRepo().put(answerId, V);

        }else{
            verifyAnswer.changeLikeCount(V);
            verifyAnswer.getLikeRepo().put(answerId, 0);
        }
        return verifyAnswer;
    }

}
