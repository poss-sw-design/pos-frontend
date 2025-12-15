// src/api/client.js
import api from './api';

export async function request(url, options = {}) {
  try {
    const response = await api({
      url,
      method: options.method || 'GET',
      data: options.body ? JSON.parse(options.body) : undefined,
      params: options.params,
      headers: options.headers,
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;

      throw {
        status,
        message: data?.message || data?.error || 'Server Error',
        data,
      };
    }

    if (error.request) {
      throw {
        status: 0,
        message: 'No response from server',
      };
    }

    throw {
      status: -1,
      message: error.message || 'Unknown error',
    };
  }
}
