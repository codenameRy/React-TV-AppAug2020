import React, {useEffect, useState } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL, IMAGE_SIZE, POSTER_GRID_SIZE} from '../../Config';
import Axios from 'axios';
import { Typography, Row } from "antd";
import MainImage from './MainImage';
import GridDesign from './GridDesign';

const { Title } = Typography;

function LandingPage() {

    const [tvShows, setTvShows] = useState([]);
    const [tvCurrentPage, setvCurrentPage] = useState(0);

    useEffect(() => {
      console.log("component did mount - Home Page");
      
      // Declaration of API Endpoint and retrieveShows function
        const endPoint = `${API_URL}tv/popular?api_key=${API_KEY}&language=en-US&page=1`;
        retrieveShows(endPoint);
    }, [])

  //API Call to TV Database to collect responses of all TV shows and page counts
    const retrieveShows = (path) => {
         Axios.get(path)
        .then(response => {
            console.log(response);
            setTvShows([...tvShows, ...response.data.results])
            setvCurrentPage(response.data.page)
        })
    }

    //Load more button with handleClick function to populate additional pages of TV shows
    const handleClick = () => {
        let endPoint = `${API_URL}tv/popular?api_key=${API_KEY}&language=en-US&page=${tvCurrentPage + 1}`
        retrieveShows(endPoint)
      };

    return (
        <div style={{ width: '100%', margin: '0' }}>
        {/* Main TV Header Image  */}
        {tvShows[3] && 
        <MainImage
            image={`${IMAGE_BASE_URL}${IMAGE_SIZE}${
              tvShows[3].backdrop_path &&
              tvShows[3].backdrop_path
            }`}
            title={tvShows[3].original_name}
            text={tvShows[3].overview}
        /> 
        }
        
       
        {/* Body */}
        <div style={{ width: "85%", margin: "1rem auto" }}>
          <Title level={2}> Latest TV Shows </Title>
          <hr />

          {/* Grid Design Shows */}
          <Row gutter={[16, 16]}>
            {tvShows &&
              tvShows.map((tvShows, index) => (
                <React.Fragment key={index}>
                {tvShows.poster_path &&
                  <GridDesign
                    image={`${IMAGE_BASE_URL}${POSTER_GRID_SIZE}${tvShows.poster_path}`}
                    tvShowID={tvShows.id}
                  />
                  }
                </React.Fragment>
              ))}
          </Row>

          {/* Load More Button */}
          <br />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button onClick={handleClick}>Load More</button>
          </div>
        </div>
       
      </div>
    )
}

export default LandingPage
