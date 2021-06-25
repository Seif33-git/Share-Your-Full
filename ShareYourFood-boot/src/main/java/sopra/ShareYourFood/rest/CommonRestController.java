package sopra.ShareYourFood.rest;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import sopra.ShareYourFood.model.Categorie;

@RestController
@RequestMapping("/rest")
@CrossOrigin("*")
public class CommonRestController {

	@GetMapping("/categories")
	public Categorie[] getCategories() {
		return Categorie.values();
	}	
}
