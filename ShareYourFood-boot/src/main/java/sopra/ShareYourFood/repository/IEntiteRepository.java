package sopra.ShareYourFood.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import sopra.ShareYourFood.model.Association;
import sopra.ShareYourFood.model.Entite;
import sopra.ShareYourFood.model.Entreprise;
import sopra.ShareYourFood.model.Particulier;


public interface IEntiteRepository extends JpaRepository<Entite, Long>{

	List<Particulier> findAllParticulier(); // NamedQuery : Particulier.findAllParticulier
	
	List<Association> findAllAssociation(); // NamedQuery : Association.findAllAssociation
	
	List<Entreprise> findAllEntreprise(); // NamedQuery : Entreprise.findAllEntreprise
	
	@Query("select e from Entreprise e where e.id = :id")
	Optional<Entreprise> findEntrepriseById(@Param("id") Long id);
	
	@Query("select a from Association a where a.id = :id")
	Optional<Association> findAssociationById(@Param("id") Long id);
	
	@Query("select p from Particulier p where p.id = :id")
	Optional<Particulier> findParticulierById(@Param("id") Long id);

	
}
