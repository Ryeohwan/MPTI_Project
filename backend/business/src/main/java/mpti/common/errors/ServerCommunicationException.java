package mpti.common.errors;

import java.io.IOException;

public class ServerCommunicationException extends IOException {

    public ServerCommunicationException(){
        super("Server communication Error");
    }
}
