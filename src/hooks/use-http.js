import { useState, useCallback } from 'react';

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const sendRequest = useCallback(async (url, {headers={'Content-Type': 'application.json'}, method='GET', body=null}, dataFn=()=>{}) => {
    //Resetting the loading and error
    setIsLoading(true);
    setIsError(false);
    try {
      const resp = await fetch(url, {
        method: method,
        headers: headers,
        body: body
      });
  
      if(!resp.ok){
        throw new Error("Failed on Request " + url);
      };

      const rawData = await resp.json();
      dataFn(rawData)
    } catch(err){
      setIsError(err.message);
    };
    setIsLoading(false);
  }, []);

  return [sendRequest, isLoading, isError]
};

export default useHttp;