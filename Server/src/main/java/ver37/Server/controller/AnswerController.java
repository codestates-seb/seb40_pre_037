package ver37.Server.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import ver37.Server.Service.AnswerService;
import ver37.Server.Service.MemberService;
import ver37.Server.dto.AnswerDto;
import ver37.Server.entity.Answer;
import ver37.Server.mapper.AnswerMapper;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/answers")
public class AnswerController {
    private final AnswerService answerService;
    private final AnswerMapper answerMapper;
    private final MemberService memberService;


    public AnswerController(AnswerService answerService, AnswerMapper answerMapper, MemberService memberService) {
        this.answerService = answerService;
        this.answerMapper = answerMapper;
        this.memberService = memberService;
    }
    @PostMapping
    public ResponseEntity postAnswer(@Valid @RequestBody AnswerDto.Post post) {
        Answer answer = answerService.createAnswer(answerMapper.answerPostToAnswer(post));
        return new ResponseEntity<>(answerMapper.answerToResponse(answer), HttpStatus.CREATED);
    }

    @PatchMapping("{answer-id}")
    public ResponseEntity patchAnswer(@PathVariable("answer-id") @Positive long answerId,
                                      @Valid @RequestBody AnswerDto.Patch patch) {
        Answer answer = answerService.updateAnswer(answerMapper.answerPatchToAnswer(patch));
        return new ResponseEntity<>(answerMapper.answerToResponse(answer), HttpStatus.OK);
    }

    @GetMapping("/{answer-id}")
    public ResponseEntity getAnswer(@PathVariable("answer-id") @Positive long answerId) {
        Answer answer = answerService.findAnswer(answerId);

        return new ResponseEntity<>(answerMapper.answerToResponse(answer), HttpStatus.OK);
    }

    @DeleteMapping("/{answer-id}")
    public ResponseEntity deleteAnswer(@PathVariable("answer-id") long answerId) {
        answerService.deleteAnswer(answerId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
