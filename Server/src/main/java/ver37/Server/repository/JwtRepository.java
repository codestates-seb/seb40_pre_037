package ver37.Server.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ver37.Server.entity.Jwt;

import java.util.Optional;

public interface JwtRepository extends JpaRepository<Jwt, Long> {
    @Query("select t from Jwt t where t.refreshToken = :token")
    Optional<Jwt> findRefreshToken(@Param("token") String token);

    @Query("select t from Jwt t left join t.member m where t.member.memberId = :memberId")
    Optional<Jwt> findMemberId(@Param("memberId") Long memberId);

    @Modifying //중요
    @Query("delete from Jwt t where t.refreshToken = :token")
    void deleteJwtToken(@Param("token") String token);
}
