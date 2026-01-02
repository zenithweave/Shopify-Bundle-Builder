import type { MetaFunction } from "@remix-run/node";
import { Links, Meta, Outlet, Scripts, LiveReload } from "@remix-run/react";
import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Zenith Bundle Builder - Premium Shopify App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <link rel="stylesheet" href={polarisStyles} />
        <style>
          {`
            body {
              margin: 0;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }
            .app-footer {
              margin-top: 2rem;
              padding: 1rem;
              border-top: 1px solid #e1e3e5;
              text-align: center;
              font-size: 0.875rem;
              color: #6d7175;
            }
          `}
        </style>
      </head>
      <body>
        <Outlet />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}