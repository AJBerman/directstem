package doc_style.server;

/**
 * Created by luisf on 9/11/2016.
 */

import javax.jws.WebService;
import java.util.*;

//Service Implementation

@WebService(endpointInterface = "doc_style.server.HelloWorld")

public class HelloWorldImp implements HelloWorld {

    @Override
    public String getHelloWorldAsString(String name) {

        return "Hello World JAX-WS" + name;
    }

    /*
    Arguments:
    arraySize -  size of X,Y coordinate array's
    function -  String must be "exponential", "linear", "log", "polynomial"

    returns:
    a dictionary in string format of the "X" mapped to an array of doubles length of arraySize and
    "Y" mapped to an array of doubles length of arraySize with a relation using the function.
    if no known function is given the Y's are random
     */

    @Override
    public String getXY(String function, int arraySize) {

        Random random = new Random();

        Map<String, double[]> coordinates = new HashMap<String, double[]>();

        List<Double> xCoordinates = new ArrayList<Double>();

        int lowBound = 0;
        int highBound = lowBound + 5;

        for (int index = 0; index < arraySize; index++) {

            xCoordinates.add(random.nextDouble() + random.nextInt(highBound) + lowBound);

            lowBound = highBound;
            highBound+= 5;
        }

        List<Double> yCoordinates = new ArrayList<Double>();

        switch (function) {

            case "linear":

                // slope of line
                double slope = random.nextDouble() + random.nextInt(4);

                // positive or negative slope
                if (random.nextBoolean()) slope *= -1;

                for (int index = 0; index < arraySize; index++) {
                    yCoordinates.add(xCoordinates.get(index) * slope);
                }
                break;

            case "log":

                // natural log base 10 or base e
                boolean log10 = random.nextBoolean();

                for (int index = 0; index < arraySize; index++) {
                    if (log10) {
                        yCoordinates.add(Math.log10(xCoordinates.get(index)));
                    }
                    else {
                        yCoordinates.add(Math.log(xCoordinates.get(index)));
                    }
                }
                break;

            case "exponential":

                // exponent
                double exponent = random.nextDouble() + random.nextInt(9) - 4;

                for (int index = 0; index < arraySize; index++) {
                    yCoordinates.add(Math.pow(xCoordinates.get(index), exponent));
                }
                break;

            case "polynomial":

                int polynomialVariables = random.nextInt(4) + 1;

                List<Double> polynomialMultiples = new ArrayList<Double>();

                // puts a random number in the position
                for (int index = 0; index < polynomialVariables; index++) {
                    polynomialMultiples.add(random.nextDouble() + random.nextInt(21) - 10);
                }

                double constant = random.nextDouble() + random.nextInt(21) - 10;
                double sum = 0;

                // number * x ^ pow + number * x ^ (pow - 1) + ... + number * x ^ 1 + constant
                for (int index = 0; index < arraySize; index++, sum = 0) {

                    for (int pos = 0, pow = polynomialMultiples.size(); pos < polynomialMultiples.size(); pos++, pow--) {

                        sum += polynomialMultiples.get(pos) * Math.pow(xCoordinates.get(index), pow);
                    }

                    sum += constant;
                    yCoordinates.add(sum);
                }
                break;

            default:

            for (int index = 0; index < arraySize; index++) {
                yCoordinates.add(random.nextDouble() + random.nextInt(100));
            }
        }

        return "{\'X\':" + xCoordinates.toString() + "\",\'Y\':" + yCoordinates.toString() +"}";
    }
}
