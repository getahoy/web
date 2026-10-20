import { serverEnv } from "@/env/serverEnv";
import {
  type SocialProviderId,
  socialProviderCatalog,
} from "../providers/catalog";
import { googleProvider } from "../providers/google";

export const socialProviders = {
  ...googleProvider(serverEnv),
};

export const enabledSocialProviderIds: readonly SocialProviderId[] =
  socialProviderCatalog
    .map((provider) => provider.id)
    .filter((providerId) => providerId in socialProviders);
