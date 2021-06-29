package sopra.ShareYourFood.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import sopra.ShareYourFood.model.Don;

public interface IDonRepository extends JpaRepository<Don, Long> {

	//List<Don> findAllJeRecois(String ville);
	
	@Query("select d from Don d where d.entite.id = :idEntite")
	List<Don> findDonByEntiteId(@Param("idEntite") Long idEntite);

}
