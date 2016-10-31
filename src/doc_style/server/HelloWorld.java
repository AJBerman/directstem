package doc_style.server;

/**
 * Created by luisf on 9/11/2016.
 */

import javax.jws.WebMethod;
import javax.jws.WebService;
import javax.jws.soap.SOAPBinding;
import javax.jws.soap.SOAPBinding.Style;

//Service Endpoint Interface

@WebService

@SOAPBinding(style = Style.DOCUMENT)

public interface HelloWorld {

    @WebMethod String getHelloWorldAsString(String name);

    @WebMethod String getXY(String function, int arraySize);

}
