package ver37.Server.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ver37.Server.Service.AnswerService;
import ver37.Server.dto.AnswerDto;
import ver37.Server.entity.Answer;
import ver37.Server.mapper.AnswerMapper;

import javax.validation.Valid;

@RestController
@RequestMapping("/answers")
@RequiredArgsConstructor
public class AnswerController {
    private final AnswerService answerService;
    private final AnswerMapper answerMapper;


    @PostMapping
    public ResponseEntity postAnswer(@RequestHeader("Authorization") String token,
                                     @Valid @RequestBody AnswerDto.Post post) {
        Answer answer = answerService.createAnswer(answerMapper.answerPostDtoToAnswer(post), token);
        return new ResponseEntity<>(answerMapper.answerToResponse(answer), HttpStatus.CREATED);
    }

//    @PatchMapping("{answer-id}")
//    public ResponseEntity patchAnswer(@PathVariable("answer-id") @Positive long answerId,
//                                      @Valid @RequestBody AnswerDto.Patch patch) {
//        Answer answer = answerService.updateAnswer(answerMapper.answerPatchToAnswer(patch));
//        return new ResponseEntity<>(answerMapper.answerToResponse(answer), HttpStatus.OK);
//    }
//
//    @GetMapping("/{answer-id}")
//    public ResponseEntity getAnswer(@PathVariable("answer-id") @Positive long answerId) {
//        Answer answer = answerService.findAnswer(answerId);
//
//        return new ResponseEntity<>(answerMapper.answerToResponse(answer), HttpStatus.OK);
//    }
//
//    @DeleteMapping("/{answer-id}")
//    public ResponseEntity deleteAnswer(@PathVariable("answer-id") long answerId) {
//        answerService.deleteAnswer(answerId);
//
//        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//    }
}
