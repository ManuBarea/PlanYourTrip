package aiss.api.repository;

import java.util.Collection;
import java.util.List;

import aiss.api.model.Itinerary;
import aiss.api.model.User;
import aiss.api.model.Venue;


public interface ItineraryRepository {
	
	
	// Operaciones sobre Venue
	public void addVenue(Venue v);
	public Collection<Venue> getAllVenues();
	public Venue getVenue(String venueId);
	public void updateVenue(Venue s);
	public void deleteVenue(String venueId);
	
	// Map< String,Itinerary
	public void addItinerary(Itinerary i);
	public Collection<Itinerary> getAllItinerary();
	public Itinerary getItinerary(String itineraryId);
	public void updateItinerary(Itinerary i);
	public void deleteItinerary(String itineraryId);
	public Collection<Venue> getAll(String itineraryId);
	public void addVenueToItinerary(String itineraryId, String venueId);
	public void removeVenue(String itineraryId, String venueId);
	
	// Map< User,List<Itinerary>
	List<Itinerary> getItineraryList(String username); 
	public void addUserItinerary(String username,String itineraryId);
	public void removeUserItinerary(String username,String itineraryId);

	
	
	
	

}
