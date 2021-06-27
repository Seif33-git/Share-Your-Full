package sopra.ShareYourFood;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import sopra.ShareYourFood.model.Categorie;
import sopra.ShareYourFood.model.Entreprise;
import sopra.ShareYourFood.model.Particulier;
import sopra.ShareYourFood.repository.IEntiteRepository;

@SpringBootTest
class ShareYourFoodBootApplicationTests {
	
	@Autowired
	private IEntiteRepository entiteRepo;

	@Test
	void contextLoads() {
		
		Particulier bibi = new Particulier("bibi", 20);
		bibi = entiteRepo.save(bibi);
		
		Entreprise auchan = new Entreprise("Auchan", true, false, "123456GHT785", Categorie.GRANDE_SURFACE);
		auchan = entiteRepo.save(auchan);
		
		Entreprise carrefour = new Entreprise("Carrefour", true, false, "48756OIU985", Categorie.GRANDE_SURFACE);
		carrefour = entiteRepo.save(carrefour);
		
		Entreprise biocbon = new Entreprise("Bio C'est Bon", true, false, "4785HQGTA2068", Categorie.SUPERETTE);
		biocbon = entiteRepo.save(biocbon);
	}

}
