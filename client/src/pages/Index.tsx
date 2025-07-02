
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // For demo purposes, redirect to dashboard
    // In a real app, you'd check authentication status here
    navigate('/', { replace: true });
  }, [navigate]);

  return null;
};

export default Index;
