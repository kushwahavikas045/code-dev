import axios from 'axios';

 const api = axios.create({
     //http://localhost:5500,
     withCredentials: true,
     headers:{
        'Content-type': 'application/json',
        Accept:'application/json',
     }
 });

 //endpoints

 export const sendOtp = (data) => api.post('/api/send-otp', data);
 export const verifyOtp = (data) => api.post('/api/verify-otp', data);
 export const activate = (data) => api.post('/api/activate', data);
 export const logout = () => api.post('/api/logout');
 export const createProfile = (data) => api.post('/api/profile', data);
 export const userProfile = () => api.get('/api/profile/me');
 export const allProfiles = () => api.get('/api/profiles');
 export const profileById = (id) => api.get(`/api/profileById/:${id}`);
 export const unactivate = () => api.delete('/api/user/unactivated');
 export const addEducation = (data) => api.put('/api/add-education', data);
 // Interceptors
api.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response.status === 401 &&
            originalRequest &&
            !originalRequest._isRetry
        ) {
            originalRequest.isRetry = true;
            try {
                await axios.get(
                    'http://localhost:5500/api/refresh',
                    {
                        withCredentials: true,
                    }
                );

                return axios.request(originalRequest);
            } catch (err) {
                console.log(err.message);
            }
        }
        throw error;
    }
);
 export default api;