export const createResponse = (
  status: string,
  data: any,
  message?: string
) => ({
  status,
  timestamp: new Date().toISOString(),
  ...(message && { message }),
  data,
});
