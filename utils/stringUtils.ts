// utils/stringUtils.js
import {TimeValue} from "@react-types/datepicker";
import {DateValue} from "@internationalized/date";

export const toTitleCase = (str:String) => {
    return str.replace(/\w\S*/g, (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};

export function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }


export const daysLeft = (targetDate) => {
    const currentDate = new Date();
    const diffTime = new Date(targetDate) - currentDate;
    return `${Math.ceil(diffTime / (1000 * 60 * 60 * 24))} days left`;
};

export function formatDate(isoString:string) {
    const date = new Date(isoString);

    // Extract the year, month, and day
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');  // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

export function truncateString(str:string, limit:number) {
    if (str.length > limit) {
        return str.slice(0, limit) + '...';
    } else {
        return str;
    }
}


export function formattedDateAndTime(localDateTimeString:string){

// Create a Date object from the string
    const date = new Date(localDateTimeString);

// Function to format the date and time in "MM/dd/yyyy hh:mm AM/PM" format
    function formatDateTimeWithAmPm(date) {
        const months = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1
        const days = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();

        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12; // Convert 24-hour format to 12-hour format
        const formattedHours = String(hours).padStart(2, '0');

        return `${months}/${days}/${year} ${formattedHours}:${minutes}:${seconds} ${ampm}`;
    }

    return  formatDateTimeWithAmPm(date);

}

// Convert date and time objects into a LocalDateTime compatible string
export function dateAndTimeToLocalDateTimeString(dateObj:DateValue, timeObj:TimeValue) {
    const year = dateObj.year;
    const month = String(dateObj.month).padStart(2, '0'); // pad single digit months
    const day = String(dateObj.day).padStart(2, '0');     // pad single digit days
    const hour = String(timeObj.hour).padStart(2, '0');
    const minute = String(timeObj.minute).padStart(2, '0');
    const second = String(timeObj.second).padStart(2, '0');

// Create the string in the "yyyy-MM-ddTHH:mm:ss" format
    return `${year}-${month}-${day}T${hour}:${minute}:${second}`;
}


//reverseof above funcrtion
export function localDateTimeStringToDateValueAndTimeValueObjs(localDateTimeString:string){
    // const localDateTimeString = "2024-10-22T03:03:00";

// Split the string into date and time parts
    const [datePart, timePart] = localDateTimeString.split('T');

// Extract year, month, and day from the date part
    const [year, month, day] = datePart.split('-').map(Number);

// Extract hour, minute, and second from the time part
    const [hour, minute, second] = timePart.split(':').map(Number);

// Create the dateObj and timeObj
    const dateObj = {
        calendar: {
            identifier: "gregory"
        },
        era: "AD",
        year: year,
        month: month,
        day: day
    };

    const timeObj = {
        hour: hour,
        minute: minute,
        second: second,
        millisecond: 0
    };

    return {dateObj,timeObj}
}