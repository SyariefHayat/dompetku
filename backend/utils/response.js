function SUCCESS(response, statusCode, data, message) {
    response.status(statusCode).json({ isError: false, data, message });
}

function ERROR(response, statusCode, message) {
    response.status(statusCode).json({ isError:true, message });
}

module.exports = { SUCCESS, ERROR };