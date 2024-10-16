// utils/stringUtils.js
export const toTitleCase = (str:String) => {
    return str.replace(/\w\S*/g, (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};

export function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }


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