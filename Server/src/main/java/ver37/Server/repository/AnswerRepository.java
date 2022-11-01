package ver37.Server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ver37.Server.entity.Answer;

import java.util.List;
import java.util.Optional;

public interface AnswerRepository extends JpaRepository<Answer, Long> {
    @Query("select a from Answer a join fetch a.post p  where p.postId = :postId")
    Optional<List<Answer>> answerFromPost(@Param("postId") Long postId);
}
