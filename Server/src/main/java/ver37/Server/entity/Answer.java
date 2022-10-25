package ver37.Server.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import net.bytebuddy.utility.nullability.MaybeNull;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "answer")
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long answerId;

    @Column(nullable = false)
    @Size(min = 15)
    private String answerBody;

    @Column(nullable = false)
    private int answerVote = 0;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    private Post post;

    @Builder
    public Answer(String answerBody, Post post, Member member) {
        this.answerBody = answerBody;
        this.post = post;
        this.member = member;
    }
}
