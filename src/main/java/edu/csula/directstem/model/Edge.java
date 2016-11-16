package edu.csula.directstem.model;

public class Edge {
	private Node to;
	private String inString;
	public Edge() {
		
	}
	public Edge(Node to) {
		this.to = to;
	}
	public Node getTo() {
		return to;
	}
	public void setTo(Node to) {
		this.to = to;
	}
	public String getInString() {
		return inString;
	}
	public void setInString(String inString) {
		this.inString = inString;
	}
	public boolean isRealEdge() {
		return false;
	}
	public boolean isConstEdge() {
		return false;
	}
}
