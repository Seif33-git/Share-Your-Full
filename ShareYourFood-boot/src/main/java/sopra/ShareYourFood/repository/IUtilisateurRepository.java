package sopra.ShareYourFood.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import sopra.ShareYourFood.model.Utilisateur;

public interface IUtilisateurRepository extends JpaRepository<Utilisateur, Long>{
	
	@Query("select distinct u from Utilisateur u left join fetch u.roles where u.pseudo = :pseudo")
	Optional<Utilisateur> findByIdWithRoles(@Param("pseudo") String pseudo);
	
	@Query("select distinct u from Utilisateur u left join fetch u.entite where u.id = :id")
	Optional<Utilisateur> findByIdWithEntite(Long id);
	
	@Query("select distinct u from Utilisateur u left join fetch u.entite")
	List<Utilisateur> findAllWithEntite();

}
