package mpti.common.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.ArrayList;
import java.util.List;

@ConfigurationProperties(prefix = "app")
public class AppProperties {
    private final Auth auth = new Auth();

    public static class Auth {
        private String tokenSecret;
        public String getTokenSecret() {
            return tokenSecret;
        }
        public void setTokenSecret(String tokenSecret) {
            this.tokenSecret = tokenSecret;
        }

    }


    public Auth getAuth() {
        return auth;
    }

}
