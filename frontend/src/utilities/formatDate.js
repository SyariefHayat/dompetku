export const formatDate = (date) => {
    const now = new Date();
    const targetDate = new Date(date);
    const differenceInSeconds = Math.floor((now - targetDate) / 1000);

    if (differenceInSeconds < 60) {
        return "Baru saja";
    } else if (differenceInSeconds < 3600) {
        const minutes = Math.floor(differenceInSeconds / 60);
        return `${minutes} menit yang lalu`;
    } else if (differenceInSeconds < 86400) {
        const hours = Math.floor(differenceInSeconds / 3600);
        return `${hours} jam yang lalu`;
    } else {
        const options = { year: "numeric", month: "short", day: "numeric" };
        return targetDate.toLocaleDateString("id-ID", options);
    }
};

export const formatDateFull = (data) => {
    const date = new Date(data);

    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("id-ID", options);
};

export const formatTime = (data) => {
    const time = new Date(data);

    const options = { hour: "2-digit", minute: "2-digit", hour12: true };
    return time.toLocaleTimeString("id-ID", options);
}