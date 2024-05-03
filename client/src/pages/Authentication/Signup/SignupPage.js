import bgImage from '../../../images/bg.jpg';
import { useNavigate } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { AuthContext } from '../../../components/AuthContext';
import WelcomePane from '../components/WelcomePane';
import FormPane from './FormPane';

import { socket } from '../../../sio';

function SignupPage({isMobileScreen, isDarkMode, setIsDarkMode, setIsLoading}){

    const {token} = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(()=>{
        if(socket){
            socket.disconnect();
        }
    }, [socket]);

    useEffect(()=>{
        if(token){
            navigate('/')
        }
    }, [token])

    return (
        <div className='h-full bg-cover flex justify-center items-center transition-all duration-100' style={{backgroundImage: `url(${bgImage})`}}>
            {
                (!token)?
                (
                    <div className={`flex h-5/6 ${(isMobileScreen)?(''):('w-2/3')} rounded-2xl`}>
                        

                        {
                            (isMobileScreen)?
                                ('')
                            :
                                (<WelcomePane isMobileScreen={isMobileScreen} heading={"Sign Up"} text={"Create a new account"} />)
                        }
                        
                        <FormPane isMobileScreen={isMobileScreen} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} setIsLoading={setIsLoading} />
                    </div>
                ):
                ('')
            }
            
        </div>
    )
}

export default SignupPage;