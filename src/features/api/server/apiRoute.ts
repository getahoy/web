import { ErrorResponse, REQUEST_ID_HEADER } from "@getahoy/lib";
import { logger, requestContext } from "@/features/logging/server/logger";

type RouteWork<Context> = (
  request: Request,
  context: Context,
) => Promise<Response>;

async function runSafely(
  scope: string,
  work: () => Promise<Response>,
): Promise<Response> {
  try {
    return await work();
  } catch (error) {
    logger.error(scope, "Unhandled failure", error);
    return ErrorResponse("internal", "Internal server error");
  }
}

export function apiRoute<Context = unknown>(
  scope: string,
  work: RouteWork<Context>,
) {
  return (request: Request, context: Context): Promise<Response> => {
    const requestId = crypto.randomUUID();
    return requestContext.run({ requestId }, async () => {
      const startedAt = performance.now();
      const response = await runSafely(scope, () => work(request, context));
      response.headers.set(REQUEST_ID_HEADER, requestId);
      const elapsedMs = Math.round(performance.now() - startedAt);
      logger.info(scope, `${request.method} ${response.status} ${elapsedMs}ms`);
      return response;
    });
  };
}
