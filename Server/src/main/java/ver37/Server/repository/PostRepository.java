package ver37.Server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ver37.Server.entity.Post;

import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {
    //한방 쿼리
    @Query("select p from Post p left join fetch p.member left join fetch p.answers where p.postId = :postId")
    Optional<Post> findPostId(@Param("postId") Long postId);

}
