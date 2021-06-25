package sopra.ShareYourFood.rest;

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

import sopra.ShareYourFood.model.ProduitLot;
import sopra.ShareYourFood.model.Views;
import sopra.ShareYourFood.repository.IProduitLotRepository;

@RestController
@RequestMapping("/produitLot")
@CrossOrigin("*")
public class ProduitLotRestController {	

	@Autowired
	private IProduitLotRepository produitLotRepo;

	@GetMapping("")
	@JsonView(Views.ViewProduit.class)
	public List<ProduitLot> findAll() {
		return produitLotRepo.findAll();
	}

	@GetMapping("/{id}")
	@JsonView(Views.ViewProduit.class)
	public ProduitLot find(@PathVariable Long id) {

		Optional<ProduitLot> optProduitLot = produitLotRepo.findById(id);

		if (optProduitLot.isPresent()) {
			return optProduitLot.get();
		} else {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to find resource");
		}
	}

	@PostMapping("")
	public ProduitLot create(@RequestBody ProduitLot produitLot) {
		produitLot = produitLotRepo.save(produitLot);

		return produitLot;
	}

	@PutMapping("/{id}")
	public ProduitLot update(@RequestBody ProduitLot produitLot, @PathVariable Long id) {
		if (!produitLotRepo.existsById(id)) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to find resource");
		}

		produitLot = produitLotRepo.save(produitLot);
		return produitLot;
	}

	@DeleteMapping("/{id}")
	public void delete(@PathVariable Long id) {
		produitLotRepo.deleteById(id);
	}
}
