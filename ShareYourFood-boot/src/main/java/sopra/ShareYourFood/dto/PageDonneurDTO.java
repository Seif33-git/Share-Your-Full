package sopra.ShareYourFood.dto;

import java.util.Date;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonView;

import sopra.ShareYourFood.model.Destinataire;
import sopra.ShareYourFood.model.Views;

public class PageDonneurDTO {
	
	@JsonView(Views.ViewCommon.class)
	private Long id;
	@JsonFormat(pattern = "yyyy-MM-dd")
	@JsonView(Views.ViewCommon.class)
	private Date dtMiseEnLigne;
	@JsonView(Views.ViewCommon.class)
	private Long nombreLot;
	@JsonView(Views.ViewCommon.class)
	private String creneau;
	@JsonView(Views.ViewCommon.class)
	private String commentaire;
	@Enumerated(EnumType.STRING)
	@JsonView(Views.ViewCommon.class)
	private Destinataire destinataire;
	
	public PageDonneurDTO() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getDtMiseEnLigne() {
		return dtMiseEnLigne;
	}

	public void setDtMiseEnLigne(Date dtMiseEnLigne) {
		this.dtMiseEnLigne = dtMiseEnLigne;
	}

	public Long getNombreLot() {
		return nombreLot;
	}

	public void setNombreLot(Long nombreLot) {
		this.nombreLot = nombreLot;
	}

	public String getCreneau() {
		return creneau;
	}

	public void setCreneau(String creneau) {
		this.creneau = creneau;
	}

	public String getCommentaire() {
		return commentaire;
	}

	public void setCommentaire(String commentaire) {
		this.commentaire = commentaire;
	}

	public Destinataire getDestinataire() {
		return destinataire;
	}

	public void setDestinataire(Destinataire destinataire) {
		this.destinataire = destinataire;
	}
	
	
	
	

}
