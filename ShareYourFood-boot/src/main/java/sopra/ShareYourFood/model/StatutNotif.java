package sopra.ShareYourFood.model;

public enum StatutNotif {
	
	ACCEPTER("Accepter"), REFUSER("Refuser"), ARCHIVER("Archiver"), EN_ATTENTE("En attente");
	
	private final String label;

	private StatutNotif(String label) {
		this.label = label;
	}

	public String getLabel() {
		return label;
	}
	
}
