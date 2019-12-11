import { useState, useEffect } from "react";

export default function useFetch(url, method) {
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(url,  {
                    method: method,
                      headers: {
                          Accept: 'application/json',
                          'Content-Type': 'application/json',
                          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGU2ZjI2NjYzOTZhMjAwNmRhMzI0NjciLCJpYXQiOjE1NzU0MTY0MjJ9.Ih-gIHeea1BKWCqlCA4aJf88AynBYkny6rEiK291IxQ`
                      }
                  });
                const json = await res.json();
                setResult(json);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        })();
    }, [url, method])



    return {loading, result, error};
}