import axios from "axios";
import { api_key } from "../constants";

type ApiProps = {
    endPoint: string;
    params?: string | number;
}

const BaseUrl = 'https://api.themoviedb.org/3'
const trendingMoviesEndpoint = `${BaseUrl}/trending/movie/day?api_key=${api_key}`
const upcomingMoviesEndpoint = `${BaseUrl}/movie/upcoming?api_key=${api_key}`
const topRatedMoviesEndpoint = `${BaseUrl}/movie/top_rated?api_key=${api_key}`
const searchMoviesEndpoint = `${BaseUrl}/search/movie?api_key=${api_key}`


const movieDetailsEndpoint = (id: number | string) => `${BaseUrl}/movie/${id}?api_key=${api_key}`
const movieCreditEndpoint = (id: number | string) => `${BaseUrl}/movie/${id}/credits?api_key=${api_key}`
const movieSimilarEndpoint = (id: number | string) => `${BaseUrl}/movie/${id}/similar?api_key=${api_key}`

const personDetailsEndPoint = (id: number | string) => `${BaseUrl}/person/${id}?api_key=${api_key}`
const personMoviesEndPoint = (id: number | string) => `${BaseUrl}/person/${id}/movie_credits?api_key=${api_key}`



export const image500 = (path: string) => path ? `https://image.tmdb.org/t/p/w500${path}` : undefined;
export const image342 = (path: string) => path ? `https://image.tmdb.org/t/p/w342${path}` : undefined;
export const image185 = (path: string) => path ? `https://image.tmdb.org/t/p/w185${path}` : undefined;

export const fallbackMoviePoster = "https://i.pinimg.com/originals/ad/db/00/addb006995ca0f5c30432eb41a5ed7b3.gif"
export const fallbackPersonImage = "https://i.pinimg.com/564x/a2/d9/fc/a2d9fc9fb05e1e7f2b2709cab6db3c67.jpg"

const apiCall = async ({endPoint, params}:ApiProps) => {
    const options = {
        method: 'GET',
        url: endPoint,
        params: params ? params : {}
    }

    try {
        const response = await axios.request(options);
        return response.data
    }
    catch (error: any) {
        console.log("error: ", error);
        return{}
    }
}


export const fetchTrendingMovies = () => {
    return apiCall({endPoint:trendingMoviesEndpoint})
}

export const fetchUpcomingMovies = () => {
    return apiCall({endPoint:upcomingMoviesEndpoint})
}

export const fetchTopRatedMovies = () => {
    return apiCall({endPoint:topRatedMoviesEndpoint})
}

export const fetchMovieDetails = (id: string | number) => {
    return apiCall({endPoint:movieDetailsEndpoint(id)})
}

export const fetchCreditMovieDetails = (id: string | number) => {
    return apiCall({endPoint:movieCreditEndpoint(id)})
}

export const fetchSimilarMovies = (id: string | number) => {
    return apiCall({endPoint:movieSimilarEndpoint(id)})
}

export const fetchPersonDetails = (id: string | number) => {
    return apiCall({endPoint:personDetailsEndPoint(id)})
}

export const fetchPersonMovies = (id: string | number) => {
    return apiCall({endPoint:personMoviesEndPoint(id)})
}

export const fetchSearchMovies = (params:any) => {
    return apiCall({endPoint : searchMoviesEndpoint,params})
}