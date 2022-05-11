import Axios from 'axios';

const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;

export const NodeServer = (config?: any) => {
  return Axios.create({
    baseURL: apiEndpoint,
    timeout: 50000,
  });
};

export const getSession = async (url: string) => {
  return await NodeServer()
    .get(url)
    .then((res: any) => res.data.data);
};

export const postSession = (url: string, data: any) => {
  return NodeServer()
    .post(url, data)
    .then((res: any) => res.data);
};
