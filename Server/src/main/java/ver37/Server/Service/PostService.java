package ver37.Server.Service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ver37.Server.entity.Member;
import ver37.Server.entity.Post;
import ver37.Server.exception.CustomException;
import ver37.Server.exception.ExceptionCode;
import ver37.Server.repository.PostRepository;

import javax.servlet.http.HttpServletRequest;

@Service
@RequiredArgsConstructor
@Transactional
public class PostService {

    private final PostRepository postRepository;
    private final MemberService memberService;
    private final HttpServletRequest request;



    public Post creatPost(Post post) { //컨트롤러에서는 헤더와 post디티오를 받아와야함
        Member member = getMemberByAccess();
        post.addMember(member);
        //토큰 가져오기 확인

        return postRepository.save(post);
    }

    public Post patchPost(Post post) {
        Post verifyPost = findVerifyPost(post.getPostId());
        Member memberByRequest = getMemberByAccess();
        if (!verifyPost.getMember().equals(memberByRequest)) {
            throw new CustomException(ExceptionCode.INVALID_AUTH_TOKEN);
        }

        verifyPost.changeSubject(post.getTitle(), post.getPostBody(), post.getTags());
        return verifyPost;
    }

    public Post findPostAndPlusViewCount(Long id) {
            Post verifyPost = findVerifyPost(id);
            verifyPost.plusViewCount();
            //쿠키로 조회수 중복 제거 해야함
        return verifyPost;
    }

    //최근순
    public Page<Post> getPresentPost(int page, int size) {
        return postRepository.findAll(PageRequest.of(page, size, Sort.by("postId").descending()));
    }

    //좋아요순
    public Page<Post> getLikePost(int page, int size) {
        return postRepository.findAll(PageRequest.of(page, size, Sort.by("likeCount").descending()));
    }
    //조회수 순
    public Page<Post> getViewPost(int page, int size) {
        return postRepository.findAll(PageRequest.of(page, size, Sort.by("viewCount").descending()));
    }


    public Post findVerifyPost(Long postId) {
        return postRepository.findPostId(postId).orElseThrow(() -> new CustomException(ExceptionCode.POST_NOT_FOUND));
    }

    private Member getMemberByAccess() {
        if (request.getHeader("Authorization") == null) {
            throw new CustomException(ExceptionCode.MISSING_HEADER_ACCESS_TOKEN);
        }

        String replace = request.getHeader("Authorization").replace("Bearer ", "");

        Member member = memberService.getMemberFromToken(replace);
        return member;
    }

    public Post likeChange(Long postId ,int V) {
        Post verifyPost = findVerifyPost(postId);
        Member memberByAccess = getMemberByAccess();
        if (verifyPost.getLikeRepo().get(postId) == null) {
            verifyPost.changeLikeCount(V);
            verifyPost.getLikeRepo().put(postId, V);
        } else if (verifyPost.getLikeRepo().get(postId) == V) {
            throw new CustomException(ExceptionCode.LIKE_NOT_ACCEPTED);
        }else if (verifyPost.getLikeRepo().get(postId) == 0) {
            verifyPost.changeLikeCount(V);
            verifyPost.getLikeRepo().put(postId, V);

        }else{
            verifyPost.changeLikeCount(V);
            verifyPost.getLikeRepo().put(postId, 0);
        }
        return verifyPost;
    }

    public void deletePost(Long postId) {
        Post verifyPost = findVerifyPost(postId);
        postRepository.deleteById(verifyPost.getPostId());
    }
}
