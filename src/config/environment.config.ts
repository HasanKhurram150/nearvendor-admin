import { string, object } from "yup";
import { ALLOW_API_MOCKING, BASE_URL } from "./config";
// import { API_KEY } from "./config";

/**
 * contains all the validated environment variables.
 *
 * Reason:
 * This help prevents the application to start without environment variables. If not used you may still find the
 * error but a bit late.
 */
export const environment = object()
  .shape({
    baseUrl: string().required(),
    allowApiMocking: string(),
  })
  .validateSync({
    baseUrl: BASE_URL,
    allowApiMocking: ALLOW_API_MOCKING,
  });
