
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const Index = () => {
  useEffect(() => {
    document.title = "Firefighter Rescue Simulator";
  }, []);

  // Redirect to the landing page
  return <Navigate to="/landing" replace />;
};

export default Index;
