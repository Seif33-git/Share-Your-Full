package sopra.ShareYourFood.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import sopra.ShareYourFood.model.Don;

public interface IDonRepository extends JpaRepository<Don, Long> {

	//List<Don> findAllJeRecois(String ville);
	
	@Query("select d from Don d where d.entite.id = :idEntite")
	List<Don> findDonByEntiteId(@Param("idEntite") Long idEntite);
	
//	@Query("select ld from Lot l left join l.don ld where l.statut<>sopra.ShareYourFood.model.Statut.DONNE and l.don.entite.id = :idEntite")
//	List<Don> findDonByEntiteId(@Param("idEntite") Long idEntite);
	
//	@Query("select ld from Lot l left join l.don ld where l.statut = sopra.ShareYourFood.model.Statut.DONNE and l.don.entite.id = :idEntite")
//	List<Don> findDonByEntiteIdHistorique(@Param("idEntite") Long idEntite);
	
	@Transactional
	@Modifying
	@Query("UPDATE Lot l SET l.don = NULL WHERE don.id = :id")
	void setDonOfLotNull(@Param("id") Long id);

}
