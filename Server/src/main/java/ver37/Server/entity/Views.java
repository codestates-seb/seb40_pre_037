//package ver37.Server.entity;
//
//import lombok.AccessLevel;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//
//import javax.persistence.*;
//
//@Entity
//@Getter
//@NoArgsConstructor(access = AccessLevel.PROTECTED)
//public class Views {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long viewId;
//
//    private Integer viewCount = 0;
//    @OneToOne
//    @JoinColumn(name = "POST_ID")
//    private Post post;
//
//    public Views(Post post) {
//        this.post = post;
//    }
//
//}
