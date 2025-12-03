import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';        
import AboutUs from '../pages/AboutUs';  
import NotFound from '../pages/NotFound'; 


import MainLayout from '../layouts/MainLayout'; 

function App() {
  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        } 
      />
      
      <Route 
        path="/conozcanos" 
        element={
          <MainLayout>
            <AboutUs />
          </MainLayout>
        } 
      />
      
      {/* 3. RUTA 404 (NotFound): También puede ir dentro del Layout si quieres ver el Navbar/Footer en el error. */}
      <Route 
        path="*" 
        element={
          <MainLayout>
            <NotFound />
          </MainLayout>
        } 
      />
    </Routes>
  );
}

export default App;