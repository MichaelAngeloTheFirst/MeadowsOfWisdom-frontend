import axios from 'axios';
import {useAuthStore} from '../app/stores/authStore'
import {getRefreshUrl} from  './urls'
import {logout} from '@/lib/logout'

const jsonContentHeaders = {
    'Content-Type': 'application/json',
};

const privateClient = axios.create({ 
    headers: {...jsonContentHeaders}
});



const refreshAccessToken = async () => {
    try{
        console.log("inside refreshAccessToken");
        const refreshToken = useAuthStore.getState().refreshToken;
        const {data} = await axios.post(getRefreshUrl(), {refresh : refreshToken});

        if(!data.access){
            throw new Error("No data received");
        }
        return data.access;
    }
    catch(e){
        console.log(e);
        if(e instanceof axios.AxiosError){
            console.log(e.response?.status);
            if(e.response?.status === 401){
                console.log("status 401");
                logout();
            }
        }
        // console.log(e.response.status);
    }

}

privateClient.interceptors.request.use(
     (config) => {
        if(!config.headers['Authorization']) {
            const accessToken = useAuthStore.getState().accessToken;
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

privateClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error?.config;
        if(error?.response.status === 401 && !originalRequest.sent) {
            originalRequest.sent = true;
            const newAccessToken = await refreshAccessToken();
            useAuthStore.getState().setAccessToken(newAccessToken);
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return privateClient(originalRequest);
        }
        return Promise.reject(error);
    }
);


export default privateClient;