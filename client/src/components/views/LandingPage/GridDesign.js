import React from 'react';
import {Col} from 'antd';
import { Link } from 'react-router-dom'

function GridDesign(props) {
    return (
        <Col  lg={6} md={8} sm={18} xs={24}>
                 <div style={{ position: 'relative' , justifyContent: 'center'}}>
                    <Link to={`/tv/${props.tvShowID}`} >
                        <img style={{ width: '95%', height: '95%' }} alt={props.image} src={props.image} />
                    </Link>
                </div>
            </Col>
    )
}

export default GridDesign
