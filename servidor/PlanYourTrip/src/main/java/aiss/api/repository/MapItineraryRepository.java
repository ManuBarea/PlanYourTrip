package aiss.api.repository;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.w3c.dom.ls.LSOutput;

import aiss.api.model.User;
import aiss.api.model.Venue;
import aiss.api.model.Itinerary;


public class MapItineraryRepository implements ItineraryRepository{

	Map<User, List<Itinerary>> itineraryPerUserMap;	//Lista de itinerarios por usuario
	Map<String,Itinerary> itineraryMap;
	Map<String,Venue> venueMap;
	private static MapItineraryRepository instance=null;
	private int venueIndex=0;			// Index to create itinerary and venue' identifiers.
	private int itineraryIndex=0;
	private int userIndex=0;
	
	
	public static MapItineraryRepository  getInstance() {
		
		if (instance==null) {
			instance = new MapItineraryRepository ();
			instance.init();
		}
		
		return instance;
	}
	
	public void init() {
		
		itineraryPerUserMap = new HashMap<User,List<Itinerary>>();
		itineraryMap = new HashMap<String,Itinerary>();
		venueMap = new HashMap<String,Venue>();
		
		// Create Venue
		Venue museoA=new Venue("museoA");
		addVenue(museoA);
		Venue museoB=new Venue("museoB");
		addVenue(museoB);
		Venue museoC=new Venue("museoC");
		addVenue(museoC);
		Venue museoD=new Venue("museoD");
		addVenue(museoD);
		
		// Create Itinerary
		Itinerary itinerario1=new Itinerary();
		itinerario1.setName("Museos");
		addItinerary(itinerario1);
		
		Itinerary itinerario2=new Itinerary();
		itinerario2.setName("Museos2");
		addItinerary(itinerario2);
		
		// Add venue to Itinerary
		addVenueToItinerary(itinerario1.getId(), museoA.getId());
		addVenueToItinerary(itinerario1.getId(), museoB.getId());
		
		addVenueToItinerary(itinerario2.getId(), museoC.getId());
		addVenueToItinerary(itinerario2.getId(), museoD.getId());
		
		//Create user
		User usuario1= new User("JohnDoe");
		addUser(usuario1);				
		User usuario2= new User("JaneDoe");
		addUser(usuario2);
		addUserItinerary("JaneDoe",itinerario1.getId());
	}
	//User related operations
	public void addUser(User u) {
		String id = "u" + userIndex++;	
		u.setId(id);
		
		itineraryPerUserMap.put(u,new ArrayList<Itinerary>());
	}
	
	public void addUserItinerary(String username,String itineraryId) {
		Set<User> userSet= itineraryPerUserMap.keySet();
		List<Itinerary> userItinerary =null;
		for(User u:userSet) {
			if (u.getName().equals(username)) {	
				 userItinerary = itineraryPerUserMap.get(u);
				 userItinerary.add(itineraryMap.get(itineraryId));
			}
		}
	}
	public void removeUserItinerary(String username,String itineraryId) {
		Set<User> userSet= itineraryPerUserMap.keySet();
		List<Itinerary> userItinerary =null;
		for(User u:userSet) {
			if (u.getName().equals(username)) {	
				 userItinerary = itineraryPerUserMap.get(u);
				 userItinerary.remove(itineraryMap.get(itineraryId));
			}
		}
	}
	@Override
	public List<Itinerary> getItineraryList(String username) {
		Set<User> userSet= itineraryPerUserMap.keySet();
		List<Itinerary> listaItinerarios = null;
		for(User u:userSet) {
			if (u.getName().equals(username)) {	
				 listaItinerarios = itineraryPerUserMap.get(u);	
			}
		}
		return listaItinerarios;
		
	}
	
	// Itinerary related operations
	@Override
	public void addItinerary(Itinerary i) {
		String id = "i" + itineraryIndex++;	
		i.setId(id);
		itineraryMap.put(id,i);
	}
	
	@Override
	public Collection<Itinerary> getAllItinerary() {
			return itineraryMap.values();
	}

	@Override
	public Itinerary getItinerary(String id) {
		return itineraryMap.get(id);
	}
	
	@Override
	public void updateItinerary(Itinerary i) {
		itineraryMap.put(i.getId(),i);
	}

	@Override
	public void deleteItinerary(String id) {	
		itineraryMap.remove(id);
	}
	

	@Override
	public void addVenueToItinerary(String itineraryId, String venueId) {
		Itinerary itinerary = getItinerary(itineraryId);
		itinerary.addVenue(venueMap.get(venueId));
		
	}

	@Override
	public Collection<Venue> getAll(String itineraryId) {
		return getItinerary(itineraryId).getVenues();
	}

	@Override
	public void removeVenue(String itineraryId, String venueId) {
		getItinerary(itineraryId).deleteVenue(venueId);
	}

	
	// Venue related operations
	
	@Override
	public void addVenue(Venue v) {
		String id = "v" + venueIndex++;
		v.setId(id);
		venueMap.put(id, v);
	}
	
	@Override
	public Collection<Venue> getAllVenues() {
			return venueMap.values();
	}

	@Override
	public Venue getVenue(String venueId) {
		return venueMap.get(venueId);
	}

	@Override
	public void updateVenue(Venue v) {
		Venue venue = venueMap.get(v.getId());
		venue.setName(v.getName());
	}

	@Override
	public void deleteVenue(String venueId) {
		venueMap.remove(venueId);
	}
	
}
