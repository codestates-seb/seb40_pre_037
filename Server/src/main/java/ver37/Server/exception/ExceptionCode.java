package ver37.Server.exception;

import lombok.Getter;

@Getter
public enum ExceptionCode {

    //유저
    DUPLICATE_MEMBER(409, "해당 아이디는 이미 존재합니다."),
    MEMBER_NOT_FOUND(404, "존재하지 않는 아이디 입니다."),

    DUPLICATE_RESOURCE(409, "데이터가 이미 존재합니다"),

    //토큰
    INVALID_REFRESH_TOKEN(400, "리프레시 토큰이 유효하지 않습니다"),
    MISSING_HEADER_ACCESS_TOKEN(404,"헤더에 엑세스 토큰을 넣어주세요"),
    MISMATCH_ACCESS_TOKEN(400, "엑세스 토큰의 유저 정보가 일치하지 않습니다"),
    INVALID_AUTH_TOKEN(401, "권한 정보가 없는 토큰입니다"),
    REFRESH_TOKEN_NOT_FOUND(404, "로그아웃 된 사용자입니다"),

    //게시굴
    POST_NOT_FOUND(404, "존재하지 않는 게시글입니다."),
    LIKE_NOT_ACCEPTED(400, "회원당 한번만 좋아요를 누를 수 있습니다."),
    ANSWER_NOT_FOUND(404, "존재하지 않는 답변입니다."),
    //시큐리티
    USER_NOT_FOUNT(404, "로그인 시도중 -> 해당 유저가 존재하지 않습니다.")
    ;

    private int code;
    private String message;

    ExceptionCode(int code, String message) {
        this.code = code;
        this.message = message;
    }

}
