package sopra.ShareYourFood.dto;

import java.util.Date;

import sopra.ShareYourFood.model.Statut;
import sopra.ShareYourFood.model.Type;

public class CreationLotDTO {
	private Long id;
	private String nomLot;
	private Long volumeLot;
	private Date dtPeremptionLot;
	private String photo;
	private Statut statut;
	
	private Date dtPeremptionProduit;
	private Long quantite;
	
	private String nomProduit;
	private Type type;
	
	public CreationLotDTO() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNomLot() {
		return nomLot;
	}

	public void setNomLot(String nomLot) {
		this.nomLot = nomLot;
	}

	public Long getVolumeLot() {
		return volumeLot;
	}

	public void setVolumeLot(Long volumeLot) {
		this.volumeLot = volumeLot;
	}

	public Date getDtPeremptionLot() {
		return dtPeremptionLot;
	}

	public void setDtPeremptionLot(Date dtPeremptionLot) {
		this.dtPeremptionLot = dtPeremptionLot;
	}

	public String getPhoto() {
		return photo;
	}

	public void setPhoto(String photo) {
		this.photo = photo;
	}

	public Statut getStatut() {
		return statut;
	}

	public void setStatut(Statut statut) {
		this.statut = statut;
	}

	public Date getDtPeremptionProduit() {
		return dtPeremptionProduit;
	}

	public void setDtPeremptionProduit(Date dtPeremptionProduit) {
		this.dtPeremptionProduit = dtPeremptionProduit;
	}

	public Long getQuantite() {
		return quantite;
	}

	public void setQuantite(Long quantite) {
		this.quantite = quantite;
	}

	public String getNomProduit() {
		return nomProduit;
	}

	public void setNomProduit(String nomProduit) {
		this.nomProduit = nomProduit;
	}

	public Type getType() {
		return type;
	}

	public void setType(Type type) {
		this.type = type;
	}	
	
}
