import clientRequest from './clientRequest';

export const CLIENT_REQUEST_SETUP_ERROR = 'CLIENT_REQUEST_SETUP_ERROR';

function apiRequestTemplate(template, options) {
  const getRequestExecuteFunction = clientRequest(template, options);

  const apiRequest = function(params = {}, context = {}) {
    let error = null;
    let executeRequest = null;

    try {
      executeRequest = getRequestExecuteFunction(params);
    } catch (e) {
      error = {
        ok: false,
        message: e.message,
        type: CLIENT_REQUEST_SETUP_ERROR,
        error: e,
      };
    }

    if (error) {
      return Promise.reject(error);
    } else {
      return executeRequest(context.headers);
    }
  };

  apiRequest.displayName = `API: ${template}`;
  apiRequest.stringify = params => getRequestExecuteFunction.stringify(params);

  return apiRequest;
}

export default function api(options = {}) {
  return template => apiRequestTemplate(template, options);
}
