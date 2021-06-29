package sopra.ShareYourFood.model;

public enum Role {
	
	ADMINISTRATEUR("Administrateur"), DONNEUR("Donneur"), BENEFICIAIRE("Beneficiaire");
	
	private final String label;

	private Role(String label) {
		this.label = label;
	}

	public String getLabel() {
		return label;
	}
}
