package ver37.Server.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import ver37.Server.dto.MemberDto;
import ver37.Server.entity.Member;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {

    default Member PostToMember(MemberDto.Post post) {
        Member member = Member.builder()
                .email(post.getEmail())
                .name(post.getName())
                .password(post.getPassword())
                .build();

        return member;
    }

    default Member PatchToMember(MemberDto.Patch patch) {
        Member member = Member.builder()
                .memberId(patch.getMemberId())
                .name(patch.getName())
                .password(patch.getPassword())
                .build();
        return member;
    }

    default MemberDto.Response MemberToResponse(Member member) {

        return new MemberDto.Response(member);
    }
}
