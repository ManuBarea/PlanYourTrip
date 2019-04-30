package aiss.controller;

import java.awt.List;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import aiss.model.flickr.FlickrSearch;
import aiss.model.foursquare.Response;
import aiss.model.foursquare.Venue;
import aiss.model.resources.FlickrResource;
import aiss.model.resources.FourSquareResource;

/**
 * Servlet implementation class SearchController
 */
public class SearchController extends HttpServlet {
	private static final long serialVersionUID = 1L;

	private static final Logger log = Logger.getLogger(SearchController.class.getName());

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public SearchController() {
		super();
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */

	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

		String query = req.getParameter("searchQuery");
		RequestDispatcher rd = null;
		
		FourSquareResource fsResource = new FourSquareResource();
		Response venues = fsResource.searchVenues(query).getResponse();

		if (venues != null && venues.getVenues() != null && venues.getVenues().size() > 0
					&& venues.getVenues().get(0) != null) {
				req.setAttribute("Venues", venues);
				req.setAttribute("Query", query);
				rd = req.getRequestDispatcher("/venuesListing.jsp");
		
		}else{
			log.log(Level.SEVERE, "OMDb object: " + venues);
			rd = req.getRequestDispatcher("/error.jsp");
		}
		rd.forward(req, resp);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}

}
