package ver37.Server.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import ver37.Server.dto.AnswerDto;
import ver37.Server.entity.Answer;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AnswerMapper {
    default Answer answerPostDtoToAnswer(AnswerDto.Post post) {
        Answer answer = new Answer(post.getPostId(), post.getAnswerBody());
        return answer;
    }

    //    Answer answerPatchToAnswer(AnswerDto.Patch requestBody);
    default AnswerDto.Response answerToResponse(Answer answer) {
        AnswerDto.Response response = new AnswerDto.Response(answer);
        return response;

//    List<AnswerDto.Response> answersToAnswerResponses(List<Answer> answers);
    }
}
