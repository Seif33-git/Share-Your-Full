package sopra.ShareYourFood.rest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.fasterxml.jackson.annotation.JsonView;

import sopra.ShareYourFood.dto.DashboardBeneficiaireDTO;
import sopra.ShareYourFood.model.Demande;
import sopra.ShareYourFood.model.Lot;
import sopra.ShareYourFood.model.Views;
import sopra.ShareYourFood.repository.IDemandeRepository;
import sopra.ShareYourFood.repository.ILotRepository;

@RestController
@RequestMapping("/demande")
@CrossOrigin("*")
public class DemandeRestController {

	@Autowired
	private IDemandeRepository demandeRepo;
	
	@Autowired
	private ILotRepository lotRepo;

	@GetMapping("")
	@JsonView(Views.ViewDemande.class)
	public List<Demande> findAll() {
		return demandeRepo.findAll();
	}

	@GetMapping("/{id}")
	@JsonView(Views.ViewDemande.class)
	public Demande find(@PathVariable Long id) {

		Optional<Demande> optDemande = demandeRepo.findById(id);

		if (optDemande.isPresent()) {
			return optDemande.get();
		} else {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to find resource");
		}
	}
	@GetMapping("/list-lot-demande/{idEntite}")
	@JsonView(Views.ViewDemandeWithLot.class)
	public List<Demande> findAllAccByEntite(@PathVariable Long idEntite){
		return demandeRepo.findAllNonDonneEtDemandeAccOuPasRepByEntiteById(idEntite);
	}
	
	//Requetes Aubeline
	
	@GetMapping("/message-accepte-by-entite/{id}/beneficiaire")
	@JsonView(Views.ViewDemande.class)
	public List<Demande> findListMessageAccepteAcceuil2Beneficiaire(@PathVariable Long id) {
		return demandeRepo.findAllWithMessageAndStatutAccepteByEntiteByIdIfBeneficiaire(id);
	}
	
	@GetMapping("/message-accepte-by-entite/{id}/donneur")
	@JsonView(Views.ViewDemande.class)
	public List<Demande> findListMessageAccepteAcceuil2Donneur(@PathVariable Long id) {
		return demandeRepo.findAllWithMessageAndStatutAccepteByEntiteByIdIfDonneur(id);
	}
	
	@GetMapping("/message-attente-by-entite/{id}/beneficiaire")
	@JsonView(Views.ViewDemande.class)
	public Object[] findListMessageEnAttenteAcceuil2Beneficiaire(@PathVariable Long id) {
		return demandeRepo.findAllEnAttenteEtNomLotEtNomDemandeurEtDateDemandeByEntiteByIdIfBeneficiaire(id);
	}
	
	@GetMapping("/message-attente-by-entite/{id}/donneur")
	@JsonView(Views.ViewDemande.class)
	public Object[] findListMessageEnAttenteAcceuil2Donneur(@PathVariable Long id) {
		return demandeRepo.findAllEnAttenteEtNomLotEtNomDemandeurEtDateDemandeByEntiteByIdIfDonneur(id);
	}
	
	@GetMapping("/message-attente-contenu-by-entite/{id}/donneur")
	@JsonView(Views.ViewDemande.class)
	public Object[]  findListMessageEnAttenteContenuAcceuil2Donneur(@PathVariable Long id) {
		return demandeRepo.findAllEnAttenteEtNomLotEtDateDemandeEtMessageByEntiteByIdIfDonneur(id);
	}
	
	@GetMapping("/message-attente-contenu-by-entite/{id}/beneficiaire")
	@JsonView(Views.ViewDemande.class)
	public Object[]  findListMessageEnAttenteContenuAcceuil2Beneficiaire(@PathVariable Long id) {
		return demandeRepo.findAllEnAttenteEtNomLotEtDateDemandeEtMessageByEntiteByIdIfBeneficiaire(id);
	}
	
	//Fin Aube

	@GetMapping("/messagerie/list/{id}/beneficiaire")
	@JsonView(Views.ViewDemande.class)
	public List<Demande> findListMessagerieIfBenefeciaire(@PathVariable Long id) {
		
		return demandeRepo.findAllAccepterEtNomCorrespondantByEntiteByIdIfBeneficiaire(id);
		
	}
	
	@GetMapping("/messagerie/list/{id}/donneur")
	@JsonView(Views.ViewDemande.class)
	public List<Demande> findListMessagerieIfDonneur(@PathVariable Long id) {
		
		return demandeRepo.findAllAccepterEtNomCorrespondantByEntiteByIdIfDonneur(id);
		
	}

	@GetMapping("/messagerie/list/histoire/{id}/beneficiaire")
	@JsonView(Views.ViewDemande.class)
	public List<Demande> findListMessagerieHistoriqueIfBenefeciaire(@PathVariable Long id) {
		
		return demandeRepo.findAllAccepterEtNomCorrespondantByEntiteByIdIfBeneficiaire(id);
		
	}
	
