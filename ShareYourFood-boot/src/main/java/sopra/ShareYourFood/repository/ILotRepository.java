package sopra.ShareYourFood.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import sopra.ShareYourFood.model.Lot;

public interface ILotRepository extends JpaRepository<Lot, Long>, ILotRepositoryCustom {
	
	@Query("select l from Lot l where l.statut = sopra.ShareYourFood.model.Statut.DISPONIBLE and l.don.entite.id = :idEntite")
	List<Lot> findAllDisponibleByEntiteById(@Param("idEntite") Long idEntite);
	
	@Query("select l from Lot l where l.statut = sopra.ShareYourFood.model.Statut.RESERVE and l.don.entite.id = :idEntite")
	List<Lot> findAllReserveByEntiteById(@Param("idEntite") Long idEntite);
	
	@Query("select l from Lot l where l.statut = sopra.ShareYourFood.model.Statut.DONNE and l.don.entite.id = :idEntite")
	List<Lot> findAllDonneByEntiteById(@Param("idEntite") Long idEntite);

	@Query("select d.lot from Demande d where d.statutNotif = sopra.ShareYourFood.model.StatutNotif.EN_ATTENTE and "
			+ "d.lot.statut = sopra.ShareYourFood.model.Statut.DISPONIBLE and " + "d.lot.don.entite.id = :idEntite")
	List<Lot> findAllDisponibleEnAttenteByEntiteById(@Param("idEntite") Long idEntite);

	@Query("select d.lot from Demande d where d.statutNotif = sopra.ShareYourFood.model.StatutNotif.ACCEPTER and "
			+ "d.lot.statut = sopra.ShareYourFood.model.Statut.DISPONIBLE and " + "d.lot.don.entite.id = :idEntite")
	List<Lot> findAllDisponibleAccepteByEntiteById(@Param("idEntite") Long idEntite);

	@Query("select l from Lot l WHERE l.statut = sopra.ShareYourFood.model.Statut.DONNE " + "ORDER BY l.volume DESC")
	List<Lot> findAllLotsDonneTrieParVolume();

	@Query("select count(l) from Lot l where l.statut = sopra.ShareYourFood.model.Statut.DONNE")
	int findAllLotsDonne();
	
	@Query("select count(l) from Lot l where l.don.id = :idDon")
	Long findNombreLotByDonId(@Param("idDon") Long idDon);
	
	@Query("select l from Lot l where l.don.id = :idDon")
	List<Lot> findLotByDonId(@Param("idDon") Long idDon);

//	@Query("select d.lot from Don d where d.entite.id=:idEntite")
//	List<Lot> findAllByDemande(@Param("idEntite") Long idEntite);

	@Query("select l from Lot l where l.statut = sopra.ShareYourFood.model.Statut.DISPONIBLE")
	List<Lot> findAllLotsDispo();

	@Transactional
	@Modifying
	@Query("UPDATE Demande d SET d.lot = NULL WHERE lot.id = :id")
	void setLotOfDemandeNull(@Param("id") Long id);

	// DASHBOARD DONNEUR
	@Query("select d.entite.nom from Demande d where d.lot.id = :idLot")
	String findNomEntiteLotByIdLot(@Param("idLot") Long idLot);

	@Transactional
	@Modifying
	@Query("UPDATE Lot l SET l.statut = sopra.ShareYourFood.model.Statut.RESERVE WHERE l.id = :idLot")
	void setLotReserve(@Param("idLot") Long idLot);
	
	@Transactional
	@Modifying
	@Query("UPDATE Lot l SET l.statut = sopra.ShareYourFood.model.Statut.DISPONIBLE WHERE l.id = :idLot")
	void setLotDisponible(@Param("idLot") Long idLot);
	
	@Transactional
	@Modifying
	@Query("UPDATE Lot l SET l.statut = sopra.ShareYourFood.model.Statut.DONNE WHERE l.id = :idLot")
	void setLotDonne(@Param("idLot") Long idLot);
	
	
}
