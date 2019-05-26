package aiss.api.model;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;



public class Itinerary {
	
	private String id;
	private String name;
	private List<Venue> venues;
	
	
	public Itinerary() {}
	
	public Itinerary(String name) {
		this.name = name;
	}

	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public List<Venue> getVenues() {
		return venues;
	}
	protected void setItinerary(List<Venue> venues) {
		this.venues = venues;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public Venue getVenue(String id) {
		if (venues==null)
			return null;
		
		Venue venue =null;
		for(Venue v: venues)
			if (v.getId().equals(id))
			{
				venue=v;
				break;
			}
		
		return venue;
	}
	
	public void addVenue(Venue venue) {
		if (venues==null)
			venues = new ArrayList<Venue>();
		venues.add(venue);
	}

	public void deleteVenue(String venueId) {
		Venue v = getVenue(venueId);
		if (v!=null)
			venues.remove(v);
		
	}
	
	
	

}
