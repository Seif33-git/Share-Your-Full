package sopra.ShareYourFood.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import sopra.ShareYourFood.model.Compteur;

public interface ICompteurRepository extends JpaRepository<Compteur, Long> {
	@Query("select c from Compteur c")
	Compteur findUnique();
}
