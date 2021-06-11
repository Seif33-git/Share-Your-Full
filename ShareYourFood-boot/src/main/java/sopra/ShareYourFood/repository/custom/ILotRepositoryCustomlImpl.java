package sopra.ShareYourFood.repository.custom;

import java.util.HashMap;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import sopra.ShareYourFood.model.Lot;
import sopra.ShareYourFood.repository.ILotRepositoryCustom;

public class ILotRepositoryCustomlImpl implements ILotRepositoryCustom {

	@PersistenceContext
	private EntityManager em;
	

//	@Override
//	public List<Lot> advanceSearch(String recherche, String codePostal, String ville) {
//		
//		
//		//TODO initialisation query 
//		var jpql = new StringBuilder();
//        jpql.append("from Lot");
//        var parameters = new HashMap<String, Object>();
//		
//		if (!recherche.isEmpty()){
//			jpql.append("left join fetch ProduitLot pl left join fetch Produit p");
//	
//		}
//		
//		
//		
//		jpql.append("where 1=1");
//		
//		if (!recherche.isEmpty()){
//			jpql.append("and p.name = :name");
//			 parameters.put("name", recherche);
//		}
//		if(!codePostal.isEmpty()) {
//			jpql.append("and l.don.adresse.codepostal = :codepostal");
//			parameters.put("codepostal", codePostal);
//		}
//		
//		if(!ville.isEmpty()) {
//			jpql.append("and l.don.adresse.ville = :ville");
//			parameters.put("ville", ville);
//		}
//		
//		
//		TypedQuery<Lot> query = em.createQuery(jpql.toString(), Lot.class);
//		parameters.forEach((key, value) -> query.setParameter(key, value));
//		return query.getResultList();
//	}

	
	
}
