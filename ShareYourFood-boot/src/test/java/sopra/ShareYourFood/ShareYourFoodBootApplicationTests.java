package sopra.ShareYourFood;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import sopra.ShareYourFood.model.Adresse;
import sopra.ShareYourFood.model.Association;
import sopra.ShareYourFood.model.Categorie;
import sopra.ShareYourFood.model.Demande;
import sopra.ShareYourFood.model.Destinataire;
import sopra.ShareYourFood.model.Don;
import sopra.ShareYourFood.model.Entite;
import sopra.ShareYourFood.model.Entreprise;
import sopra.ShareYourFood.model.Lot;
import sopra.ShareYourFood.model.Message;
import sopra.ShareYourFood.model.Particulier;
import sopra.ShareYourFood.model.Produit;
import sopra.ShareYourFood.model.ProduitLot;
import sopra.ShareYourFood.model.Role;
import sopra.ShareYourFood.model.Statut;
import sopra.ShareYourFood.model.StatutNotif;
import sopra.ShareYourFood.model.Type;
import sopra.ShareYourFood.model.Utilisateur;
import sopra.ShareYourFood.model.UtilisateurRole;
import sopra.ShareYourFood.repository.IAdresseRepository;
import sopra.ShareYourFood.repository.IDemandeRepository;
import sopra.ShareYourFood.repository.IDonRepository;
import sopra.ShareYourFood.repository.IEntiteRepository;
import sopra.ShareYourFood.repository.ILotRepository;
import sopra.ShareYourFood.repository.IMessageRepository;
import sopra.ShareYourFood.repository.IProduitLotRepository;
import sopra.ShareYourFood.repository.IProduitRepository;
import sopra.ShareYourFood.repository.IUtilisateurRepository;
import sopra.ShareYourFood.repository.IUtilisateurRoleRepository;

@SpringBootTest
class ShareYourFoodBootApplicationTests {
	
	@Autowired
	private IAdresseRepository adresseRepo;
	
	@Autowired
	private IDemandeRepository demandeRepo;
	
	@Autowired
	private IDonRepository donRepo;
	
	@Autowired
	private IEntiteRepository entiteRepo;
	
	@Autowired
	private ILotRepository lotRepo;
	
	@Autowired
	private IMessageRepository messageRepo;
	
	@Autowired
	private IProduitLotRepository produitLotRepo;
	
	@Autowired
	private IProduitRepository produitRepo;
	
	@Autowired
	private IUtilisateurRepository utilisateurRepo;
	
	@Autowired
	private IUtilisateurRoleRepository utilisateurRoleRepo;

