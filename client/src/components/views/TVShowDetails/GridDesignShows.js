import React from 'react';
import {Col} from 'antd';

function GridDesignShows(props) {
    if (props.actor) {
        return (
            <Col lg={6} md={8} sm={16} xs={24}>
                 <div style={{ position: 'relative', justifyContent: 'center'}}>
                        <img style={{ width: '100%', height: '320px' }} alt={'temp'} src={props.image} />
                        <h3 style={{display: 'inline-block'}}>{props.actorname}</h3>
                </div>
            </Col>
        );
    }
}

export default GridDesignShows
