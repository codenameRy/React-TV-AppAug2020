//SERVER ROUTES
console.log(process.env.NODE_ENV)

//Ternary operator to toggle between development and production environments
// export const USER_SERVER = process.env.NODE_ENV === "development" ?
// "api/users":'https://warm-garden-11318.herokuapp.com/api/users';

// export const USER_SERVER = '/api/users';

export const USER_SERVER = process.env.NODE_ENV === "development" ?
"/api/users":"https://react-tv-digital.herokuapp.com/api/users";

export const API_KEY = 'a0265ab770ca0c045998969cf812d64f';
export const API_URL = 'https://api.themoviedb.org/3/';

export const IMAGE_BASE_URL ='https://image.tmdb.org/t/p/';

//Sizes: w300, w780, w1280, original
export const BACKDROP_SIZE = 'w1280'
export const IMAGE_SIZE = 'w1280'

// Sizes: w92, w154, w185, w342, w500, w780, original
export const POSTER_GRID_SIZE = 'w500'

// Size: 200, original
export const CAST_IMAGE_SIZE = 'w200'