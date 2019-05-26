package aiss.api.repository;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;

import java.security.InvalidParameterException;
import java.util.List;
import java.util.Map;

import org.junit.Before;
import org.junit.Test;

import aiss.api.model.Itinerary;
import aiss.api.model.User;
import aiss.api.repository.*;

public class MapItineraryRepositoryTest {

	private MapItineraryRepository repository;
	
	@Before
	public void setUp() throws Exception {
		repository=MapItineraryRepository.getInstance();
		repository.init();
		User usuarioTest1= new User("Test name 1");
		repository.addUser(usuarioTest1);
		User usuarioTest2= new User("Test name 2");
		repository.addUser(usuarioTest2);
		User usuarioTest3= new User("Test name 3");
		repository.addUser(usuarioTest3);
		
	}

	@Test
	public void testGetItinerariesperUser() {
		List<Itinerary> itineraries =repository.getItineraryList("Test name 1");
		
		assertTrue("The list of itineraries for the user is empty",itineraries.size()==0);
	}
	
	@Test
	public void testGetItineraries() {
		
		List<Itinerary> itineraries =repository.getItineraryList("Test name 1");
		
		assertNotNull("The user does not exists",itineraries);
	}

	@Test
	public void testAddItinerary() {
		
		int numberItinerary=repository.getItineraryList("Test name 1").size();
		repository.addUserItinerary("Test name 1", "i3");
		int newnumberItinerary=repository.getItineraryList("Test name 1").size();
		
		assertTrue("The contact has not been added correctly", newnumberItinerary==numberItinerary+1);
	}

}
