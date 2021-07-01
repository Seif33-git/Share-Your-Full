package sopra.ShareYourFood.model;


public enum Type {
FRAIS("Produit frais"),FRUIT_LEGUME("Fruits et légumes"),PAIN_PATISSERIE("Pain / patisserie"),EPICERIE_SALEE("Epicerie salée"),EPICERIE_SUCREE("Epicerie sucrée"),BOISSON("Boissons"),NOURRITURE_ANIMAL("Animaux"),HYGIENE("Hygiène");

private final String label;

private Type(String label) {
	this.label = label;
}

public String getLabel() {
	return label;
}

}
