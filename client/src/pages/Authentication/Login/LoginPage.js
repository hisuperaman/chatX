import bgImage from '../../../images/bg.jpg';
import WelcomePane from '../components/WelcomePane';
import FormPane from './FormPane';

import ChatIcon from "../../../components/common/ChatIcon";
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../../components/AuthContext';
import { useNavigate } from 'react-router-dom';

import { socket } from '../../../sio';

function LoginPage({isMobileScreen, isDarkMode, setIsDarkMode, setIsLoading}){

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
                                (<WelcomePane isMobileScreen={isMobileScreen} heading={"Welcome"} text={"Sign in to continue access"} logo={<ChatIcon />} />)
                        }
                        
                        <FormPane isMobileScreen={isMobileScreen} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} setIsLoading={setIsLoading} />
                    </div>
                )
                :
                ('')
            }
            
        </div>
    )
}

export default LoginPage;