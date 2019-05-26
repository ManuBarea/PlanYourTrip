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

import aiss.api.model.Venue;
import aiss.api.repository.ItineraryRepository;
import aiss.api.repository.MapItineraryRepository;


@Path("/venues")
public class VenueResource {
	public static VenueResource _instance=null;
	ItineraryRepository repository;
	
	private VenueResource(){
		repository=MapItineraryRepository.getInstance();
	}
	
	public static VenueResource getInstance()
	{
		if(_instance==null)
			_instance=new VenueResource();
		return _instance; 
	}
	
	@GET
	@Produces("application/json")
	public Collection<Venue> getAll()
	{
		return repository.getAllVenues();
	}
	
	@GET
	@Path("/{id}")
	@Produces("application/json")
	public Venue get(@PathParam("id") String venueId)
	{
		
		return repository.getVenue(venueId);
	}
	
	@POST
	@Consumes("application/json")
	@Produces("application/json")
	public Response addVenue(@Context UriInfo uriInfo, Venue venue) {
		if (venue.getName() == null || "".equals(venue.getName()))
			throw new BadRequestException("The name of the Venue must not be null");
		repository.addVenue(venue);
		
		UriBuilder ub = uriInfo.getAbsolutePathBuilder().path(this.getClass(), "get");
		URI uri = ub.build(venue.getId());
		ResponseBuilder resp = Response.created(uri);
		resp.entity(venue);			
		return resp.build();
	}
	
	
	@PUT
	@Consumes("application/json")
	public Response updateVenue(Venue venue) {
		Venue oldVenue = repository.getVenue(venue.getId());
		if (oldVenue == null) {
			throw new NotFoundException("The Vnue with id="+ venue.getId() +" was not found");			
		}
		// Update name
		if (venue.getName()!=null)
			oldVenue.setName(venue.getName());
		
		return Response.noContent().build();
	}
	
	@DELETE
	@Path("/{id}")
	public Response removeVenue(@PathParam("id") String venueId) {
		Venue toberemoved=repository.getVenue(venueId);
		if (toberemoved == null)
			throw new NotFoundException("The venue with id="+ venueId +" was not found");
		else
			repository.deleteVenue(venueId);
		
		return Response.noContent().build();
	}
}
