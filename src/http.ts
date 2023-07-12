import axios from 'axios';
import { serverName } from './constance';

export async function downloadMusic(fileUrl:string):Promise<any>{
    try{
        const res = await axios({
            url: serverName + fileUrl,
            method: "GET",
            responseType: "blob",
          });
        return res.data;
    } catch(error){
        return error;
    }
}

export async function fetchMusic(numberTracks:number, currentPage:number, parameters:any):Promise<any>{
    const params = {
        ...parameters,
        numberTracks,
        currentPage,
    }
    try{
        const res = await axios({
            url: serverName + 'musics',
            method: "GET",
            params,
          });
        return res.data;
    } catch(error){
        return error;
    }
}

export async function getTopMusic():Promise<any>{
    return fetchMusic(10, 1, {});
}

export async function getMusicOfCreator(id:number, numberTracks:number, currentPage:number):Promise<any>{
    const params = {
        creator: id,
    }
    return fetchMusic(numberTracks, currentPage, params);
}

export async function getMusicOfPlaylist(id:number, numberTracks:number, currentPage:number):Promise<any>{
    const params = {
        playlist: id,
    }
    return fetchMusic(numberTracks, currentPage, params);
}

export async function findTracks(query:string, numberTracks:number, currentPage:number):Promise<any>{
    const params = {
        query,
    }
    return fetchMusic(numberTracks, currentPage, params);
}

export async function getMusicOfGenre(genre:number, numberTracks:number, currentPage:number):Promise<any>{
    const params = {
        genre,
    }
    return fetchMusic(numberTracks, currentPage, params);
}



export async function getPlaylist(id:number):Promise<any>{
    try{
        const res = await axios({
            url: serverName + 'playlists/' + id.toString(),
            method: "GET",
          });
        return res.data;
    } catch(error){
        return error;
    }
}

export async function getTopPlaylists():Promise<any>{
    try{
        const res = await axios({
            url: serverName + 'playlists',
            method: "GET",
          });
        return res.data;
    } catch(error){
        return error;
    }
}

export async function fetchCreators(numberCreators:number, currentPage:number, parameters:any):Promise<any>{
    const params = {
        ...parameters,
        numberCreators,
        currentPage,
    }
    try{
        const res = await axios({
            url: serverName + 'creators',
            method: "GET",
            params
          });
        return res.data;
    } catch(error){
        return error;
    }
}

export async function getTopCreators():Promise<any>{
    return fetchCreators(5, 1, {});
}

export async function findCreators(query:string, numberCreators:number, currentPage:number):Promise<any>{
    const params = {
        query,
    }
    return fetchCreators(numberCreators, currentPage, params);
}

export async function getCreator(id:number):Promise<any>{
    try{
        const res = await axios({
            url: serverName + 'creators/' + id.toString(),
            method: "GET",
          });
        return res.data;
    } catch(error){
        return error;
    }
}

export async function getGenres(options?:any):Promise<any>{
    const params = {
        ...options,
    }
    try{
        const res = await axios({
            url: serverName + 'genres',
            method: "GET",
            params: params,
          });
        return res.data;
    } catch(error){
        return error;
    }
}

export async function getGenresOfCreator(artist:number):Promise<any>{
    const params = {
        creator: artist,
    }
    return getGenres(params);
}