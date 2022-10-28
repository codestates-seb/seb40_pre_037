package ver37.Server.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.ConstraintViolationException;

@RestController
public class ExceptionController {

    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Response handleMethodArgumentNotValidException(
            MethodArgumentNotValidException e) {
        final Response response = Response.of(e.getBindingResult());

        return response;
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Response handleConstraintViolationException(
            ConstraintViolationException e) {
        final Response response = Response.of(e.getConstraintViolations());

        return response;
    }


    @ExceptionHandler
    public ResponseEntity handleBusinessLogicException(CustomException e) {
        final Response response = Response.of(e.getExceptionCode());

        return new ResponseEntity<>(response, HttpStatus.valueOf(e.getExceptionCode()
                .getCode()));
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.METHOD_NOT_ALLOWED)
    public Response handleHttpRequestMethodNotSupportedException(
            HttpRequestMethodNotSupportedException e) {

        final Response response = Response.of(HttpStatus.METHOD_NOT_ALLOWED);

        return response;
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Response handleHttpMessageNotReadableException(
            HttpMessageNotReadableException e) {

        final Response response = Response.of(HttpStatus.BAD_REQUEST,
                "정확한 제이슨 요청을 부탁드립니다.");

        return response;
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Response handleMissingServletRequestParameterException(
            MissingServletRequestParameterException e) {

        final Response response = Response.of(HttpStatus.BAD_REQUEST,
                e.getMessage());

        return response;
    }
}
