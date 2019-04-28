package aiss.model.resources;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.restlet.resource.ClientResource;

import aiss.controller.SearchController;
import aiss.model.flickr.FlickrSearch;

public class FlickrResource {

	private static final String FLICKR_API_KEY = "2afb5fa52d755e0e081b54614956d169"; // 4160675e20b0f4b9

	private static final Logger log = Logger.getLogger(FlickrResource.class.getName());

	public FlickrSearch getFlickrPhotos(String artist) throws UnsupportedEncodingException {

		artist = URLEncoder.encode(artist, "UTF-8");
		// https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=
		// 6435&tags=loquesea&page=1&format=json&nojsoncallback=1
		String url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=" + FLICKR_API_KEY
				+ "&tags=" + artist + "&per_page=5&page=1&format=json&nojsoncallback=1";

		// Crear un clienteREsource(url que acabamos de definir)
		ClientResource cr = new ClientResource(url);

		// LLamar al metodo get del CLienteResource y deserializar
		// Se usa la clase de MovieSearch.class
		FlickrSearch photoSearch = cr.get(FlickrSearch.class); // EL contenido del JSON lo deserializa y lo mete en
																// MovieSearch.class

		// devolver los datos
		return photoSearch;
	}

}
