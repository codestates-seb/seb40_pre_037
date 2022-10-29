package ver37.Server.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ver37.Server.Service.AnswerService;
import ver37.Server.dto.AnswerDto;
import ver37.Server.dto.MultiResponseDto;
import ver37.Server.entity.Answer;
import ver37.Server.mapper.AnswerMapper;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/answers")
@RequiredArgsConstructor
public class AnswerController {
    private final AnswerService answerService;
    private final AnswerMapper answerMapper;


    @PostMapping
    public ResponseEntity postAnswer(@RequestHeader("Authorization") String token,
                                     @Valid @RequestBody AnswerDto.Post post) {
        Answer answer = answerService.createAnswer(answerMapper.answerPostDtoToAnswer(post));
        return new ResponseEntity<>(answerMapper.answerToResponse(answer), HttpStatus.CREATED);
    }

    @PatchMapping("/{answer-Id}")
    public ResponseEntity patchAnswer(@PathVariable("answer-Id") Long answerId,
                                      @RequestBody AnswerDto.Patch patch) {
        patch.setAnswerId(answerId);
        Answer answer = answerService.patchAnswer(answerMapper.answerPatchDtoToAnswer(patch));
        return new ResponseEntity(answerMapper.answerToResponse(answer), HttpStatus.OK);
    }
    @GetMapping("/like")
    public ResponseEntity getAllAnswer (@RequestParam("page") @Positive int page,
                                         @RequestParam("size") @Positive int size) {
        Page<Answer> allAnswer = answerService.getAllAnswer(page - 1, size);
        List<Answer> content = allAnswer.getContent();
        return new ResponseEntity(new MultiResponseDto<>(answerMapper.answersToResponses(content), allAnswer), HttpStatus.OK);
    }
    @PostMapping("/like/up/{answer-id}")
    public ResponseEntity likeUp(@PathVariable("answer-id") Long answerId) {
        Answer answer = answerService.likeChange(answerId, 1);
        return new ResponseEntity(answerMapper.answerToResponse(answer),HttpStatus.ACCEPTED);
    }

    @PostMapping("/like/down/{answer-id}")
    public ResponseEntity likeDown(@PathVariable("answer-id") Long answerId) {
        Answer answer = answerService.likeChange(answerId, -1);
        return new ResponseEntity(answerMapper.answerToResponse(answer),HttpStatus.ACCEPTED);
    }

    //getMapping은 한번에 다 보내주는 걸로 연관된 모든 answer를 보내준다.

}
