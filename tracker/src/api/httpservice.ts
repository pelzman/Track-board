import axios, { AxiosResponse, AxiosError } from "axios";
 const url = "http://localhost:3000/api"
const customAxios = axios.create({
    baseURL: `${url}`,
    // timeout: 30000,
});

const responseHandler = (response: AxiosResponse): AxiosResponse => {
    if (response?.status === 403) {
        localStorage.clear();
        window.location.href = "/";
    }
    return response;
};
const errorHandler = (error: AxiosError): Promise<AxiosError> => {
    if (error.response?.status === 403) {
        localStorage.clear();
        window.location.href = "/";
    }
    return Promise.reject(error);
};
customAxios.interceptors.response.use(
    (response: AxiosResponse) => responseHandler(response),
    (error: AxiosError) => errorHandler(error)
);
customAxios.interceptors.request.use(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (request: any) => {
        const token = `Bearer ${localStorage.getItem("token") || ""}`;
        if (token) {
            request.headers = {
                ...request.headers,
                Authorization: request.headers.Authorization||token,
            };
        }

        return request;
    },
    (error: AxiosError) => Promise.reject(error)
);

export default  customAxios