package mpti.common.exception;

public class EmailDuplicateException extends RuntimeException {
    public EmailDuplicateException(String email) {
        super("This email already exist : " + email);
    }
}
