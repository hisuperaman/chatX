import { useState, useRef, useEffect } from "react";
import ProfilePicture from "./ProfilePicture";
import ChangePfpModal from "./ChangePfpModal";
import ImageCropper from "./components/ImageCropper";
import { resizeFile } from "../../../../utils/helpers";


function Button({ text, isCancel, onButtonClick }) {
    return (
        <div onClick={onButtonClick} className={`w-full border light:border-light-line dark:border-dark-line flex justify-center h-10 items-center light:bg-light-secondary dark:bg-dark-secondary cursor-pointer ${isCancel ? 'hover:bg-common-danger' : 'hover:bg-common-success'} transition duration-50`}>
            {text}
        </div>
    )
}

export default function ProfilePfp({ pfp, onConfirmClick }) {
    const imageInputRef = useRef(null);
    const pfpContainer = useRef(null);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [showChangePfpModal, setShowChangePfpModal] = useState(false);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState({});

    useEffect(() => {
        const handleClickOutside = (event) => {
            // checks if clicked outside the menu
            if (pfpContainer.current && !pfpContainer.current.contains(event.target)) {
                setShowChangePfpModal(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);


    function handleChangePfpClick() {
        setShowChangePfpModal(!showChangePfpModal);
    }

    function handleFileInputChange(e) {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];

            console.log(file)

            const url = URL.createObjectURL(file);
            setUploadedImage(url);
        }
    }

    function handleModalCloseClick() {
        setShowChangePfpModal(false);
    }

    function handleUploadClick() {
        setShowChangePfpModal(false);
        imageInputRef.current.click();
    }

    function handleRemoveClick() {
        onConfirmClick('pfp', null);

        setShowChangePfpModal(false);
        setUploadedImage(null);
    }

    function handleCropComplete(croppedArea, fCroppedAreaPixels) {
        console.log(fCroppedAreaPixels)
        setCroppedAreaPixels(fCroppedAreaPixels);
    }

    function handleUploadCancelClick() {
        imageInputRef.current.value = null;
        setUploadedImage(null);
    }

    function handleUploadSaveClick() {
        const canvas = document.createElement('canvas');
        canvas.width = croppedAreaPixels.width;
        canvas.height = croppedAreaPixels.height;

        const ctx = canvas.getContext('2d');

        const img = new Image();
        img.onload = async () => {
            ctx.drawImage(img, croppedAreaPixels.x, croppedAreaPixels.y, croppedAreaPixels.width, croppedAreaPixels.height, 0, 0, croppedAreaPixels.width, croppedAreaPixels.height);

            canvas.toBlob(async (blob) => {
                const croppedImageURL = await resizeFile(blob);
                // const croppedImageURL = URL.createObjectURL(croppedImage);

                imageInputRef.current.value = null;
                setUploadedImage(null);

                console.log(croppedImageURL)

                onConfirmClick('pfp', croppedImageURL);

            }, 'image/jpg')

        }
        img.src = uploadedImage;
    }


    return (
        <div ref={pfpContainer} >
            <div className="relative">
                {
                    uploadedImage ? '' :<ProfilePicture img={pfp} onChangePfpClick={handleChangePfpClick} />
                }
                

                <input ref={imageInputRef} onChange={handleFileInputChange} type="file" accept="image/*" className="hidden" />



                <ChangePfpModal showChangePfpModal={showChangePfpModal} onModalCloseClick={handleModalCloseClick} onUploadClick={handleUploadClick} onRemoveClick={handleRemoveClick} />


                {
                    uploadedImage ? <div className="h-48 bg-black">
                        <ImageCropper image={uploadedImage} onCropComplete={handleCropComplete} />
                    </div>
                        : ''
                }
            </div>

            {uploadedImage && (
                <div className="flex mb-4">
                    <Button text={'Cancel'} isCancel={true} onButtonClick={handleUploadCancelClick} />
                    <Button text={'Save'} onButtonClick={handleUploadSaveClick} />
                </div>
            )}


        </div>
    )
}