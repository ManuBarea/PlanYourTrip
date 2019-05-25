import React, { Component } from 'react';
import classNames from 'classnames';

import PhotosController from '../../controllers/photos.controller';

import Loader from '../loader/Loader';

export default class SearchPhotos extends Component {

  constructor(props) {
    super(props);

    this.state = {
      venue: props.venue,
      photos: [],
      loading: true
    };
    

    
    PhotosController.search(props.venue)
      .then((data) => {
        console.log('data', data);
        this.setState({ photos: data || [], loading: false });
      }, (error) => {
        console.log('error loading photos', error);
        this.setState({ loading: false });
      });
    
  }

  render() {
    const { venue,photos, loading } = this.state;
    
    return (
      <div className="searchphotos-content">
        <h2>Photos</h2>
        { loading ? (<Loader />) : ( 
        <span>
        <img id={photos[0]} 
        src={"https://farm"+ photos[0].farm + ".staticflickr.com/"+ 
        photos[0].serverid+'/'+photos[0].id+'_'+photos[0].secret+'_m.jpg'  
        }/>
        <img id={photos[1]} 
         src={"https://farm"+ photos[1].farm + ".staticflickr.com/"+ 
         photos[1].serverid+'/'+photos[1].id+'_'+photos[1].secret+'_m.jpg'  
         }/>
         
         </span>
        )
        }
      </div>
    );
  }


}
