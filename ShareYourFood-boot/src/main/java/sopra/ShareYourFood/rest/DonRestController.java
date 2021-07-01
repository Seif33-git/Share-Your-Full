package sopra.ShareYourFood.rest;

import java.util.ArrayList;
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

import sopra.ShareYourFood.dto.DashboardGiverDTO;
import sopra.ShareYourFood.dto.PageDonneurDTO;
import sopra.ShareYourFood.model.Don;
import sopra.ShareYourFood.model.Lot;
import sopra.ShareYourFood.model.ProduitLot;
import sopra.ShareYourFood.model.Views;
import sopra.ShareYourFood.repository.IDonRepository;
import sopra.ShareYourFood.repository.ILotRepository;
import sopra.ShareYourFood.repository.IProduitLotRepository;

@RestController
@RequestMapping("/don")
@CrossOrigin("*")
public class DonRestController {

	@Autowired
	private IDonRepository donRepo;
	
	@Autowired
	private ILotRepository lotRepo;
	
	@Autowired
	private IProduitLotRepository produitLotRepo;

	@GetMapping("")
	@JsonView(Views.ViewDon.class)
	public List<Don> findAll() {
		return donRepo.findAll();
	}

	@GetMapping("/{id}")
	@JsonView(Views.ViewDon.class)
	public Don find(@PathVariable Long id) {

		Optional<Don> optDon = donRepo.findById(id);

		if (optDon.isPresent()) {
			return optDon.get();
		} else {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to find resource");
		}
	}
	
	@GetMapping("/page-mes-dons/{idEntite}")
	@JsonView(Views.ViewDon.class)
	public List<PageDonneurDTO> pageDonneur(@PathVariable Long idEntite) {
		
		List <PageDonneurDTO> listDonDto = new ArrayList<PageDonneurDTO>();
		
		List<Don> dons = donRepo.findDonByEntiteId(idEntite);
		
		for (Don don : dons) {
			PageDonneurDTO e = new PageDonneurDTO();
			e.setId(don.getId());
			e.setDtMiseEnLigne(don.getDateDeMiseEnLigne());
			e.setCreneau(don.getCreneau());
			e.setCommentaire(don.getCommentaire());
			e.setDestinataire(don.getDestinataire());
			
			Long nombreLot = lotRepo.findNombreLotByDonId(e.getId());
			e.setNombreLot(nombreLot);
			if(nombreLot != 0) {
				listDonDto.add(e);
			}
//			listDonDto.add(e);
		}
		return listDonDto;
	}
	
	@GetMapping("/page-mes-dons-historique/{idEntite}")
	@JsonView(Views.ViewDon.class)
	public List<PageDonneurDTO> pageDonneurHistorique(@PathVariable Long idEntite) {
		
		List <PageDonneurDTO> listDonDto = new ArrayList<PageDonneurDTO>();
		
		List<Don> dons = donRepo.findDonByEntiteId(idEntite);
		
		for (Don don : dons) {
			PageDonneurDTO e = new PageDonneurDTO();
			e.setId(don.getId());
			e.setDtMiseEnLigne(don.getDateDeMiseEnLigne());
			e.setCreneau(don.getCreneau());
			e.setCommentaire(don.getCommentaire());
			e.setDestinataire(don.getDestinataire());
			
			Long nombreLot = lotRepo.findNombreLotByDonId(e.getId());
			e.setNombreLot(nombreLot);
			if(nombreLot == 0) {
				listDonDto.add(e);
			}
			
			
		}
		return listDonDto;
	}
	
	

	@PostMapping("")
	public Don create(@RequestBody Don don) {
		
		donRepo.save(don);	
		
		for(Lot lot : don.getLot()) {		
				
			lot.setDon(don);			
			lot= lotRepo.save(lot);	
			
			for(ProduitLot produitLot :lot.getProduitLots() ) {
				
				ProduitLot produitLot1 = produitLot;
				produitLot1.setLot(lot);
				produitLot1 = produitLotRepo.save(produitLot1);				
			}
		}		
		return don;
	}

	@PutMapping("/{id}")
	public Don update(@RequestBody Don don, @PathVariable Long id) {
		if (!donRepo.existsById(id)) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to find resource");
		}

		don = donRepo.save(don);

		return don;
	}

	@DeleteMapping("/{id}")
	public void delete(@PathVariable Long id) {
		donRepo.setDonOfLotNull(id);
		donRepo.deleteById(id);
	}
				
}
