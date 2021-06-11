package sopra.ShareYourFood.rest;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
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

import sopra.ShareYourFood.model.Demande;
import sopra.ShareYourFood.model.Views;
import sopra.ShareYourFood.repository.IDemandeRepository;

@RestController
@RequestMapping("/demande")
@CrossOrigin("*")
public class DemandeRestController {

	@Autowired
	private IDemandeRepository demandeRepo;

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
	
//	//Requetes Aubeline
//	
//	@GetMapping("/message-accepte-by-entite/{id}/beneficiaire")
//	@JsonView(Views.ViewLot.class)
//	@PreAuthorize("hasRole('BENEFICIAIRE')")
//	public List<Demande>  findListMessageAccepteAcceuil2Beneficiaire(@PathVariable Long id) {
//		return demandeRepo.findAllWithMessageAndStatutAccepteByEntiteByIdIfBeneficiaire(id);
//	}
//	@GetMapping("/message-accepte-by-entite/{id}/donneur")
//	@JsonView(Views.ViewLot.class)
//	@PreAuthorize("hasRole('DONNEUR')")
//	public List<Demande>  findListMessageAccepteAcceuil2Donneur(@PathVariable Long id) {
//		return demandeRepo.findAllWithMessageAndStatutAccepteByEntiteByIdIfDonneur(id);
//	}
//	@GetMapping("/message-attente-by-entite/{id}/beneficiaire")
//	@JsonView(Views.ViewLot.class)
//	@PreAuthorize("hasRole('BENEFICIAIRE')")
//	public List<Demande>  findListMessageEnAttenteAcceuil2Beneficiaire(@PathVariable Long id) {
//		return demandeRepo.findAllEnAttenteEtNomLotEtNomDemandeurEtDateDemandeByEntiteByIdIfBeneficiaire(id);
//	}
//	@GetMapping("/message-attente-by-entite/{id}/donneur")
//	@JsonView(Views.ViewLot.class)
//	@PreAuthorize("hasRole('DONNEUR')")
//	public List<Demande>  findListMessageEnAttenteAcceuil2Donneur(@PathVariable Long id) {
//		return demandeRepo.findAllEnAttenteEtNomLotEtNomDemandeurEtDateDemandeByEntiteByIdIfDonneur(id);
//	}
//	
//	//Fin Aube

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

	@DeleteMapping("/{id}")
	public void delete(@PathVariable Long id) {
		demandeRepo.deleteById(id);
	}
}
