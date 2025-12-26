import { useState, useEffect } from 'react';
import { MOCK_CONFERENCES } from '../../../utils/mockData';

export const useConferences = () => {
  const [conferences, setConferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      const fetchConferences = async () => {
         try {
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 500)); 
            setConferences(MOCK_CONFERENCES);
         } catch (err) {
            setError(err);
         } finally {
            setLoading(false);
         }
      };

      fetchConferences();
   }, []);

  return { conferences, loading, error };
};