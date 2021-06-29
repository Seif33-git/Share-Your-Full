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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.fasterxml.jackson.annotation.JsonView;

import sopra.ShareYourFood.dto.DashboardGiverDTO;
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

	@GetMapping("/non-donne-by-entite/{idEntite}")
	@JsonView(Views.ViewLot.class)
	@PreAuthorize("hasRole('DONNEUR')")
	public List<Lot> findNonDonneByEntite(@PathVariable Long idEntite) {
		return lotRepo.findAllNonDonneByEntiteById(idEntite);
	}

	@GetMapping("/donne-by-entite/{idEntite}")
	@JsonView(Views.ViewLot.class)
	@PreAuthorize("hasRole('DONNEUR')")
	public List<Lot> findDonneByEntite(@PathVariable Long idEntite) {
		return lotRepo.findAllDonneByEntiteById(idEntite);
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
		lotRepo.setLotOfDemandeNull(id);
		lotRepo.deleteById(id);
	}
	
	@GetMapping("/dashboard-donneur-non-donne/{idEntite}")
	@JsonView(Views.ViewLot.class)
	public List<DashboardGiverDTO> dashboardDonneur(@PathVariable Long idEntite) {
		
		List <DashboardGiverDTO> listLotDto = new ArrayList<DashboardGiverDTO>();
		
		List<Lot> lots = lotRepo.findAllNonDonneByEntiteById(idEntite);
		
		for  (Lot lot : lots) {
			DashboardGiverDTO e = new DashboardGiverDTO();
			e.setId(lot.getId());
			e.setNomLot(lot.getNom());
			e.setQuantiteLot(lot.getVolume());
			
			String nomEntite = lotRepo.findNomEntiteLotByIdLot(e.getId());
			e.setNomEntite(nomEntite);
			listLotDto.add(e);
		}
		return listLotDto;
	}
	
	@PutMapping("/lot-reserve/{idLot}")
	public void reserverLot(@PathVariable Long idLot) {
		lotRepo.setLotReserve(idLot);
	}
	
//	@GetMapping("/advanceSearch")
//	public List<Lot> advanceSearchResult(@RequestParam("ville") String ville, @RequestParam("codePostal") String codePostal, @RequestParam("recherche") String recherche){
//		
//		List<Lot> lots = lotRepo.advanceSearch(recherche, codePostal,ville);
//		
//		return lots;
//	}
