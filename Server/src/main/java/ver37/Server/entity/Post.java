package ver37.Server.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

    private Integer likeCount = 0;

    //post생성자
    @Builder
    public Post(Long postId, String title, String postBody,List<String> tags) {
        this.postId = postId;
        this.title = title;
        this.postBody = postBody;
        this.tags = tags;
    }

    public void changeSubject(String title, String body, List<String> tag) {
        Optional.of(title).ifPresent(real -> {
            this.title = real;
        });
        Optional.of(body).ifPresent(real -> {
            this.postBody = real;
        });
        Optional.of(tag).ifPresent(real -> {
            this.tags = real;
        });
    }

    //    @OneToMany(mappedBy = "postTagId",cascade = CascadeType.PERSIST)
//    private List<PostTag> postTags = new ArrayList<>();
//
//
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

}