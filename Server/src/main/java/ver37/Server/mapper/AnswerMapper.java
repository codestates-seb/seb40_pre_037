package ver37.Server.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import ver37.Server.dto.AnswerDto;
import ver37.Server.entity.Answer;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AnswerMapper {
    default Answer answerPostDtoToAnswer(AnswerDto.Post post) {
        Answer answer = new Answer(post.getPostId(), post.getAnswerBody());
        return answer;
    }

    default Answer answerPatchDtoToAnswer(AnswerDto.Patch patch) {
        Answer answer = new Answer(null, patch.getAnswerBody());
        return answer;
    }
    default AnswerDto.Response answerToResponse(Answer answer) {
        AnswerDto.Response response = new AnswerDto.Response(answer);
        return response;

//    List<AnswerDto.Response> answersToAnswerResponses(List<Answer> answers);
    }

    default List<AnswerDto.Response> answersToResponses(List<Answer> answers) {
        List<AnswerDto.Response> collect = answers.stream().map(AnswerDto.Response::new).collect(Collectors.toList());
        return collect;
    }
}
