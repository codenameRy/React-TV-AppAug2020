import React, {useEffect, useState } from 'react';
import { Button } from "antd";
import Axios from 'axios';

function FavoriteButton(props) {

    const [favoriteNumber, setfavoriteNumber] = useState(0)
    const [favoriteSelect, setfavoriteSelect] = useState(false)

    const variable = {
        userFrom: props.userFrom,
        tvShowID: props.tvShowID,
        tvShowName: props.tvInfo.original_name,
        tvShowImage: props.tvInfo.backdrop_path,
        tvShowHomepage: props.tvInfo.homepage
    }

    useEffect(() => {

        Axios.post('/api/favorite/favoriteNumber', variable) //localhost:5000
        .then(response => {
            if(response.data.success) {
                setfavoriteNumber(response.data.favoriteNumber)
            } else {
                 console.log('Failed to get favorite number')
            }
        })

        Axios.post('/api/favorite/favoriteSelect', variable)
        .then(response => {
            if(response.data.success) {
                setfavoriteSelect(response.data.favoriteSelect)
            } else {
                 console.log('Failed to get favorite info')
            }
        })

    }, [])

    //Favorite button clicker to add or remove from Favorite List
    const onClickFavorite = () => {
        if(favoriteSelect) {
            // API call when already added
            Axios.post('/api/favorite/removeFromFavorite', variable)
            .then(response => {
                if(response.data.success) {
                    setfavoriteNumber(favoriteNumber - 1)
                    setfavoriteSelect(!favoriteSelect)
                } else {
                     alert('Failed to remove from Favorite List')
                }
            })

        } else {
            //API call when not adding
            Axios.post('/api/favorite/addToFavorite', variable)
            .then(response => {
                if(response.data.success) {
                    setfavoriteNumber(favoriteNumber + 1)
                    setfavoriteSelect(!favoriteSelect)
                } else {
                     alert('Login to add TV Show to Favorite List')
                }
            })
        }

    }

    return (
        <div>
            <Button onClick={onClickFavorite} > {favoriteSelect ? " Remove from Favorite List " : " Add to Favorite List "}</Button>
        </div>
    )
}

export default FavoriteButton
