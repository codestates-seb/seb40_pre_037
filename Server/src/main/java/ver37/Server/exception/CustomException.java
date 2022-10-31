package ver37.Server.exception;

import lombok.Getter;

public class CustomException extends RuntimeException{

        @Getter
        private ExceptionCode exceptionCode;

        public CustomException(ExceptionCode exceptionCode) {
            super(exceptionCode.getMessage());
            this.exceptionCode = exceptionCode;
        }
    }

