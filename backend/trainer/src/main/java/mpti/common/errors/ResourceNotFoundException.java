package mpti.common.errors;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException {
    private String resourceName;
    private Object resourceValue;

    public ResourceNotFoundException( String resourceName, Object resourceValue) {
        super(String.format("%s:'%s' not found ", resourceName, resourceValue));
        this.resourceName = resourceName;
        this.resourceValue = resourceValue;
    }


}
