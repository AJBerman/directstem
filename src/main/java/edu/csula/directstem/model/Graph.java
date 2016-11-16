package edu.csula.directstem.model;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

public class Graph extends Node {
	private Set<Node> nodes;
	private Date timestamp;
	private String name;
	private Set<Node> outs;
	public Graph(JsonObject json, Graph context) throws Exception {
		super(json, context);
		if(json.has("timestamp")) this.timestamp = new SimpleDateFormat("yyy-mm-dd").parse(json.get("timestamp").getAsString());
		if(json.has("name")) this.name = json.get("name").getAsString();
		if(json.has("nodes")) {
			for(JsonElement nod : json.get("nodes").getAsJsonArray()) {
				JsonObject node = nod.getAsJsonObject();
				if(node.has("timestamp")) {
					//it's a graph.
					nodes.add(new Graph(node,this));
				} else if(node.has("url")) {
					//it's a service
					nodes.add(new ServiceNode(node,this));
				} else {
					//it's invalid? Let's at least parse it as a generic node.
					nodes.add(new Node(node,this));
				}
			}
		}
		if(json.has("ends")) {
			for(JsonElement endId : json.get("ends").getAsJsonArray()) {
				outs.add(this.findNodeById(endId.getAsString()));
			}
		}
	}
	public void addNode(Node node) {
		nodes.add(node);
	}
	public Set<Node> getNodes() {
		return nodes;
	}
	public void setNodes(Set<Node> nodes) {
		this.nodes = nodes;
	}
	public Date getTimestamp() {
		return timestamp;
	}
	public void setTimestamp(Date timestamp) {
		this.timestamp = timestamp;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Node findNodeById(String id) {
		for (Node node : nodes) { //linear search. Really should be a hashmap eventually.
			if(id.equals(node.getId())) return node;
		}
		return null;
	}
	public Set<Node> getOuts() {
		return outs;
	}
	public void setOuts(Set<Node> outs) {
		this.outs = outs;
	}
	@Override
	public JsonElement getResult() {
		JsonArray res = new JsonArray();
		for(Node out : outs) {
			res.add(out.getResult());
		}
		return res;
	}
	@Override
	public boolean isGraph() {
		return true;
	}
}
