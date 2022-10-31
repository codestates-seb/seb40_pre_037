package ver37.Server.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import ver37.Server.Service.MemberService;
import ver37.Server.dto.MemberDto;
import ver37.Server.entity.Member;
import ver37.Server.mapper.MemberMapper;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
@Validated
public class MemberController {

    private final MemberService service;
    private final MemberMapper mapper;

    private final HttpServletResponse response;

    @PostMapping
    public ResponseEntity postMember(@Valid @RequestBody MemberDto.Post post) {
        Member member = service.createMember(mapper.PostToMember(post));
        return new ResponseEntity(mapper.MemberToResponse(member), HttpStatus.CREATED);
    }

    @PostMapping("/refresh")
    public ResponseEntity refreshToken(@RequestHeader String Refresh) {
        String accessToken = service.getAccessToken(Refresh);
        response.addHeader("Authorization",accessToken);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @PatchMapping("/{member-id}")
    public ResponseEntity patchMember(@PathVariable("member-id") @Positive Long memberId,
                                      @Valid @RequestBody MemberDto.Patch patch) {
        patch.addMemberId(memberId);
        Member member = service.updateMember(mapper.PatchToMember(patch));
        return new ResponseEntity(mapper.MemberToResponse(member), HttpStatus.OK);
    }

    @GetMapping("/{member-id}")
    public ResponseEntity getMember(@PathVariable("member-id") @Positive Long memberId) {
        Member verifyMember = service.findVerifyMember(memberId);
        return new ResponseEntity(mapper.MemberToResponse(verifyMember), HttpStatus.OK);
    }

    @DeleteMapping("/{member-id}")
    public ResponseEntity deleteMember(@PathVariable("member-id") @Positive Long memberId) {
        service.deleteMember(memberId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/logout")
    public ResponseEntity logout(@RequestHeader String Refresh) {
        service.deleteToken(Refresh);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

}
