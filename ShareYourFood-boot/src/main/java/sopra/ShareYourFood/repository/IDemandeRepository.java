package sopra.ShareYourFood.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import sopra.ShareYourFood.model.Demande;



public interface IDemandeRepository extends JpaRepository<Demande, Long> {
	
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
	
	
//	//Requetes Aubeline
//	
//	//Afficher toutes les demandes ayant des messages et le statut ACCEPTER pour l’entite courante
//	@Query("select distinct d from Demande d left join fetch d.message where d.statutNotif = sopra.ShareYourFood.model.StatutNotif.ACCEPTER "
//			+ "and  d.message.id = :id"
//			+ " and d.entite.id = :idEntite")
//	List<Demande> findAllWithMessageAndStatutAccepteByEntiteByIdIfBeneficiaire(@Param("id") Long id);
//	
//	@Query("select distinct d from Demande d left join fetch d.message where d.statutNotif = sopra.ShareYourFood.model.StatutNotif.ACCEPTER "
//			+ "and  d.message.id = :id"
//			+ " d.lot.don.entite.id = :idEntite")
//	List<Demande> findAllWithMessageAndStatutAccepteByEntiteByIdIfDonneur(@Param("id") Long id);
//	
//	//Afficher le nom du lot, nom  demandeur et date demande de toutes les demandes en cours avec le statut EN_ATTENTE
//	@Query("select d.dtDemande, d.lot.nom, d.entite.nom from Demande d where d.statutNotif = sopra.ShareYourFood.model.StatutNotif.EN_ATTENTE and "
//			+ "d.entite.id = :idEntite") //, d.lot.don.entite.nom une seule sortie ? 
//	List<Demande> findAllEnAttenteEtNomLotEtNomDemandeurEtDateDemandeByEntiteByIdIfBeneficiaire(@Param("idEntite") Long idEntite);
//	
//	@Query("select d.dtDemande, d.lot.nom, d.entite.nom from Demande d where d.statutNotif = sopra.ShareYourFood.model.StatutNotif.ACCEPTER and "
//			+ "d.lot.don.entite.id = :idEntite ")
//	List<Demande> findAllEnAttenteEtNomLotEtNomDemandeurEtDateDemandeByEntiteByIdIfDonneur(@Param("idEntite") Long idEntite);
//	
//	//Fin Aube

	
	
	
	
}
