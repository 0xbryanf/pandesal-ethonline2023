import { ethers } from 'ethers';

export const numericString = (value: string): string => {
    return value.split('').map( char => char.charCodeAt(0).toString()).join('');
}

export const salt = (numericString: string): number => {
    return numericString.split('').reduce((acc, value) => acc + parseInt(value), 0);
}

export default { numericString, salt };