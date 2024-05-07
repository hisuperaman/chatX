import Resizer from "react-image-file-resizer";

export function getDatetimeWord(date) {
    if (date) {
        const messageDatetime = new Date(date);
        const currentDateTime = new Date();

        const currentDate = new Date(currentDateTime.getFullYear(), currentDateTime.getMonth(), currentDateTime.getDate());
        const messageDate = new Date(messageDatetime.getFullYear(), messageDatetime.getMonth(), messageDatetime.getDate());

        const differenceInMs = currentDate.getTime() - messageDate.getTime();
        const differenceInDays = Math.round(differenceInMs / (1000 * 60 * 60 * 24));

        if (differenceInDays === 0) {
            const hours = messageDatetime.getHours();
            const minutes = messageDatetime.getMinutes();

            const hoursString = (hours % 12 < 10 && hours % 12 !== 0) ? (`0${hours % 12}`) : ((hours % 12 === 0) ? (`12`) : (`${hours % 12}`));
            const minutesString = (minutes < 10) ? (`0${minutes}`) : (`${minutes}`);
            const messageTime = `${hoursString}:${minutesString} ${(hours < 12 || hours === 24) ? ('AM') : ('PM')}`;

            return messageTime;
        }
        else if (differenceInDays === 1) {
            return "Yesterday";
        }
        else {
            const messageDateString = `${messageDatetime.getDate()}/${messageDatetime.getMonth() + 1}/${messageDatetime.getFullYear()}`;

            return messageDateString;
        }
    }

    return "fetching...";

}

function getWeekName(date) {
    const dayIndex = date.getDay();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[dayIndex];
}

export function getDatetimeWordWithDay(date, displayTime) {
    if (date) {
        const messageDatetime = new Date(date);
        const currentDateTime = new Date();

        const currentDate = new Date(currentDateTime.getFullYear(), currentDateTime.getMonth(), currentDateTime.getDate());
        const messageDate = new Date(messageDatetime.getFullYear(), messageDatetime.getMonth(), messageDatetime.getDate());

        const differenceInMs = currentDate.getTime() - messageDate.getTime();
        const differenceInDays = Math.round(differenceInMs / (1000 * 60 * 60 * 24));

        const hours = messageDatetime.getHours();
        const minutes = messageDatetime.getMinutes();

        const hoursString = (hours % 12 < 10 && hours % 12 !== 0) ? (`0${hours % 12}`) : ((hours % 12 === 0) ? (`12`) : (`${hours % 12}`));
        const minutesString = (minutes < 10) ? (`0${minutes}`) : (`${minutes}`);
        const messageTime = `${hoursString}:${minutesString} ${(hours < 12 || hours === 24) ? ('AM') : ('PM')}`;

        let theTime = "";
        if(displayTime){
            theTime = " "+messageTime;
        }

        if (differenceInDays === 0) {
            return messageTime;
        }
        else if (differenceInDays === 1) {
            
            return "Yesterday"+theTime;
        }
        else if (differenceInDays < 7) {
            return getWeekName(messageDatetime)+theTime;
        }
        else {
            const messageDateString = `${messageDatetime.getDate()}/${messageDatetime.getMonth() + 1}/${messageDatetime.getFullYear()}`;

            return messageDateString+theTime;
        }
    }

    return "fetching...";

}

export function getDatetimeWordDateOnly(date) {
    if (date) {
        const messageDatetime = new Date(date);
        const currentDateTime = new Date();

        const currentDate = new Date(currentDateTime.getFullYear(), currentDateTime.getMonth(), currentDateTime.getDate());
        const messageDate = new Date(messageDatetime.getFullYear(), messageDatetime.getMonth(), messageDatetime.getDate());

        const differenceInMs = currentDate.getTime() - messageDate.getTime();
        const differenceInDays = Math.round(differenceInMs / (1000 * 60 * 60 * 24));

        if (differenceInDays === 0) {
            return "Today";
        }
        else if (differenceInDays === 1) {
            return "Yesterday";
        }
        else if (differenceInDays < 7) {
            return getWeekName(messageDatetime);
        }
        else {
            const messageDateString = `${messageDatetime.getDate()}/${messageDatetime.getMonth() + 1}/${messageDatetime.getFullYear()}`;

            return messageDateString;
        }
    }

    return "fetching...";

}

export const resizeFile = (file) =>
    new Promise((resolve) => {
        Resizer.imageFileResizer(
            file,
            200,
            200,
            "JPEG",
            100,
            0,
            (uri) => {
                resolve(uri);
            },
            "base64", 200, 200
        );
    });