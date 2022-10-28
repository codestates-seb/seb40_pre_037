package ver37.Server.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


import javax.persistence.*;
import javax.validation.constraints.Size;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Answer extends Auditing {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long answerId;


    @Column(nullable = false, columnDefinition = "TEXT")
    @Size(min = 15)
    private String answerBody;

    @Column(nullable = false)
    private Integer answerVote = 0;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    private Post post;

    public Answer(String answerBody) {
        this.answerBody = answerBody;
    }

    public void setAnswerBody(String answerBody) {
    }
}