	@GetMapping("/messagerie/list/histoire/{id}/donneur")
	@JsonView(Views.ViewDemande.class)
	public List<Demande> findListMessagerieHistoriqueIfDonneur(@PathVariable Long id) {
		
		return demandeRepo.findAllAccepterEtNomCorrespondantByEntiteByIdIfDonneur(id);
		
	}
	@PostMapping("")
	public Demande create(@RequestBody Demande demande) {
		demande = demandeRepo.save(demande);

		return demande;
	}

	@PutMapping("/{id}")
	public Demande update(@RequestBody Demande demande, @PathVariable Long id) {
		if (!demandeRepo.existsById(id)) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to find resource");
		}

		demande = demandeRepo.save(demande);

		return demande;
	}
	
	@GetMapping("/demande-acceptee/{idLot}")
	public void accepterDemande(@PathVariable Long idLot) {
		demandeRepo.setDemandeAcceptee(idLot);
		lotRepo.setLotReserve(idLot);
	}
	
	@GetMapping("/demande-annulee/{idLot}")
	public void annulerDemande(@PathVariable Long idLot) {
		demandeRepo.setDemandeEnAttente(idLot);
		lotRepo.setLotDisponible(idLot);
	}
	
	@GetMapping("/lot-donne/{idLot}")
	public void lotDonne(@PathVariable Long idLot) {
		demandeRepo.setDemandeArchivee(idLot);
		lotRepo.setLotDonne(idLot);
	}
	
	@GetMapping("/demande-refusee/{idLot}")
	public void refuserDemande(@PathVariable Long idLot) {
		demandeRepo.setDemandeRefusee(idLot);
	}

	@DeleteMapping("/{id}")
	public void delete(@PathVariable Long id) {
		demandeRepo.deleteById(id);
	}
	@GetMapping("/list-lot-demande-historique/{idEntite}")
	@JsonView(Views.ViewDemandeWithLot.class)
	public List<Demande> findTBBH(@PathVariable Long idEntite) {
		List<Demande> demandes =demandeRepo.findAllDonneEtDemandeArchiveeByEntiteById(idEntite);
		
		return demandes;
		
	}
	@GetMapping("/trouverNomEntiteByDemandeId/{idDemande}")
	@JsonView(Views.ViewCommon.class)
	public String findNomEntiteByDemandeId(@PathVariable Long idDemande) {
		String nomEntite = demandeRepo.findNomEntiteByDemandeId(idDemande).get();
		return nomEntite;
		
	}
	
	@GetMapping("TableaudeBordBeneficiaire/{idEntite}")
	@JsonView(Views.ViewCommon.class)
	public List<DashboardBeneficiaireDTO> remplirTDBB(@PathVariable Long idEntite) {
		List<DashboardBeneficiaireDTO> tdbbDto = new ArrayList<DashboardBeneficiaireDTO>();
		List<Demande> demandes = new ArrayList<Demande>();
		demandes = demandeRepo.findAllNonDonneEtDemandeAccOuPasRepByEntiteById(idEntite);
		for (Demande demande : demandes) {
			DashboardBeneficiaireDTO e = new DashboardBeneficiaireDTO();
			e.setId(demande.getId());
			e.setNomLot(demande.getLot().getNom());
			e.setQuantiteLot(demande.getLot().getVolume());
			e.setStatut(demande.getStatutNotif());
			
			String nomEntite = demandeRepo.findNomEntiteByDemandeId(e.getId()).get();
			e.setNomEntite(nomEntite);
			tdbbDto.add(e);
		}
		
		
		
		return tdbbDto;
	}
	@GetMapping("TableaudeBordBeneficiaireHisto/{idEntite}")
	@JsonView(Views.ViewCommon.class)
	public List<DashboardBeneficiaireDTO> remplirTDBBHisto(@PathVariable Long idEntite) {
		List<DashboardBeneficiaireDTO> tdbbDto = new ArrayList<DashboardBeneficiaireDTO>();
		List<Demande> demandes = new ArrayList<Demande>();
		demandes = demandeRepo.findAllDonneEtDemandeArchiveeByEntiteById(idEntite);
		for (Demande demande : demandes) {
			DashboardBeneficiaireDTO e = new DashboardBeneficiaireDTO();
			e.setId(demande.getId());
			e.setNomLot(demande.getLot().getNom());
			e.setQuantiteLot(demande.getLot().getVolume());
			e.setStatut(demande.getStatutNotif());
			
			String nomEntite = demandeRepo.findNomEntiteByDemandeId(e.getId()).get();
			e.setNomEntite(nomEntite);
			tdbbDto.add(e);
		}
		
		 
		
		return tdbbDto;
	}
}
