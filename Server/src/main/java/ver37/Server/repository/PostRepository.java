package ver37.Server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ver37.Server.entity.Post;

import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {

}
