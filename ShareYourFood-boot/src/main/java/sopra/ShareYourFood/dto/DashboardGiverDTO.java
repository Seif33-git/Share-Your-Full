package sopra.ShareYourFood.dto;

import com.fasterxml.jackson.annotation.JsonView;

import sopra.ShareYourFood.model.Views;

public class DashboardGiverDTO {
	@JsonView(Views.ViewCommon.class)
	private Long id;
	@JsonView(Views.ViewCommon.class)
	private String nomLot;
	@JsonView(Views.ViewCommon.class)
	private Long quantiteLot;
	@JsonView(Views.ViewCommon.class)
	private String nomEntite;

	public DashboardGiverDTO() {
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

	public Long getQuantiteLot() {
		return quantiteLot;
	}

	public void setQuantiteLot(Long quantiteLot) {
		this.quantiteLot = quantiteLot;
	}

	public String getNomEntite() {
		return nomEntite;
	}

	public void setNomEntite(String nomEntite) {
		this.nomEntite = nomEntite;
	}

	

}
