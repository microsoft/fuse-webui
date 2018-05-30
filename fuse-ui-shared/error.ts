export interface HttpError extends Error {
  statusCode: number;
}

export interface APIError extends HttpError {
  correlationId?: string;
}

function isODataError(x: any): boolean {
  return x.error && x.message || x.Error && x.Message;
}

export function isApiError(x: any): x is APIError {
  return x.statusCode && x.name && x.message;
}

export async function apiErrorFromResponse(response: Response): Promise<APIError> {
  const clone = response.clone();
  try {
    const error = await response.json();
    if (isODataError(error)) {
      return {
        statusCode: response.status,
        name: error.error || error.Error,
        message: error.message || error.Message,
        correlationId: error.correlationId || error.CorrelationId
      };
    }
  } catch (ex) {
    // do nothing
  }

  return {
    statusCode: response.status,
    name: response.statusText,
    message: await clone.text()
  };
}
