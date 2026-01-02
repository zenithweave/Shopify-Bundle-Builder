import { viteDevServer } from "@remix-run/dev";
import { PrismaClient } from "@prisma/client";
import { shopifyApp } from "@shopify/shopify-app-remix/server";
import { restResources } from "@shopify/shopify-app-remix";
import { ShopifySession } from "@shopify/shopify-app-remix";

const prisma = new PrismaClient();

const shopify = shopifyApp({
  api: {
    apiVersion: "2024-01",
    restResources,
  },
  auth: {
    path: "/api/auth",
    callbackPath: "/api/auth/callback",
  },
  webhooks: {
    path: "/api/webhooks",
  },
  sessionStorage: ShopifySession.memorySessionStorage(),
  hooks: {
    afterAuth: async ({ session }) => {
      // Initialize merchant settings if they don't exist
      await prisma.merchantSettings.upsert({
        where: { shopId: session.shop },
        update: {},
        create: {
          shopId: session.shop,
          planType: "free",
          brandingEnabled: true,
        },
      });
    },
  },
  future: {
    v3_webhookAdminContext: true,
    v3_authenticatePublic: true,
  },
});

export default shopify;
export const config = {
  logHttpRequests: true,
  logger: {
    level: "info",
  },
};

// Health check endpoint
export async function loader({ request }) {
  if (request.url.endsWith("/health")) {
    return new Response("OK", { status: 200 });
  }
  return null;
}