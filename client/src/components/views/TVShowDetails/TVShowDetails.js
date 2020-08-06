import React, {useEffect, useState } from 'react';
import Axios from 'axios';
import MainImage from '../LandingPage/MainImage';
import GridDesignShows from './GridDesignShows';
import FavoriteButton from './FavoriteButton';
import { Descriptions, Button, Row } from "antd";
import { API_URL, API_KEY, IMAGE_BASE_URL, IMAGE_SIZE, CAST_IMAGE_SIZE} from '../../Config';

function TVShowDetails(props) {
    const tvShowID = props.match.params.tvShowID;
    const [tvShows, setTvShows] = useState([])
    const [tvShowCast, setTvShowCast] = useState([])
    const [ActorClick, setActorClick] = useState(false)

    useEffect( () => {
        console.log("component did mount - TV Show Details Page");
       
        
        
        // {/* API call for Show information linked to TV Show ID*/}
        Axios.get(`${API_URL}tv/${tvShowID}?api_key=${API_KEY}&language=en-US`)
        .then(response => {
            console.log(response);
            setTvShows(response.data)

            // {/* API call for actor information link to TV Show ID*/}
            Axios.get(
                `${API_URL}tv/${tvShowID}/credits?api_key=${API_KEY}`
              ).then(response => {
                console.log(response);
                  setTvShowCast( response.data.cast)
              });
        })
    
      },[]);

      const handleActorClick = () => {
        setActorClick(!ActorClick)
      }

    return (
        <div>
            {/* Main TV Header Image */}
            {tvShows && (
          <MainImage
            image={`${IMAGE_BASE_URL}${IMAGE_SIZE}${
              tvShows.backdrop_path &&
              tvShows.backdrop_path
            }`}
            title={tvShows.original_name}
            text={tvShows.overview}
          />
        )}

        {/* Body */}
        <div style={{ width: "85%", margin: "1rem auto" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {/* <FavoriteShows userFrom={localStorage.getItem('userId')} /> */}
            <FavoriteButton 
            userFrom={localStorage.getItem('userId')} 
            tvShowID={tvShowID}
            tvInfo={tvShows}
            />

          </div>
            {/* TV Show Details */}
            <Descriptions title='TV Show Details'  
            bordered
            column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
            >
        <Descriptions.Item label='Title'>{tvShows.name}</Descriptions.Item>
        <Descriptions.Item label='First Air Date'>{tvShows.first_air_date}</Descriptions.Item>
        <Descriptions.Item label='TV Show Website'>
        <a href={tvShows.homepage} target="_blank" rel="noopener noreferrer">{tvShows.homepage}</a>
        </Descriptions.Item>
        <Descriptions.Item label='Average Rating'>{tvShows.vote_average}</Descriptions.Item>
        <Descriptions.Item label='Vote Count'>{tvShows.vote_count}</Descriptions.Item>
        <Descriptions.Item label='Status'>{tvShows.status}</Descriptions.Item>
        <Descriptions.Item label='Popularity'>{tvShows.popularity}</Descriptions.Item>
        <Descriptions.Item label='Type'>{tvShows.type}</Descriptions.Item>
        <Descriptions.Item label='Origin Country'>{tvShows.origin_country}</Descriptions.Item>
        {/* <Descriptions.Item label='Genres'>
            {tvShows.genres && tvShows.genres.map((type, index) => (
              <li key={index}>{type.genres}</li>
            ))}
        </Descriptions.Item> */}
      </Descriptions>

      <div style={{ display: "flex", justifyContent: "center" }}>
            {/* <Button onClick={handleActorClick}>View Actors</Button> */}
            <Button onClick={handleActorClick}>View Actors</Button>
            
          </div>
          <br/>
            {/* Grid Design TV Show Actors */}

              {ActorClick &&
                <Row gutter={[16, 16]}>
            {tvShowCast &&
              tvShowCast.map((cast, index) => (
                <React.Fragment key={index}>
                  {cast.profile_path && 
                  <GridDesignShows
                    actor 
                    image={
                      `${IMAGE_BASE_URL}${CAST_IMAGE_SIZE}${cast.profile_path}`}
                      actorname={cast.name}
                  />
            }
                </React.Fragment>
              ))}
          </Row>
              }

            </div> {/* End of Body Div */}

        </div> //   End of whole div
        
    )
}

export default TVShowDetails
