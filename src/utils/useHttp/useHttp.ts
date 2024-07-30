type registerProps = {
  url: string;
  method: string;
  body: string | null;
};

class HttpError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = 'HttpError';
  }
}

const useHttp = () => {
  const request = async ({
    body = null,
    url,
    method = 'GET',
  }: registerProps) => {
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new HttpError(data.message || 'Unknown error', response.status);
      }

      return data;
    } catch (e: any) {
      if (e instanceof HttpError) {
        console.error(`HTTP Request Error: ${e.message} (Status: ${e.status})`);
      } else {
        console.error(`HTTP Request Error: ${e.message || e}`);
      }
      throw e;
    }
  };

  return { request };
};

export default useHttp;
