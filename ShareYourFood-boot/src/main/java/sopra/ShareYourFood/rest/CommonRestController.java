package sopra.ShareYourFood.rest;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import sopra.ShareYourFood.model.Categorie;
import sopra.ShareYourFood.model.Statut;
import sopra.ShareYourFood.model.Type;

@RestController
@RequestMapping("/rest")
@CrossOrigin("*")
public class CommonRestController {

	@GetMapping("/categories")
	public Categorie[] getCategories() {
		return Categorie.values();
	}	
	
	@GetMapping("/types")
	public Type[] getTypes() {
		return Type.values();
	}
	
	@GetMapping("/statuts")
	public Statut[] getStatuts() {
		return Statut.values();
	}
}
