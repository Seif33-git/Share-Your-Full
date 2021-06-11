package sopra.ShareYourFood.rest;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.fasterxml.jackson.annotation.JsonView;

import sopra.ShareYourFood.model.Compteur;
import sopra.ShareYourFood.model.Don;
import sopra.ShareYourFood.model.Views;
import sopra.ShareYourFood.repository.ICompteurRepository;

@RestController
@RequestMapping("/compteur")
@CrossOrigin("*")
public class CompteurRestController {

	@Autowired
	private ICompteurRepository compteurRepo;
	
	@GetMapping("")
	@JsonView(Views.ViewCompteur.class)
	public List<Compteur> findAll() {
		return compteurRepo.findAll();
	}


	@PostMapping("")
	public Compteur create() {
		
		Compteur compteur = compteurRepo.findUnique();
		
		compteur.incVisiteur();
		compteur = compteurRepo.save(compteur);
		return compteur;
	}

}
