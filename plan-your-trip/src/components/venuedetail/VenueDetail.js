import React, { Component } from 'react';

import Dispatcher from '../../mixins/dispatcher';
import VenuesController from '../../controllers/venues.controller';
import './VenueDetail.scss';
import SearchPhotos from './SearchPhotos';

export default class VenueDetail extends Component {

  constructor(props) {
    super(props);
    this.State={
     
    }
  }

  closePane = () => {
    Dispatcher.dispatch('venue::details::close');
  }

  renderVenuePhoto(venueid){
    VenuesController.searchPhoto(venueid)
    .then((photo) => {
      this.setState({ venuephoto: photo || [], loading: false });
    }, (error) => {
      console.log('error loading venue photography', error);
      this.setState({ loading: false });
    });
    if(this.venuephoto !=null)
      return  <div>
      <img src={this.venuephoto.prefix+'100x100'+this.venuephoto.sufix}/>
      </div>
  }

  render() {
    const { venue } = this.props;

    return (<div className="VenueDetail">
      <div className="header">
        <h1>{ venue.name }</h1>
        <button onClick={ this.closePane }>Cerrar</button>
      </div>
      <div className="content">
        { venue.categories.length && venue.categories.map((category, i) => (<div key={i}>
          <img src={ category.icon.buildUrl(64) } title={ category.name } />
        </div>)) }
      </div>  
      <div className="venuePhoto">
        
          
      </div>

      <div className="photos">
        <h3>Related photographies</h3> 
        {<SearchPhotos venue={venue.name}></SearchPhotos>}
       
        
        
      </div>
    </div>);
  }

}
