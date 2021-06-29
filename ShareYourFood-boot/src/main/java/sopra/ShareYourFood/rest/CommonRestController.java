package sopra.ShareYourFood.rest;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import sopra.ShareYourFood.model.Categorie;
import sopra.ShareYourFood.model.Destinataire;
import sopra.ShareYourFood.model.Role;
import sopra.ShareYourFood.model.Statut;
import sopra.ShareYourFood.model.StatutEntite;
import sopra.ShareYourFood.model.StatutNotif;
import sopra.ShareYourFood.model.Type;

@RestController
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

	@GetMapping("/statutNotifs")
	public StatutNotif[] getStatutNotifs() {
		return StatutNotif.values();
	}
	
	@GetMapping("/statutEntites")
	public StatutEntite[] getStatutEntites() {
		return StatutEntite.values();
	}
	

	@GetMapping("/roles")
	public Role[] getRoles() {
		return Role.values();
	}
	

	@GetMapping("/destinataires")
	public Destinataire[] getDestinataires() {
		return Destinataire.values();
	}
	
}
