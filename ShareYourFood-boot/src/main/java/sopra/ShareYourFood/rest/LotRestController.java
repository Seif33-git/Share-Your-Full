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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.fasterxml.jackson.annotation.JsonView;

import sopra.ShareYourFood.model.Lot;
import sopra.ShareYourFood.model.Views;
import sopra.ShareYourFood.repository.ILotRepository;

@RestController
@RequestMapping("/lot")
@CrossOrigin("*")
public class LotRestController {

	@Autowired
	private ILotRepository lotRepo;

	@GetMapping("")
	@JsonView(Views.ViewLot.class)
	public List<Lot> findAll() {
		return lotRepo.findAll();
	}

	@GetMapping("/{id}")
	@JsonView(Views.ViewLot.class)
	public Lot find(@PathVariable Long id) {

		Optional<Lot> optLot = lotRepo.findById(id);

		if (optLot.isPresent()) {
			return optLot.get();
		} else {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to find resource");
		}
	}
	

	
	@GetMapping("/tri-par-volume")
	@JsonView(Views.ViewLot.class)
	public List<Lot> findLotGrosVolume() {
		return lotRepo.findAllLotsDonneTrieParVolume(); // .subList(0, 6)
	}
	
	@GetMapping("/count-lots")
	@JsonView(Views.ViewLot.class)
	public int compteurLot() {
		return lotRepo.findAllLotsDonne();
	}
	
	@GetMapping("/non-donne-by-entite/{id}")
	@JsonView(Views.ViewLot.class)
	@PreAuthorize("hasRole('DONNEUR')")
	public List<Lot> findNonDonneByEntite(@PathVariable Long id) {
		return lotRepo.findAllNonDonneByEntiteById(id);
	}
	
	@GetMapping("/donne-by-entite/{id}")
	@JsonView(Views.ViewLot.class)
	@PreAuthorize("hasRole('DONNEUR')")
	public List<Lot> findDonneByEntite(@PathVariable Long id) {
		return lotRepo.findAllDonneByEntiteById(id);
	}

	

	
	@GetMapping("/TableauDeBordBeneficiaire/historique/{idEntite}/")
	@JsonView(Views.ViewLot.class)
	public List<Lot> findTBBH(@PathVariable Long idEntite) {
		List<Lot> lots =lotRepo.findAllDonneEtDemandeArchiveeByEntiteById(idEntite);
		
		return lots;
		
	}
	
	@PostMapping("")
	public Lot create(@RequestBody Lot lot) {
		lot = lotRepo.save(lot);

		return lot;
	}

	@PutMapping("/{id}")
	public Lot update(@RequestBody Lot lot, @PathVariable Long id) {
		if (!lotRepo.existsById(id)) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to find resource");
		}

		lot = lotRepo.save(lot);

		return lot;
	}

	@DeleteMapping("/{id}")
	public void delete(@PathVariable Long id) {
		lotRepo.deleteById(id);
	}
	
//	public DashboardGiverDTO dashboard() {
//
//	}
	
//	@GetMapping("/advanceSearch")
//	public List<Lot> advanceSearchResult(@RequestParam("ville") String ville, @RequestParam("codePostal") String codePostal, @RequestParam("recherche") String recherche){
//		
//		List<Lot> lots = lotRepo.advanceSearch(recherche, codePostal,ville);
//		
//		return lots;
//	}
}
