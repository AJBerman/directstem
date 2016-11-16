package edu.csula.directstem.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Set;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import edu.csula.directstem.model.Edge;
import edu.csula.directstem.model.RealEdge;
import edu.csula.directstem.model.Graph;
import edu.csula.directstem.model.Node;
import edu.csula.directstem.model.ServiceNode;

public class TestGraphs {
	public static void main( String args[] ) throws ParseException {
		/*
		Graph testGraph = new Graph("testGraph");
		Node node1 = new ServiceNode("node1","http://localhost:8080/webservice/v1/numbers/random");
		testGraph.addNode(node1);
		Node node2 = new ServiceNode("node2","http://localhost:8080/webservice/v1/numbers/add");
		testGraph.addNode(node2);
		Set<Edge> node2in = node2.getIn();
		node2in.add(new Edge(node1,node2,"",""));
		node2.setIn(node2in);*/
		String someJson = "{'timestamp':'1999-10-23','name':'A nice name','id':'a_urlsafe_name','ends': ['nodeadd1'],'nodes': [{'id':'nodeadd1','url':'http://localhost:8080/blah/blah/add','params':[{'name':'num1','value':5},{'name':'num2','from':'nodeadd2'}]},{'id':'nodeadd2','url':'http://localhost:8080/blah/blah/add','params': [{'name':'num1','value':3},{'name':'num2','value':5}]}]}";
		JsonParser parser = new JsonParser();
		JsonObject o = parser.parse(someJson).getAsJsonObject();
		try {
			Graph g = new Graph(o,null);
			System.out.println(g.getName());
			System.out.println(g.getTimestamp());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