	@Test
	void contextLoads() throws ParseException {
		
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
		
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// CREATION OBJETS /////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
		// UTILISATEURROLE
		
		UtilisateurRole donneur = new UtilisateurRole();
		donneur.setRole(Role.DONNEUR);
		
		
		// UTILISATEURS
		
		Utilisateur cocoDu06 = new Utilisateur("Coco_du_06", "cocodu06@gmail.com","azerty", true);
		
		Utilisateur toto65 = new Utilisateur();
		toto65.setPseudo("Toto65");
		toto65.setMotDePasse("azerty123");
		toto65.setMail("toto65@gmail.com");
		toto65.setMessagerieActivation(true);
		
		Utilisateur aube = new Utilisateur();
		aube.setPseudo("Aube");
		aube.setMotDePasse("azerty1234");
		aube.setMail("aubeline.pecque@hotmail.com");
		aube.setMessagerieActivation(true);
		
		Utilisateur sarahCze = new Utilisateur();
		sarahCze.setPseudo("SarahCZE");
		sarahCze.setMotDePasse("azerty12345");
		sarahCze.setMail("sarah.caze@hotmail.com");
		sarahCze.setMessagerieActivation(true);
		
		
		// ENTITES
		Particulier aubeline = new Particulier("aubeline", 28);
		aubeline.setNom("PECQUE");
		aubeline.setDonneur(true);
		aubeline.setBeneficiaire(false);
		
		Particulier sarah = new Particulier("sarah", 25);
		sarah.setNom("CAZE");
		sarah.setDonneur(true);
		sarah.setBeneficiaire(false);
		
		Particulier regis = new Particulier("regis", 25);
		regis.setNom("SIMON");
		regis.setDonneur(false);
		regis.setBeneficiaire(true);
		
		Association CroixRouge = new Association("FR123456789", "justificatif1");
		CroixRouge.setNom("La Croix Rouge");
		CroixRouge.setDonneur(true);
		CroixRouge.setBeneficiaire(true);
		
		Association DonPourTous = new Association("FR987654321", "justificatif2");
		DonPourTous.setNom("Dons pour tous");
		DonPourTous.setDonneur(false);
		DonPourTous.setBeneficiaire(true);
		
		Entreprise Leclerc = new Entreprise("5486935JH14S", Categorie.GRANDE_SURFACE);
		Leclerc.setNom("Leclerc");
		Leclerc.setDonneur(true);
		Leclerc.setBeneficiaire(false);
		
		
		// ADRESSES
		Adresse adrSarahCze = new Adresse("75 rue d'Athènes", "bis", "33000", "Bordeaux");
		Adresse adrCroixRouge = new Adresse();
		adrCroixRouge.setRue("9 avenue de Gambetta");
		adrCroixRouge.setComplement(null);
		adrCroixRouge.setCodePostal("13001");
		adrCroixRouge.setVille("Marseille");
		Adresse adrDonPourTous = new Adresse("277 boulevard Leon Blum", "Bâtiment C", "75004", "Paris");
		Adresse adrLeclerc = new Adresse("50 avenue Gutemberg", "Zone commerciale Soleil", "33700", "Mérignac");
		Adresse adrRegis = new Adresse("3 avenue Molière", null, "33000", "Bordeaux");
		
		
		// DON
		Don donLeclerc = new Don();
		try {
			donLeclerc.setDateDeMiseEnLigne(sdf.parse("02/09/2020"));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		donLeclerc.setCreneau("13h à 15h");
		donLeclerc.setCommentaire("DLC à peine passée, mais encore en bon état");
		donLeclerc.setDestinataire(Destinataire.ASSOCIATION);
		
		
		// LOT
		Lot chocolat = new Lot();
		chocolat.setNom("Chocolat");
		try {
			chocolat.setDtPeremptionLot(sdf.parse("05/07/2022"));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		chocolat.setPhoto("djvbv/didz/yugi");
		chocolat.setVolume((long) 50);
		chocolat.setStatut(Statut.DISPONIBLE);
		
		
		Lot pain = new Lot();
		pain.setNom("Pain");
		try {
			pain.setDtPeremptionLot(sdf.parse("20/05/2023"));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		pain.setPhoto("ouoio/ju/hh");
		pain.setVolume((long) 25);
		pain.setStatut(Statut.DISPONIBLE);
		
		
		// DEMANDE
		Demande demandeDonPourTous = new Demande();
		try {
			demandeDonPourTous.setDtDemande(sdf.parse("22/05/2021"));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		demandeDonPourTous.setStatutNotif(StatutNotif.ACCEPTER);
		
		Demande demandeRegis = new Demande();
		try {
			demandeRegis.setDtDemande(sdf.parse("01/06/2021"));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		demandeRegis.setStatutNotif(StatutNotif.ACCEPTER);
		
		
		
		// MESSAGES
		sopra.ShareYourFood.model.Message messageDonPourTousLeclerc = new sopra.ShareYourFood.model.Message();
		messageDonPourTousLeclerc.setContenu("Bonjour, Don Pour Tous souhaiterai bénéficier de ce don. Nous vous remercions par avance.");
		messageDonPourTousLeclerc.setDonneur(false);
		messageDonPourTousLeclerc.setDtEnvoi(sdf.parse("23/05/2021"));
		
		sopra.ShareYourFood.model.Message messageLeclercDonPourTous = new sopra.ShareYourFood.model.Message();
		messageLeclercDonPourTous.setContenu("Bien volontiers");
		messageLeclercDonPourTous.setDonneur(true);
		messageLeclercDonPourTous.setDtEnvoi(sdf.parse("24/05/2021"));
		
		
		sopra.ShareYourFood.model.Message messageRegis = new sopra.ShareYourFood.model.Message();
		messageRegis.setContenu("Bonjour, est-il possible de disposer de chocolat ? Bien à vous");
		messageRegis.setDonneur(false);
		messageRegis.setDtEnvoi(sdf.parse("02/06/2021"));
		
		sopra.ShareYourFood.model.Message messageLeclercRegis = new sopra.ShareYourFood.model.Message();
		messageLeclercRegis.setContenu("Bien sur");
		messageLeclercRegis.setDonneur(true);
		messageLeclercRegis.setDtEnvoi(sdf.parse("03/06/2021"));
		
		// PRODUITLOT
		ProduitLot chocolatNoirLot1 = new ProduitLot();
		chocolatNoirLot1.setQuantite(1000L);
		chocolatNoirLot1.setDtPeremption(sdf.parse("02/02/2022"));
		
		ProduitLot croissantLot4 = new ProduitLot();
		croissantLot4.setQuantite(200L);
		croissantLot4.setDtPeremption(sdf.parse("30/08/2021"));
		
		//PRODUIT
		Produit chocolatNoir = new Produit();
		chocolatNoir.setNom("chocolat noir");
		chocolatNoir.setType(Type.EPICERIE_SUCREE);
		
		Produit croissant = new Produit();
		croissant.setNom("croissant");
		croissant.setType(Type.PAIN_PATISSERIE);
		
		
		
		
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// CREATION BDD ////////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
		// UTILISATEURROLE
		utilisateurRoleRepo.save(donneur);
		
		// UTILISATEUR
		utilisateurRepo.save(cocoDu06);
		utilisateurRepo.save(toto65);
		utilisateurRepo.save(aube);
		utilisateurRepo.save(sarahCze);
		
		// LIEN UTILISATEURROLE UTILISATEUR
		donneur.setUser(cocoDu06);
		utilisateurRoleRepo.save(donneur);
		
		
		// ENTITES
		entiteRepo.save(aubeline);
		entiteRepo.save(sarah);
		entiteRepo.save(regis);
		entiteRepo.save(CroixRouge);
		entiteRepo.save(DonPourTous);
		entiteRepo.save(Leclerc);
		
		// LIEN UTILISATEUR ENTITE
		aube.setEntite(aubeline);
		sarahCze.setEntite(sarah);
		toto65.setEntite(CroixRouge);
		cocoDu06.setEntite(Leclerc);
		
		utilisateurRepo.save(cocoDu06);
		utilisateurRepo.save(toto65);
		utilisateurRepo.save(aube);
		utilisateurRepo.save(sarahCze);
		
		
		// ADRESSES
		adresseRepo.save(adrSarahCze);
		adresseRepo.save(adrCroixRouge);
		adresseRepo.save(adrDonPourTous);
		adresseRepo.save(adrLeclerc);
		adresseRepo.save(adrRegis);
		
		
		// LIEN ENTITE ADRESSE
		adrSarahCze.setEntite(sarah);
		adrCroixRouge.setEntite(CroixRouge);
		adrDonPourTous.setEntite(DonPourTous);
		adrLeclerc.setEntite(Leclerc);
		adrRegis.setEntite(regis);
		
		adresseRepo.save(adrSarahCze);
		adresseRepo.save(adrCroixRouge);
		adresseRepo.save(adrDonPourTous);
		adresseRepo.save(adrLeclerc);
		adresseRepo.save(adrRegis);
		
		
		// DON
		donRepo.save(donLeclerc);
		
		// LIEN DON ADRESSE + ENTITE
		donLeclerc.setAdresse(adrLeclerc);

		donLeclerc.setEntite(Leclerc);
		
		donRepo.save(donLeclerc);
		
		
		// LOTS
		lotRepo.save(chocolat);
		lotRepo.save(pain);
		
		
		// LIEN LOT DON
		chocolat.setDon(donLeclerc);
		pain.setDon(donLeclerc);
		
		lotRepo.save(chocolat);
		lotRepo.save(pain);
		
		// DEMANDE
		demandeRepo.save(demandeRegis);
		demandeRepo.save(demandeDonPourTous);
		
		//LIEN DEMANDE ENTITE + LOT
		demandeDonPourTous.setEntite(DonPourTous);
		demandeRegis.setEntite(regis);
		
		demandeDonPourTous.setLot(pain);
		demandeRegis.setLot(chocolat);
		
		demandeRepo.save(demandeRegis);
		demandeRepo.save(demandeDonPourTous);
		
		// MESSAGES
		messageRepo.save(messageDonPourTousLeclerc);
		messageRepo.save(messageLeclercDonPourTous);
		messageRepo.save(messageRegis);
		messageRepo.save(messageLeclercRegis);
		
		// LIEN MESSAGE DEMANDE
		messageDonPourTousLeclerc.setDemande(demandeDonPourTous);
		messageLeclercDonPourTous.setDemande(demandeDonPourTous);
		messageRegis.setDemande(demandeRegis);
		messageLeclercRegis.setDemande(demandeRegis);
		
		messageRepo.save(messageDonPourTousLeclerc);
		messageRepo.save(messageLeclercDonPourTous);
		messageRepo.save(messageRegis);
		messageRepo.save(messageLeclercRegis);
		
		//PRODUITLOT
		produitLotRepo.save(chocolatNoirLot1);
		produitLotRepo.save(croissantLot4);
				
		//PRODUIT
		produitRepo.save(chocolatNoir);
		produitRepo.save(croissant);
				
		//LIEN PRODUITLOT PRODUIT + LOT
		chocolatNoirLot1.setProduit(chocolatNoir);
		chocolatNoirLot1.setLot(chocolat);
				
		croissantLot4.setProduit(croissant);
		croissantLot4.setLot(pain);
				
		produitLotRepo.save(chocolatNoirLot1);
		produitLotRepo.save(croissantLot4);
		
		
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// TESTS ////////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
		
		//UTILISATEUR
		Optional<Utilisateur> uFind = utilisateurRepo.findById(cocoDu06.getId());
		assertEquals("Coco_du_06", uFind.get().getPseudo());
		assertEquals("azerty", uFind.get().getMotDePasse());
		assertEquals("cocodu06@gmail.com", uFind.get().getMail());
		assertEquals(true, uFind.get().getMessagerieActivation());
		assertEquals(Leclerc.getId(), uFind.get().getEntite().getId());
		
		List<Utilisateur> utilisateurs=utilisateurRepo.findAll();
		assertEquals(4, utilisateurs.size());
		
		//ENTITE
		Optional<Entite> entiteFind = entiteRepo.findById(Leclerc.getId());
		assertEquals("Leclerc", entiteFind.get().getNom());
		assertEquals(true, entiteFind.get().isDonneur());
		assertEquals(false, entiteFind.get().isBeneficiaire());
		
//		Entreprise Leclerc = new Entreprise("5486935JH14S", Categorie.GRANDE_SURFACE);
//		Leclerc.setNom("Leclerc");
//		Leclerc.setDonneur(true);
//		Leclerc.setBeneficiaire(false);

		
		//ADRESSE
		Optional<Adresse> adrfind = adresseRepo.findById(adrLeclerc.getId());
		assertEquals("50 avenue Gutemberg", adrfind.get().getRue());
		assertEquals("Zone commerciale Soleil", adrfind.get().getComplement());
		assertEquals("33700", adrfind.get().getCodePostal());
		assertEquals("Mérignac", adrfind.get().getVille());
		assertEquals(Leclerc.getId(), adrfind.get().getEntite().getId());
		

		
		//DON
		Optional<Don> donFind = donRepo.findById(donLeclerc.getId());
		assertEquals(sdf.parse("02/09/2020"), donFind.get().getDateDeMiseEnLigne());
		assertEquals("13h à 15h", donFind.get().getCreneau());
		assertEquals("DLC à peine passée, mais encore en bon état", donFind.get().getCommentaire());
		assertEquals(Destinataire.ASSOCIATION, donFind.get().getDestinataire());
		assertEquals(adrLeclerc.getId(), donFind.get().getAdresse().getId());
		assertEquals(Leclerc.getId(), donFind.get().getEntite().getId());
		
		
		// LOT
		Optional<Lot> lotFind = lotRepo.findById(pain.getId());
		assertEquals("Pain", lotFind.get().getNom());
		assertEquals(sdf.parse("20/05/2023"), lotFind.get().getDtPeremptionLot());
		assertEquals("ouoio/ju/hh", lotFind.get().getPhoto());
		assertEquals((long) 25, lotFind.get().getVolume());
		assertEquals(Statut.DISPONIBLE, lotFind.get().getStatut());
		assertEquals(donLeclerc.getId(), lotFind.get().getDon().getId());
		
		// DEMANDE
		Optional<Demande> demandeFind = demandeRepo.findById(demandeDonPourTous.getId());
		
		try {
			assertEquals(sdf.parse("22/05/2021"), demandeFind.get().getDtDemande());
		} catch (ParseException e) {
			e.printStackTrace();
		}
		assertEquals(StatutNotif.ACCEPTER, demandeFind.get().getStatutNotif());
		assertEquals(DonPourTous.getId(), demandeFind.get().getEntite().getId());
		assertEquals(pain.getId(), demandeFind.get().getLot().getId());
		
		// MESSAGE
		Optional<Message> messagefind = messageRepo.findById(messageDonPourTousLeclerc.getId());
		assertEquals("Bonjour, Don Pour Tous souhaiterai bénéficier de ce don. Nous vous remercions par avance.", messagefind.get().getContenu());
		assertEquals(false, messagefind.get().getDonneur());
		assertEquals(sdf.parse("23/05/2021"), messagefind.get().getDtEnvoi());
		assertEquals(demandeDonPourTous.getId(), messagefind.get().getDemande().getId());
		
		// PRODUITLOT
		Optional<ProduitLot> produitLotfind = produitLotRepo.findById(chocolatNoirLot1.getId());
		assertEquals(sdf.parse("02/02/2022"), produitLotfind.get().getDtPeremption());
		assertEquals(1000L, produitLotfind.get().getQuantite());
		assertEquals(chocolatNoir.getNom(), produitLotfind.get().getProduit().getNom());
		assertEquals(chocolat.getId(), produitLotfind.get().getLot().getId());
		
		// PRODUIT
		Optional<Produit> produitFind = produitRepo.findById(chocolatNoir.getNom());
		assertEquals("chocolat noir", produitFind.get().getNom());
		assertEquals(Type.EPICERIE_SUCREE, produitFind.get().getType());
		
		
	
	}
	
	

}
