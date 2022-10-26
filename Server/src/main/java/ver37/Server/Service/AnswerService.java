package ver37.Server.Service;

import org.springframework.stereotype.Service;
import ver37.Server.entity.Answer;
import ver37.Server.repository.AnswerRepository;

import java.util.List;
import java.util.Optional;

@Service
public class AnswerService {

    private List<Answer> findAnswers() {
        return answerRepository.findAll();
    }
    private final AnswerRepository answerRepository;

    public AnswerService(AnswerRepository answerRepository) {
        this.answerRepository = answerRepository;
    }

    public Answer createAnswer(Answer answer) {
        return answerRepository.save(answer);
    }

    public void deleteAnswer(long answerId) {
        Answer answer = answerRepository.findByAnswerId(answerId);
        answerRepository.delete(answer);
    }
    public Answer updateAnswer(Answer answer) {
        Answer findAnswer = answerRepository.findByAnswerId(answer.getAnswerId());
        findAnswer.setAnswerBody(answer.getAnswerBody());
        return answerRepository.save(findAnswer);
    }
    public Answer findAnswer(long answerId) {
        return answerRepository.findByAnswerId(answerId);
    }
}
