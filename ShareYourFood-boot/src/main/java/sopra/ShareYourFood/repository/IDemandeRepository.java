package sopra.ShareYourFood.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import sopra.ShareYourFood.model.Demande;;


public interface IDemandeRepository extends JpaRepository<Demande, Long> {

	// Afficher toutes les demandes ayant des messages et le statut ACCEPTER
	// findAlldAndStatutAccepte

//	@Query("select distinct d from Demande d left join fetch d.message.id where d.statutNotif = sopra.ShareYourFood.model.StatutNotif.ACCEPTER and demande.entite.id = :idEntite")
//	Optional<Demande> findAllDemandeWithMessagesEtQuiOntLeStatutAccepteByEntiteById(@Param("idEntite") Long idEntite);

//	@Query("select distinct d from Demande d left join fetch d.message where d.id = :id")
//	Optional<Demande> findDemandeByIdWithMessage(@Param("id") Long id);
	
	
	@Query("select d from Demande d where d.statutNotif = sopra.ShareYourFood.model.StatutNotif.ACCEPTER and "
			+ "d.entite.id = :idEntite") //, d.lot.don.entite.nom une seule sortie ? 
	List<Demande> findAllAccepterEtNomCorrespondantByEntiteByIdIfBeneficiaire(@Param("idEntite") Long idEntite);
	
	@Query("select d from Demande d where d.statutNotif = sopra.ShareYourFood.model.StatutNotif.ACCEPTER and "
			+ "d.lot.don.entite.id = :idEntite ")
	List<Demande> findAllAccepterEtNomCorrespondantByEntiteByIdIfDonneur(@Param("idEntite") Long idEntite);
	
	@Query("select d from Demande d where d.statutNotif = sopra.ShareYourFood.model.StatutNotif.ARCHIVER and "
			+ "d.entite.id = :idEntite ")
	List<Demande> findAllArchiverEtNomCorrespondantByEntiteByIdIfBeneficiaire(@Param("idEntite") Long idEntite);
	
	@Query("select d from Demande d where d.statutNotif = sopra.ShareYourFood.model.StatutNotif.ARCHIVER and "
			+ "d.lot.don.entite.id = :idEntite ")
	List<Demande> findAllArchiverEtNomCorrespondantByEntiteByIdIfDonneur(@Param("idEntite") Long idEntite);
}
