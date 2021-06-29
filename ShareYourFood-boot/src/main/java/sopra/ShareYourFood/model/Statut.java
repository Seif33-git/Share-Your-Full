package sopra.ShareYourFood.model;

public enum Statut {
	
	EN_PREPARATION("En préparation"), DISPONIBLE ("Disponible"), RESERVE("Reserve"), DONNE ("Donné");
	
	private final String label;

	private Statut(String label) {
		this.label = label;
	}

	public String getLabel() {
		return label;
	}

}
