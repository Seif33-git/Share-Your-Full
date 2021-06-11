package sopra.ShareYourFood.service;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.util.StringUtils;

import sopra.ShareYourFood.model.Utilisateur;

public class CustomUserDetails implements UserDetails {

	private static final long serialVersionUID = 1L;
	private Utilisateur utilisateur;

	public CustomUserDetails(Utilisateur utilisateur) {
		super();
		this.utilisateur = utilisateur;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return AuthorityUtils
				.commaSeparatedStringToAuthorityList(StringUtils.collectionToCommaDelimitedString(utilisateur.getStringRoles()));
	}

	@Override
	public String getPassword() {
		return new BCryptPasswordEncoder().encode(utilisateur.getMotDePasse());
	}

	@Override
	public String getUsername() {
		return utilisateur.getPseudo();
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return utilisateur.isEnable();
	}

}
