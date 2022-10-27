package ver37.Server.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.swing.text.html.HTML;
import java.security.PublicKey;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Post extends Auditing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;

    private String title;
    private String postBody;

    private Integer articleVote = 0;

    @Builder
    public Post(String title, String postBody) {
        this.title = title;
        this.postBody = postBody;
    }
    //사용자가 tag를 String으로 보내주면 tags를 서비스 로직에서  분해해서 프론트에게 리스트로 전달 가능하냐고 물어보기
    private String tags;

    @OneToMany(mappedBy = "postTagId", cascade = CascadeType.PERSIST)
    private List<PostTag> PostTags = new ArrayList<>();





    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    //포스트에게 member 주입시 자동으로 member에도 post가 넣어짐
    public void addMember(Member member) {
        this.member = member;
        if (!member.getPosts().contains(this)) {
            member.getPosts().add(this);
        }
    }

}