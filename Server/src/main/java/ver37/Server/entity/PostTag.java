package ver37.Server.entity;

import javax.persistence.*;

@Entity
public class PostTag {

    @Id
    private Long postTagId;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "POST_ID")
    private Post post;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "TAG_ID")
    private Tag tag;

    public void addTag(Tag tag) {
        this.tag = tag;
        if (!tag.getPostTags().contains(this)) {
            tag.getPostTags().add(this);
        }
    }
}
