import { useState, useEffect } from 'react';
import { getAllConferences } from '../../../services/conferenceService';

export const useConferences = () => {
   const [conferences, setConferences] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      const fetchConferences = async () => {
         try {
            setLoading(true);
            const data = await getAllConferences();
            setConferences(data);
         } catch (err) {
            console.error("Erreur de connexion:", err);
            setError(err);
         } finally {
            setLoading(false);
         }
      };

      fetchConferences();
   }, []);

  return { conferences, loading, error };
};