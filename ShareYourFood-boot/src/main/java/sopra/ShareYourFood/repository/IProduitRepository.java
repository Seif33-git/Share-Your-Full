package sopra.ShareYourFood.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import sopra.ShareYourFood.model.Produit;
import sopra.ShareYourFood.model.Type;

public interface IProduitRepository extends JpaRepository<Produit, String>{	

	@Query("select distinct p from Produit p Where p.type = :typeP" )
	List<Produit> findAllByType(@Param("typeP") Type typeProduit);
	
}
