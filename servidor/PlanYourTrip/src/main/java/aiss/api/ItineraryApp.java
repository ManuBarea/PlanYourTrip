package aiss.api;

import java.util.HashSet;
import java.util.Set;

import javax.ws.rs.core.Application;

import aiss.api.resources.FoursquareAccessTokenResource;
import aiss.api.resources.ItineraryResource;
import aiss.api.resources.UserResource;
import aiss.api.resources.VenueResource;
public class ItineraryApp extends Application {

	private Set<Object> singletons = new HashSet<Object>();
	private Set<Class<?>> classes = new HashSet<Class<?>>();

	// Loads all resources that are implemented in the application
	// so that they can be found by RESTEasy.
	public ItineraryApp() {

		singletons.add(ItineraryResource.getInstance());
		singletons.add(VenueResource.getInstance());
		singletons.add(UserResource.getInstance());
		singletons.add(FoursquareAccessTokenResource.getInstance());
	}

	@Override
	public Set<Class<?>> getClasses() {
		return classes;
	}

	@Override
	public Set<Object> getSingletons() {
		return singletons;
	}
	

}
