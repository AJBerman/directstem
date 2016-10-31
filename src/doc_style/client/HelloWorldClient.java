package doc_style.client;

/**
 * Created by luisf on 9/11/2016.
 */

import rpc_style.server.HelloWorld;

import java.net.URL;
import javax.xml.namespace.QName;
import javax.xml.ws.Service;

public class HelloWorldClient {

    public static void main(String[] args) throws Exception {

        URL url = new URL("http://localhost:7779/ws/hello2?wsdl");

        //1st argument service URI, refer to wsdl document above
        //2nd argument is service name, refer to wsdl document above

        QName qname = new QName("http://server.doc_style/","HelloWorldImpService");

        Service service = Service.create(url, qname);

        doc_style.server.HelloWorld hello = service.getPort(doc_style.server.HelloWorld.class);

        System.out.println(hello.getHelloWorldAsString(" javapoint doc"));

        //tests if the return maps
        System.out.println(hello.getXY("random",5));
        System.out.println(hello.getXY("linear",5));
        System.out.println(hello.getXY("polynomial",5));
        System.out.println(hello.getXY("exponential",5));
        System.out.println(hello.getXY("log",5));

    }
}
