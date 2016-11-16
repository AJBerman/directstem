package edu.csula.directstem.model;

public class RealEdge extends Edge {
	private Node from;
	private String outString;
	public RealEdge() {
	}
	public RealEdge(Node from, Node to) {
		this.from = from;
		this.setTo(to);
	}
	public RealEdge(Node from, Node to, String outString, String inString) {
		this.from = from;
		this.setTo(to);
		this.outString = outString;
		this.setInString(inString);
	}
	public Node getFrom() {
		return from;
	}
	public void setFrom(Node from) {
		this.from = from;
	}
	public String getOutString() {
		return outString;
	}
	public void setOutString(String outString) {
		this.outString = outString;
	}
	@Override
	public boolean isRealEdge() {
		return true;
	}

}
