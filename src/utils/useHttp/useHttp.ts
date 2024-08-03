import axios from 'axios';

const useHttp = () => {
  const request = async ({
    body = null,
    url,
    method = 'GET',
  }: {
    body?: unknown;
    url: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  }) => {
    try {
      const config = {
        method,
        url,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        ...(body && method !== 'GET' ? { data: body } : {}), // axios использует `data` вместо `body` для POST/PUT/DELETE запросов
      };

      const response = await axios(config);

      return response.data;
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        const message =
          e.response?.data?.message || e.message || 'Unknown error';
        const status = e.response?.status || 500;

        console.error(`HTTP Request Error: ${message} (Status: ${status})`);
        throw new HttpError(message, status);
      } else {
        // Обработка не-axios ошибок
        console.error(`HTTP Request Error: ${e}`);
        throw new HttpError('Unknown error', 500);
      }
    }
  };

  return { request };
};

class HttpError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = 'HttpError';
  }
}

export default useHttp;
