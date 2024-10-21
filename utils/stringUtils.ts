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