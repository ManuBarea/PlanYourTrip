package aiss.api.resources;

import java.net.URI;
import java.util.Collection;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriBuilder;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.jboss.resteasy.spi.BadRequestException;
import org.jboss.resteasy.spi.NotFoundException;

import aiss.api.model.Itinerary;
import aiss.api.model.Venue;
import aiss.api.repository.ItineraryRepository;
import aiss.api.repository.MapItineraryRepository;




@Path("/itineraries")
public class ItineraryResource {
	
	/* Singleton */
	private static ItineraryResource _instance=null;
	ItineraryRepository repository;
	
	private ItineraryResource() {
		repository= MapItineraryRepository.getInstance();

	}
	public static ItineraryResource getInstance()
	{
		if(_instance==null)
				_instance=new ItineraryResource();
		return _instance;
	}
	

	@GET
	@Produces("application/json")
	public Collection<Itinerary> getAll()
	{
		return repository.getAllItinerary();
	}
	
	@GET
	@Path("/{id}")
	@Produces("application/json")
	public Itinerary getItinerary(@PathParam("id") String id)
	{
		Itinerary it = repository.getItinerary(id);
		
		if (it == null) {
			throw new NotFoundException("The itinerary wit id="+ id +" was not found");			
		}
		
		return it;
	}
	
	@POST
	@Consumes("application/json")
	@Produces("application/json")
	public Response addItinerary(@Context UriInfo uriInfo, Itinerary itinerary) {
		if (itinerary.getName() == null || "".equals(itinerary.getName()))
			throw new BadRequestException("The name of the itinerary must not be null");
		
		if (itinerary.getVenues()!=null)
			throw new BadRequestException("The itinerary property is not editable.");

		repository.addItinerary(itinerary);

		// Builds the response. Returns the playlist the has just been added.
		UriBuilder ub = uriInfo.getAbsolutePathBuilder().path(this.getClass(), "get");
		URI uri = ub.build(itinerary.getId());
		ResponseBuilder resp = Response.created(uri);
		resp.entity(itinerary);			
		return resp.build();
	}
	
	@PUT
	@Consumes("application/json")
	public Response updateItinerary(Itinerary itinerary) {
		Itinerary oldItinerary = repository.getItinerary(itinerary.getId());
		if (oldItinerary == null) {
			throw new NotFoundException("The itinerary with id="+ itinerary.getId() +" was not found");			
		}
		
		if (itinerary.getVenues()!=null)
			throw new BadRequestException("The itinerary property is not editable.");
		
		// Update name
		if (itinerary.getName()!=null)
			oldItinerary.setName(itinerary.getName());
	
		
		return Response.noContent().build();
	}
	
	@DELETE
	@Path("/{id}")
	public Response removeItinerary(@PathParam("id") String id) {
		Itinerary toberemoved=repository.getItinerary(id);
		if (toberemoved == null)
			throw new NotFoundException("The itinerary with id="+ id +" was not found");
		else
			repository.deleteItinerary(id);
		
		return Response.noContent().build();
	}
	
	@POST	
	@Path("/{itineraryId}/{venueId}")
	@Consumes("text/plain")
	@Produces("application/json")
	public Response addVenueToItinerary(@Context UriInfo uriInfo,@PathParam("itineraryId") String itineraryId, @PathParam("venueId") String venueId)
	{				
		
		Itinerary itinerary = repository.getItinerary(itineraryId);
		Venue venue = repository.getVenue(venueId);
		
		if (itinerary==null)
			throw new NotFoundException("The itinerary with id=" + itineraryId + " was not found");
		
		if (venue == null)
			throw new NotFoundException("The venue with id=" + venueId + " was not found");
		
		if (itinerary.getVenue(venueId)!=null)
			throw new BadRequestException("The venue is already included in the playlist.");
			
		repository.addVenueToItinerary(itineraryId, venueId);		

		// Builds the response
		UriBuilder ub = uriInfo.getAbsolutePathBuilder().path(this.getClass(), "get");
		URI uri = ub.build(itineraryId);
		ResponseBuilder resp = Response.created(uri);
		resp.entity(itinerary);			
		return resp.build();
	}
	
	@DELETE
	@Path("/{itineraryId}/{venueId}")
	public Response removeVenue(@PathParam("itineraryId") String itineraryId,  @PathParam("venueId") String venueId) {
		Itinerary itinerary = repository.getItinerary(itineraryId);
		Venue venue = repository.getVenue(venueId);
		
		if (itinerary==null)
			throw new NotFoundException("The itinerary with id=" + itineraryId + " was not found");
		
		if (venue == null)
			throw new NotFoundException("The venue with id=" + venueId + " was not found");
		
		
		repository.removeVenue(itineraryId, venueId);		
		
		return Response.noContent().build();
	}
}
