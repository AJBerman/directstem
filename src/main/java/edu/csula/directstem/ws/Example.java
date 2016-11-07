
package edu.csula.directstem.ws;


import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.google.gson.Gson;

@Path("/random")
public class Example  {

    @GET
    @Path("/{param}")
    @Produces(MediaType.TEXT_PLAIN)
    public String getIt(@PathParam("param") String msg) {
    	int num = 0;
    	try {
        	num = Integer.parseInt(msg);
    	}
    	catch (NumberFormatException e) {
    		return "[1,2,3]";
    	}
    	Gson gson = new Gson();
    	List<Integer> alist = new ArrayList<Integer>();
    	for(int i = 0; i < num; i++) {
    		alist.add((int) (100*Math.random()));
    		System.out.println(Math.random());
    	}
    	//return gson.toJson(alist);
        return gson.toJson(gson); //this is pretty neat.
    }
}
