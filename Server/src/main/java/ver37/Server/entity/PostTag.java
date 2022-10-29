//package ver37.Server.entity;
//
//import lombok.Getter;
//
//import javax.persistence.*;
//import javax.validation.GroupSequence;
//
//@Entity
//@Getter
//public class PostTag {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long postTagId;
//
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "POST_ID")
//    private Post post;
//
//    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.PERSIST)
//    @JoinColumn(name = "TAG_ID")
//    private Tag tag;
//
//    public void addTag(Tag tag, Post post) {
//        this.tag = tag;
//        if (!tag.getPostTags().contains(this)) {
//            tag.getPostTags().add(this);
//        }
//        this.post = post;
//        if (!post.getPostTags().contains(this)) {
//            post.getPostTags().add(this);
//        }
//    }
//}
