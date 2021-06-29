package sopra.ShareYourFood.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import sopra.ShareYourFood.model.Adresse;

public interface IAdresseRepository extends JpaRepository<Adresse, Long>{
	
	@Query("select distinct a from Adresse a left join fetch a.entite")
	List<Adresse> findAllAdresseWithEntite();
	
	@Query("select distinct a from Adresse a left join fetch a.entite where a.id = :id")
	Optional<Adresse> finAdresseByIdWithEntite(@Param("id") Long id);

}
