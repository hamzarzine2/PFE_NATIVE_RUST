export function getMonthString(month: number): string {
    const months: string[] = [
        'janvier', 'février', 'mars', 'avril',
        'mai', 'juin', 'juillet', 'août',
        'septembre', 'octobre', 'novembre', 'décembre'
    ];

    return months[month-1];
}
