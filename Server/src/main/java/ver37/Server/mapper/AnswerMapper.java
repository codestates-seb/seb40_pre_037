package ver37.Server.mapper;

import org.mapstruct.Mapper;
import ver37.Server.dto.AnswerDto;
import ver37.Server.entity.Answer;

import java.util.List;

@Mapper(componentModel =  "spring")
public interface AnswerMapper {
    Answer answerPostToAnswer(AnswerDto.Post requestBody);
    Answer answerPatchToAnswer(AnswerDto.Patch requestBody);
    AnswerDto.Response answerToResponse(Answer answer);
    List<AnswerDto.Response> answersToAnswerResponses(List<Answer> answers);
}
