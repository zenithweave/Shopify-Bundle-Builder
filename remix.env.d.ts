/// <reference types="@remix-run/dev" />
/// <reference types="@shopify/polaris-tokens/css/motion" />
/// <reference types="@shopify/polaris-tokens/css/color" />
/// <reference types="@shopify/polaris-tokens/css/spacing" />
/// <reference types="@shopify/polaris-tokens/css/font" />
/// <reference types="@shopify/polaris-tokens/css/border-radius" />
/// <reference types="@shopify/polaris-tokens/css/z-index" />
/// <reference types="@shopify/polaris-tokens/css/structure" />
/// <reference types="@shopify/polaris-tokens/css/typography" />
/// <reference types="@shopify/polaris-tokens/css/size" />
/// <reference types="@shopify/polaris-tokens/css/depth" />
/// <reference types="@shopify/polaris-tokens/css/base" />

import type { EntryContext } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { renderToString } from "react-dom/server";

export default function handleRequest(
  args: EntryContext
) {
  const markup = renderToString(
    <RemixServer context={args.context} url={args.url} />
  );
  
  return new Response(`<!DOCTYPE html>${markup}`, {
    status: 200,
    headers: {
      "Content-Type": "text/html",
    },
  });
}