package ver37.Server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ver37.Server.entity.Answer;

public interface AnswerRepository extends JpaRepository<Answer, Long> {

    Answer findByAnswerId(long answerId);
}
