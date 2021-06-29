package sopra.ShareYourFood.dto;

import com.fasterxml.jackson.annotation.JsonView;

import sopra.ShareYourFood.model.Views;

public class ConnexionDTO {

	@JsonView(Views.ViewCommon.class)
	private String mail;
	@JsonView(Views.ViewCommon.class)
	private String motDePasse;
	
	public ConnexionDTO(String mail, String motDePasse) {
		super();
		this.mail = mail;
		this.motDePasse = motDePasse;
	}
	public ConnexionDTO() {
		super();
	}
	public String getMail() {
		return mail;
	}
	public void setMail(String mail) {
		this.mail = mail;
	}
	public String getMotDePasse() {
		return motDePasse;
	}
	public void setMotDePasse(String motDePasse) {
		this.motDePasse = motDePasse;
	}
	
}
