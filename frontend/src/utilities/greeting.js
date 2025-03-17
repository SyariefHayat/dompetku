export const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
        return 'Selamat pagi';
    } else if (hour >= 12 && hour < 15) {
        return 'Selamat siang';
    } else if (hour >= 15 && hour < 18) {
        return 'Selamat sore';
    } else {
        return 'Selamat malam';
    }
};