import { AsyncLocalStorage } from "node:async_hooks";
import { createLogger } from "@getahoy/lib";

export const requestContext = new AsyncLocalStorage<{ requestId: string }>();

export const logger = createLogger(() => requestContext.getStore()?.requestId);
