package ver37.Server.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
public class Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tagId;

    private String tagName;

    public Tag(String tagName) {
        this.tagName = tagName;
    }

    @OneToMany(mappedBy = "postTagId")
    private List<PostTag> postTags = new ArrayList<>();

}