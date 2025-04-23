import { string, object } from "yup";
import { API_KEY, BASE_URL } from "./config";

/**
 * contains all the validated environment variables.
 *
 * Reason:
 * This help prevents the application to start without environment variables. If not used you may still find the
 * error but a bit late.
 */
export const environment = object()
  .shape({
    apiKey: string().required(),
    allowApiMocking: string(),
  })
  .validateSync({
    apiKey: BASE_URL,
    allowApiMocking: API_KEY,
  });
