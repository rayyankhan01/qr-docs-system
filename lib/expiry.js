//helper file for expiring documents 



export const EXPIRY_WARNING_DAYS = 30; // Number of days before expiry to start warning
export function getExpiryStatus(expiry_date, warningDays=EXPIRY_WARNING_DAYS) {
    if(!expiry_date) return null;
    const daysUntil = (new Date (expiry_date) - new Date())/(1000*60*60*24);
    if(daysUntil <0) return 'expired';
    if(daysUntil <=warningDays) return 'expiring'
    return 'valid'
}