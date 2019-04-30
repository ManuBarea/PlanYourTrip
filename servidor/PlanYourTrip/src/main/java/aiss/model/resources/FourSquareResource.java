package aiss.model.resources;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.logging.Logger;
import org.restlet.data.ChallengeResponse;
import org.restlet.data.ChallengeScheme;
import org.restlet.data.MediaType;
import org.restlet.resource.ClientResource;
import org.restlet.resource.ResourceException;

import aiss.model.flickr.FlickrSearch;
import aiss.model.foursquare.FourSquareSearch;
import aiss.model.foursquare.Response;

public class FourSquareResource {

	private static final Logger log = Logger.getLogger(FourSquareResource.class.getName());

	private final String clientID = "EYKOIPGWMB5HCVDIMN2EKAGMBXATU5ONA1DIJS5LKDSRN2XI";
	private final String clientSecret = "3UUYN5JQB4GVCSTFO225PCE04OHCM2F23QKJO3Y1H53LNWOR";		
	private final String venuesGetURL = "https://api.foursquare.com/v2/venues/search";

	
	//Busca lugares cercanos al parametro introducido
	public FourSquareSearch searchVenues(String query) throws UnsupportedEncodingException  {
		query = URLEncoder.encode(query, "UTF-8");
	
		String url = venuesGetURL + "?client_id=" + clientID +"&client_secret=" + clientSecret
				+"&v=20180323&near=" +query;
		
		//Crear un clienteREsource(url que acabamos de definir)
		ClientResource cr = new ClientResource(url);	
		
		//LLamar al metodo get del CLienteResource 
		FourSquareSearch venueSearch = cr.get(FourSquareSearch.class); //EL contenido del JSON lo deserializa y lo mete en MovieSearch.class

		return venueSearch;
	}

}
