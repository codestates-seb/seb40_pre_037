package ver37.Server.exception;

import lombok.Getter;

@Getter
public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "이미 존재하는 아이디 입니다."),
    DUPLICATE_RESOURCE(409, "데이터가 이미 존재합니다"),
    INVALID_REFRESH_TOKEN(400, "리프레시 토큰이 유효하지 않습니다"),
    MISMATCH_REFRESH_TOKEN(400, "리프레시 토큰의 유저 정보가 일치하지 않습니다"),
    INVALID_AUTH_TOKEN(401, "권한 정보가 없는 토큰입니다"),
    REFRESH_TOKEN_NOT_FOUND(404, "로그아웃 된 사용자입니다"),
    ;

    private int code;
    private String message;

    ExceptionCode(int code, String message) {
        this.code = code;
        this.message = message;
    }

}
