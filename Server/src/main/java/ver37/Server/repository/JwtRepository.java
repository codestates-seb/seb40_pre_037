package ver37.Server.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ver37.Server.entity.Jwt;
import ver37.Server.entity.Member;

import java.util.Optional;

public interface JwtRepository extends JpaRepository<Jwt, Long> {
    @Query("select t from Jwt t where t.refreshToken = :token")
    Optional<Jwt> findRefreshToken(@Param("token") String token);

    @Query("select t from Jwt t left join t.member m where t.member.memberId = :memberId")
    Optional<Jwt> findMemberId(@Param("memberId") Long memberId);

//    @Query("select t.member from Jwt t left JOIN fetch t.member where t.refreshToken = : token")
//    Optional<Member> findMemberwithToken(@Param("token") String token);

    @Query("delete from Jwt t where t.member.memberId = : memberId")
    void deleteMemberId(@Param("memberId") Long memberId);

    @Query("delete  from  Jwt t where t.refreshToken = : token")
    void deleteToken(@Param("token") String token);
}
