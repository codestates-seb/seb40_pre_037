package ver37.Server.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.swing.text.html.HTML;
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

    private Integer articleVote = 0;

    @Builder
    public Post (String title, String postBody){
        this.title = title;
        this.postBody = postBody;
    }

    @OneToMany(mappedBy = "post")
    private List<Tag> tags = new ArrayList<>();
}