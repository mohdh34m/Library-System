import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useUser } from '../lib/context/user';

export default function ProtectedAdminRoute({ children }) {
  const navigate = useNavigate();
  const { current: user } = useUser();

  useEffect(() => {
    for (let i = 0; i < user?.labels.length; i++) {
      if (!user?.labels[i].includes("admin")) {
        navigate('/');
      }
    }
    
  }, [user, navigate]);

  return user?.labels?.includes("admin") ? children : null;
}