package sopra.ShareYourFood.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import sopra.ShareYourFood.model.Utilisateur;
import sopra.ShareYourFood.repository.IUtilisateurRepository;

@Service
public class CustomUserDetailService implements UserDetailsService {

	@Autowired
	private IUtilisateurRepository utilisateurRepo;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<Utilisateur> opt = utilisateurRepo.findByIdWithRoles(username);

		if (opt.isPresent()) {
			return new CustomUserDetails(opt.get());
		} else {
			throw new UsernameNotFoundException(username + " Inconnu");
		}
	}

}
