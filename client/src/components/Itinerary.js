import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Toolbar from './Toolbar';
import { connect } from 'react-redux';
import { getItineraryData } from '../actions/itineraryActions';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import ItineraryCarousel from './ItineraryCarousel';

//---------------
//VIEW ALL BUTTON
//---------------
const ItineraryButton = props => {
  let activity = props.objectActivity;
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <div className='viewMore'>
      <Collapse isOpen={isOpen}>
        <Card>
          <CardBody>
            <h2
              style={{ textAlign: 'left', fontSize: '5vw', marginTop: '-2vh' }}
            >
              Activities
            </h2>
            <ItineraryCarousel activity2={activity} />
            <p
              style={{ textAlign: 'left', fontSize: '3.5vw', marginTop: '2vh' }}
            >
              Comments
            </p>
            <input
              id='itineraryInput'
              type='text'
              placeholder='Your comment...'
            />
            <input
              type='image'
              src={require('../assets/images/arrow2.png')}
              alt='Submit Form'
              style={{
                float: 'right',
                marginTop: '-1.25vh',
                width: '3vw',
                height: '4vw'
              }}
            />
          </CardBody>
        </Card>
      </Collapse>
      <Button color='primary' onClick={toggle}>
        View All
      </Button>
    </div>
  );
};

//--------------------
//ACTIVITIES COMPONENT
//--------------------
class Itinerary extends React.Component {
  async componentDidMount() {
    const {
      match: { params }
    } = this.props;
    await this.props.getItineraryData(params.city_id);
  }

  activitiesHeader() {
    let urlImg = this.props.itineraryData.itinerary[0].urlImg;
    return (
      <div id='mainItineraryHeader'>
        <p id='mainItinerary_p'>{this.props.itineraryData.itinerary[0].id}</p>
        <img
          id='mainItineraryImg'
          src={require('../assets/images/' + urlImg)}
          alt={this.props.itineraryData.itinerary[0].urlImg}
        />
        <p id='mainItineraryTitle'>Available MYtineraries</p>
      </div>
    );
  }

  activitiesBox() {
    let box = this.props.itineraryData.itinerary.map(activity => {
      let urlImg = activity.profilePic;
      let imgProfile = require('../assets/images/' + urlImg);
      let title = activity.title;
      let user = activity.user;
      let rating = activity.rating;
      let duration = activity.duration;
      let price = activity.price;
      let hashtags = activity.hashtags.join(' ');
      let activityData = activity.activities;
    

      /*const onLike = () => {
        const user = localStorage.getItem('email')
        usersMod.findOne({ user }).then(user => {
          if(!user){
            alert('You must be logged in')
          }else{
            axios.post('http://localhost:5000/users/login/like')
          }
        }
      }*/

      return (
        <div className='parentBox' key={title}>
          <div className = 'headerBox'>
            <div className='userBox'>
              <img id='profilePic' src={imgProfile} alt={user} />
              <p>{user}</p>
            </div>
            <div className='activityBox'>
              {/* if()
              <a onClick={onLike}>
                <img id='like' src={require('../assets/images/heart.png')}/>
              </a> */}
              <h1>{title}</h1>
              <p>Likes: {rating}</p>
              <p>{duration} Hours</p>
              <p>${price}</p>
              <br />
              <p id='pHash'>{hashtags}</p>
              <br />
            </div>
          </div>
          <ItineraryButton objectActivity={activityData} />
        </div>
      );
    });
    return <div className='activitiesBox'>{box}</div>;
  }
  render() {
    return (
      <div>
        <Toolbar />
        {this.props.itineraryData.itinerary[0] ? (
          <div className='mainItinerary'>
            {this.activitiesHeader()}
            {this.activitiesBox()}
          </div>
        ) : (
          <div></div>
        )}
        <Link style={{ fontSize: '4vw', marginLeft: '37vw' }} to='/cities'>
          Browse cities
        </Link>
      </div>
    );
  }
}

//-----
//REDUX
//-----
const mapStateToProps = state => {
  return {
    itineraryData: state.itinerary
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getItineraryData: data => {
      return dispatch(getItineraryData(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Itinerary);
