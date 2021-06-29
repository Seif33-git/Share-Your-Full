package sopra.ShareYourFood.model;

public enum Destinataire {
	
	ENTREPRISE("Entreprise"),PARTICULIER("particulier"),ASSOCIATION("Association");
	
	private final String label;

	private Destinataire(String label) {
		this.label = label;
	}

	public String getLabel() {
		return label;
	}
	
}
