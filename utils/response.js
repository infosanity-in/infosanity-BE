
function successResponse(params) {
    const { statusCode = 200, responseMessage = "Success", responseObject = {}, res } = params;
    return res.json({
        statusCode,
        responseMessage,
        responseObject,
    });
}

function errorResponse(params) {
    const { statusCode = 500, responseMessage = "Internal Error", error = {}, res } = params;
    const { code, message } = error;
    return res.json({
        statusCode: code || statusCode,
        responseMessage: code ? message : responseMessage,
        responseObject: code ? {} : error,
    });
}

module.exports = {
    successResponse,
    errorResponse
}