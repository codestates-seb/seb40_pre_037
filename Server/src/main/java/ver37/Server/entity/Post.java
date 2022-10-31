package ver37.Server.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Post extends Auditing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;

    private String title;
    private String postBody;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> tags = new ArrayList<>();
    //좋아요는 로그인해야 가능함 헤더 필요 인당 1번만 가능
    private Integer likeCount = 0;

    @ElementCollection(fetch = FetchType.EAGER)
    private Map<Long, Integer> likeRepo = new HashMap<>();
    private Integer viewCount = 0;

    @Builder
    public Post(Long postId, String title, String postBody,List<String> tags) {
        this.postId = postId;
        this.title = title;
        this.postBody = postBody;
        this.tags = tags;
    }

    public void changeSubject(String title, String body, List<String> tag) {
        Optional.ofNullable(title).ifPresent(real -> {
            this.title = real;
        });
        Optional.ofNullable(body).ifPresent(real -> {
            this.postBody = real;
        });
        Optional.ofNullable(tag).ifPresent(real -> {
            this.tags = real;
        });
    }

    public void plusViewCount() {
        this.viewCount += 1;
    }

    public void changeLikeCount(int likeCount) {
        this.likeCount += likeCount;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    //포스트에게 member 주입시 자동으로 member 에도 post 가 넣어짐
    public void addMember(Member member) {
        this.member = member;
        if (!member.getPosts().contains(this)) {
            member.getPosts().add(this);
        }
    }

    @OneToMany(mappedBy = "post")
    private List<Answer> answers = new ArrayList<>();


}