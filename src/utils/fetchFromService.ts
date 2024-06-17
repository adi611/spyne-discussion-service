
import axios, { Method } from 'axios';

enum ServiceNames {
  USERS = 'user-service',
  DISCUSSIONS = 'discussion-service',
  COMMENTS = 'comment-service',
}

type TFetchOptions = {
  method: Method;
  url: String;
  body?: any;
}

const serviceUrls = {
  [ServiceNames.USERS]: 'http://localhost:5000/api',
  [ServiceNames.DISCUSSIONS]: 'http://localhost:5001/api',
  [ServiceNames.COMMENTS]: 'http://localhost:5002/api',
};

export const fetchFromService = async (service: ServiceNames, options: TFetchOptions) => {
  const { method, url, body } = options;
  const serviceUrl = serviceUrls[service];

  try {
    const response = await axios({
      method,
      url: `${serviceUrl}${url}`,
      data: body,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Internal Service Error');
  }
};

export { ServiceNames };
