package doc_style.server;

/**
 * Created by luisf on 9/11/2016.
 */

import javax.xml.ws.Endpoint;

// Endpoint publisher

public class HelloWorldPublisher {

    public static void main(String[] args) {

        Endpoint.publish("http://localhost:7779/ws/hello2", new HelloWorldImp());
    }
}
