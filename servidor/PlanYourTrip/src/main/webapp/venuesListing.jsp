<%@include file="includes/header.jsp"%>

<h1 style="text-align:center;">Venues List</h1>

<div class="container">
	
    	<p class="text-center">Mostrando lugares cerca de: <b>${Query}</b></p>
	
    <table class="table table-hover table-sm">
        <tr>
            <th scope="col">Lugar</th>	
            <th scope="col">ID</th>				
        </tr>
        <c:forEach items ="${Venues.venues}" var="venue">
            <tr >
                <td scope="row"><c:out value="${venue.name}"/></td>	
                <td scope="row"><c:out value="${venue.id}"/></td>							
            </tr>
        </c:forEach>			
    </table>
    <p>
      
</div>

<%@include file="includes/footer.jsp"%>
