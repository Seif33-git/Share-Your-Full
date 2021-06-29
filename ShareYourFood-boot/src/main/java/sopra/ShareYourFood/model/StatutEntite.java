package sopra.ShareYourFood.model;

public enum StatutEntite {
	
	ENTREPRISE("Entreprise"), PARTICULIER("Particulier"), ASSOCIATION("Association");
	
	private final String label;

	private StatutEntite(String label) {
		this.label = label;
	}

	public String getLabel() {
		return label;
	}
}
