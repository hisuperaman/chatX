import { useEffect, useRef, useState } from "react";

function NumberField({inputRef, otp, onOtpChange, onOtpKeyDown}){
    function handleClick(e){
        e.target.select();
    }

    return (
        <div className="border border-b-0 dark:border-dark-line border-light-line text-md w-8">
            <input ref={inputRef} onClick={handleClick} type="text" value={otp} onChange={onOtpChange} onKeyDown={onOtpKeyDown} className='w-full border-b-2 border-light-inputField dark:border-dark-inputField p-2 bg-transparent text-sm focus:outline-none focus:border-light-inputFieldFocus dark:focus:border-dark-inputFieldFocus transition-colors duration-100' />
        </div>
    )
}

function OtpField({otp, setOtp}){
    const otpFieldRefs = useRef([]);

    useEffect(()=>{
        otpFieldRefs.current[0].focus();
    }, [])

    function handleOtpChange(idx, value){
        if(value!=''){
            const updatedOtp = [...otp];
            updatedOtp[idx] = value.slice(value.length-1, value.length);
            setOtp(updatedOtp)

            if(idx<otp.length-1){
                otpFieldRefs.current[idx+1].focus();
            }
        }
    }

    function handleOtpKeyDown(e, idx){
        const key = e.code;

        if(key==='Backspace'){
            const updatedOtp = [...otp];
            updatedOtp[idx] = '';
            setOtp(updatedOtp)

            if(idx>0){
                otpFieldRefs.current[idx-1].focus();
            }
        }
    }

    return (
        <div className="flex">
            {
                new Array(4).fill(0).map((value, index)=>{
                    return (
                        <NumberField key={index} inputRef={(idx)=>otpFieldRefs.current[index]=idx} otp={otp[index]} onOtpChange={(e)=>handleOtpChange(index, e.target.value)} onOtpKeyDown={(e)=>handleOtpKeyDown(e, index)} />
                    )
                })
            }
        </div>
    )
}

export default OtpField;