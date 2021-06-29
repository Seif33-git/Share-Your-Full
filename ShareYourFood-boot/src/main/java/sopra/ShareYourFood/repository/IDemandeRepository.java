package sopra.ShareYourFood.repository;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
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
	
	
	//Requetes Aubeline
	
	//Afficher toutes les demandes ayant des messages et le statut ACCEPTER pour l’entite courante
	@Query("select distinct d from Message m join m.demande d where d.statutNotif = sopra.ShareYourFood.model.StatutNotif.ACCEPTER "
			+ " and d.entite.id = :idEntite")
	List<Demande> findAllWithMessageAndStatutAccepteByEntiteByIdIfBeneficiaire(@Param("idEntite") Long idEntite);
	
	@Query("select distinct d from Message m join m.demande d where d.statutNotif = sopra.ShareYourFood.model.StatutNotif.ACCEPTER "
			+ " and d.lot.don.entite.id = :idEntite")
	List<Demande> findAllWithMessageAndStatutAccepteByEntiteByIdIfDonneur(@Param("idEntite") Long idEntite);
	
	
	//Afficher le nom du lot, nom  demandeur et date demande de toutes les demandes en cours avec le statut EN_ATTENTE
	@Query("select distinct l.nom, d.dtDemande, e.nom, e.prenom from Demande d join d.lot l join d.entite e where d.statutNotif = sopra.ShareYourFood.model.StatutNotif.EN_ATTENTE and "
			+ "d.entite.id = :idEntite")
	Object[] findAllEnAttenteEtNomLotEtNomDemandeurEtDateDemandeByEntiteByIdIfBeneficiaire(@Param("idEntite") Long idEntite);
	
	@Query("select distinct l.nom, d.dtDemande, e.nom, e.prenom from Demande d join d.lot l join d.entite e where d.statutNotif = sopra.ShareYourFood.model.StatutNotif.EN_ATTENTE and "
			+ "d.lot.don.entite.id = :idEntite")
	Object[] findAllEnAttenteEtNomLotEtNomDemandeurEtDateDemandeByEntiteByIdIfDonneur(@Param("idEntite") Long idEntite);
	
	//avec contenu message en plus
	
	@Query("select distinct l.nom, d.dtDemande, m.contenu from Demande d join d.lot l join d.message m where d.statutNotif = sopra.ShareYourFood.model.StatutNotif.EN_ATTENTE and "
			+ "d.lot.don.entite.id = :idEntite")
	Object[] findAllEnAttenteEtNomLotEtDateDemandeEtMessageByEntiteByIdIfDonneur(@Param("idEntite") Long idEntite);
	
	@Query("select distinct l.nom, d.dtDemande, m.contenu from Demande d join d.lot l join d.message m where d.statutNotif = sopra.ShareYourFood.model.StatutNotif.EN_ATTENTE and "
			+ "d.entite.id = :idEntite")
	Object[] findAllEnAttenteEtNomLotEtDateDemandeEtMessageByEntiteByIdIfBeneficiaire(@Param("idEntite") Long idEntite);
	
	//Fin Aube
	
	@Query("select distinct d from Demande d where d.lot.statut <> sopra.ShareYourFood.model.Statut.DONNE "
			+ "and (d.statutNotif = sopra.ShareYourFood.model.StatutNotif.ACCEPTER or d.statutNotif = sopra.ShareYourFood.model.StatutNotif.EN_ATTENTE)"
			+ " and d.entite.id = :id")
	List<Demande> findAllNonDonneEtDemandeAccOuPasRepByEntiteById(@Param("id") Long id);
	
//	@Query("select distinct d from Demande d where d.lot.statut = sopra.ShareYourFood.model.Statut.DONNE "
//			+ "and  d.statutNotif = sopra.ShareYourFood.model.StatutNotif.ARCHIVER"
//			+ " and d.entite.id = :id")
//	List<Demande> findAllDonneEtDemandeArchiveeByEntiteById(@Param("id") Long id);
	
	//DASHBOARD DONNEUR
	@Transactional
	@Modifying
	@Query("UPDATE Demande d SET d.statutNotif = sopra.ShareYourFood.model.StatutNotif.ACCEPTER WHERE d.lot.id = :idLot")
	void setDemandeAcceptee(@Param("idLot") Long idLot);
	
	
	@Transactional
	@Modifying
	@Query("UPDATE Demande d SET d.statutNotif = sopra.ShareYourFood.model.StatutNotif.REFUSER WHERE d.lot.id = :idLot")
	void setDemandeRefusee(@Param("idLot") Long idLot);
	
	
	@Query("select d.lot.don.entite.nom from Demande d where d.id = :id")
	Optional<String> findNomEntiteByDemandeId(@Param("id") Long id);
	
	@Query("select distinct d from Demande d where d.lot.statut = sopra.ShareYourFood.model.Statut.DONNE "
			+ "and  d.statutNotif = sopra.ShareYourFood.model.StatutNotif.ARCHIVER"
			+ " and d.entite.id = :id")
	List<Demande> findAllDonneEtDemandeArchiveeByEntiteById(@Param("id") Long id);
	
	
}
