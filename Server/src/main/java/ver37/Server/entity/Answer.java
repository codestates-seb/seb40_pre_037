package ver37.Server.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;


import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Answer extends Auditing {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long answerId;

    private Long checkingPostId;

    @Column(nullable = false, columnDefinition = "TEXT")
    @Size(min = 15)
    private String answerBody;

    @Column(nullable = false)
    private Integer likeCount = 0;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ElementCollection(fetch = FetchType.EAGER)
    private Map<Long, Integer> likeRepo = new HashMap<>();
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "POST_ID")
    private Post post;

    public void addMember(Member member) {
        this.member = member;
    }

    public void addPost(Post post) {
        this.post = post;
    }

    public Answer(Long checkingPostId, String answerBody) {
        this.checkingPostId = checkingPostId;
        this.answerBody = answerBody;
    }
    public void changeLikeCount(int likeCount) {
        this.likeCount += likeCount;
    }

    public void changeSubject(String answerBody) {
        Optional.ofNullable(answerBody).ifPresent(real -> {
            this.answerBody = real;
        });
        }

}
