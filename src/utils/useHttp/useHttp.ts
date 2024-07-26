type registerProps = {
  url: string;
  method: string;
  body: string | null;
};

const useHttp = () => {
  const request = async ({
    body = null,
    url,
    method = "GET",
  }: registerProps) => {
    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });

      const data = await response.json();

      if (!response.ok) {
        const error = new Error("Request failed");
        error.status = response.status;
        error.message = data.message || "Unknown error";
        throw error;
      }

      return data;
    } catch (e) {
      console.error("HTTP Request Error:", e);
      throw new Error(e.message || e);
    }
  };

  return { request };
};

export default useHttp;
