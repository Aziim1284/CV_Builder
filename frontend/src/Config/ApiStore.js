import axios from 'axios';
import { MAIN_URL } from './Url';
export function addUser(data){
    return axios.post(`${MAIN_URL}posts/adduser`,data);
}
export function getAll(){
    return axios.get(`${MAIN_URL}posts/getall`);
}
export function getGoogle(){
    return axios.get(`${MAIN_URL}posts/getgoogle`)
}
export function getUser(data){
    return axios.post(`${MAIN_URL}posts/getuser`,data);
}
export function UpdateProfilePic(data){
    console.log(data)
    return axios.post(`${MAIN_URL}posts/updateprofilephoto`,data)
}
export function addCV(data){
    return axios.post(`${MAIN_URL}posts/addcv`,data)
}
export function getCV(data){
    console.log(data)
return axios.post(`${MAIN_URL}posts/getcv`,data)
}
export function UpdateBasicDetails(data){
    console.log(data)
    return axios.post(`${MAIN_URL}posts/updatecv`,data)
    
}
export function UpdateEducation(data){
    console.log(data)
    return axios.post(`${MAIN_URL}posts/updateeducation`,data)
    
}
export function UpdateExperience(data){
    console.log(data)
    return axios.post(`${MAIN_URL}posts/updateexperience`,data)
    
}
export function UpdateProject(data){
    console.log(data)
    return axios.post(`${MAIN_URL}posts/updateproject`,data)
    
}
export function UpdateSkill(data){
    console.log(data)
    return axios.post(`${MAIN_URL}posts/updateskill`,data)
    
}
export function DeleteCv(data ,Id){
    console.log(data)
    return axios.post(`${MAIN_URL}posts/:${Id}`,data)
    
}
export function UpdateSocialProfile(data){
    console.log(data)
    return axios.post(`${MAIN_URL}posts/updatesocialprofile`,data)
    
}
export function googleLogin(data){
    console.log(data)
    return axios.get(`${MAIN_URL}posts/getusergoogle`,data)
    
}
