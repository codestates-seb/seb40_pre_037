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
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;

    private String title;
    private String postBody;

    private Integer likeCount = 0;



    //post생성자
    @Builder
    public Post(String title, String postBody) {
        this.title = title;
        this.postBody = postBody;
    }

    @OneToMany(mappedBy = "postTagId",cascade = CascadeType.PERSIST)
    private List<PostTag> postTags = new ArrayList<>();



    @ManyToOne(fetch = FetchType.LAZY)
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