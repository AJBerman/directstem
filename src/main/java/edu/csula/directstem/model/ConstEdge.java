package edu.csula.directstem.model;

public class ConstEdge extends Edge {
	private String constVal;
	public ConstEdge() {
		
	}
	public ConstEdge(Node to, String constVal) {
		this.constVal = constVal;
		this.setTo(to);
	}
	public String getConstVal() {
		return constVal;
	}
	public void setConstVal(String constVal) {
		this.constVal = constVal;
	}
	@Override
	public boolean isConstEdge() {
		return true;
	}
}
