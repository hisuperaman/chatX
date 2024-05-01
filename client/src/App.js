import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';

import LoginPage from './pages/Authentication/Login/LoginPage';
import SignupPage from './pages/Authentication/Signup/SignupPage';
import HomePage from './pages/Home/HomePage';
import LoadingBar from './components/common/LoadingBar';

import { AuthProvider } from './components/AuthContext';


function App() {

  const [isLoading, setIsLoading] = useState(false);

  let savedIsDarkMode = localStorage.getItem('chatXtheme');
  savedIsDarkMode = savedIsDarkMode!=null?(savedIsDarkMode=='true'?true:false):true;
  const [isDarkMode, setIsDarkMode] = useState(savedIsDarkMode);

  const [isMobileScreen, setIsMobileScreen] = useState(window.innerWidth<=640);

    useEffect(()=>{
        const handleResize = ()=>{
            const isMobile = window.innerWidth <= 640;

            setIsMobileScreen(isMobile);
        }

        window.addEventListener('resize', handleResize);

        return ()=>{
            window.removeEventListener('resize', handleResize);
        }
    }, [])

    useEffect(()=>{
      localStorage.setItem('chatXtheme', isDarkMode);
    }, [isDarkMode]);

    useEffect(()=>{
      if(isDarkMode===true){
        document.getElementById("root").classList.remove("light");
        document.getElementById("root").classList.add("dark");
      }
      else{
        document.getElementById("root").classList.remove("dark");
        document.getElementById("root").classList.add("light");
      }
    }, [isDarkMode]);


  return (
    <AuthProvider setIsLoading={setIsLoading}>
      <Router>
        
        <div className='bg-light-primary dark:bg-dark-primary text-black dark:text-white h-fill'>
          {<LoadingBar isLoading={isLoading} />}
        
          <Routes>
            <Route path='/' element={<HomePage isMobileScreen={isMobileScreen} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} setIsLoading={setIsLoading} />} />
            <Route path='/login' element={<LoginPage isMobileScreen={isMobileScreen} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} setIsLoading={setIsLoading} />} />
            <Route path='/signup' element={<SignupPage isMobileScreen={isMobileScreen} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} setIsLoading={setIsLoading} />} />

  {/* fallback route
            <Route /> */}
          </Routes>
        

        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;