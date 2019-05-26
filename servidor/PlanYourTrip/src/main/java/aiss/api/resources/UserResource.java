package aiss.api.resources;

import java.net.URI;
import java.util.Collection;
import java.util.List;

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




@Path("/usertineraries")
public class UserResource {
	
	/* Singleton */
	private static UserResource _instance=null;
	ItineraryRepository repository;
	
	private UserResource() {
		repository= MapItineraryRepository.getInstance();

	}
	public static UserResource getInstance()
	{
		if(_instance==null)
				_instance=new UserResource();
		return _instance;
	}
	
	@GET
	@Path("/{name}")
	@Produces("application/json")
	public List<Itinerary> get(@PathParam("name") String name)
	{
		List<Itinerary> listaItinerarios = repository.getItineraryList(name);
		
		if (listaItinerarios == null) {
			throw new NotFoundException("The user wit name="+ name +" was not found");			
		}
		if(listaItinerarios.size()== 0) {
			throw new NotFoundException("The user with name="+ name +" has not itineraries");
		}
		
		return listaItinerarios;
	}
	
	@POST	
	@Path("/{username}/{itineraryId}")
	@Consumes("text/plain")
	@Produces("application/json")
	public Response addUserItinerary(@Context UriInfo uriInfo,@PathParam("username") String username, @PathParam("itineraryId") String itineraryId)
	{				
		
		List<Itinerary> listaItinerarios = repository.getItineraryList(username);
		Itinerary itinerario = repository.getItinerary(itineraryId);
		
		if (listaItinerarios==null)
			throw new NotFoundException("The user with name=" + username + " was not found");
		
		if (itinerario == null)
			throw new NotFoundException("The itinerary with id=" + itineraryId + " was not found");
		
		if (listaItinerarios.contains(itinerario)==true)
			throw new BadRequestException("The itinerary is already included in the list.");
			
		repository.addUserItinerary(username,itineraryId);		

		// Builds the response
		UriBuilder ub = uriInfo.getAbsolutePathBuilder().path(this.getClass(), "get");
		URI uri = ub.build(username);
		ResponseBuilder resp = Response.created(uri);
		resp.entity(listaItinerarios);			
		return resp.build();
	}
	
	@DELETE
	@Path("/{username}/{itineraryId}")
	public Response removeUserItinerary(@PathParam("username") String username,  @PathParam("itineraryId") String itineraryId) {
		List<Itinerary> listaItinerarios = repository.getItineraryList(username);
		Itinerary itinerario = repository.getItinerary(itineraryId);
		
		if (listaItinerarios==null)
			throw new NotFoundException("The user with name=" + username + " was not found");
		
		if (itinerario == null)
			throw new NotFoundException("The itinerario with id=" + itineraryId + " was not found");
		
		
		repository.removeUserItinerary(username, itineraryId);		
		
		return Response.noContent().build();
	}
}
