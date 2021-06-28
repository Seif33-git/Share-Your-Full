package sopra.ShareYourFood.model;

public enum Categorie {

	GRANDE_SURFACE("Grande Surface"), SUPERETTE("Superette"), RESTAURANT("Restaurant"), CANTINE("Cantine"), AUTRE("Autre");
	
	private final String label;

	private Categorie(String label) {
		this.label = label;
	}

	public String getLabel() {
		return label;
	}

}
