import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Page, Layout, Card, Button } from "@shopify/polaris";
import { authenticate } from "../shopify.server";

export async function loader({ request }) {
  const { admin } = await authenticate.admin(request);
  
  // Get basic shop info
  const response = await admin.rest.resources.Shop.all({
    session: admin.rest.session,
  });
  
  const shop = response.data[0];
  
  return json({
    shop: {
      name: shop.name,
      domain: shop.domain,
      email: shop.email,
    },
  });
}

export default function Index() {
  const { shop } = useLoaderData();
  
  return (
    <Page
      title="🎯 Zenith Bundle Builder"
      subtitle="Welcome to your premium bundle management dashboard"
    >
      <Layout>
        <Layout.Section>
          <Card title="Quick Start" sectioned>
            <p>Get started with creating your first product bundle!</p>
            <div style={{ marginTop: "1rem" }}>
              <Button primary>Create Your First Bundle</Button>
            </div>
          </Card>
        </Layout.Section>
        
        <Layout.Section secondary>
          <Card title="Shop Information" sectioned>
            <p><strong>Shop:</strong> {shop.name}</p>
            <p><strong>Domain:</strong> {shop.domain}</p>
            <p><strong>Email:</strong> {shop.email}</p>
          </Card>
        </Layout.Section>
        
        <Layout.Section>
          <Card title="Bundle Builder Features" sectioned>
            <ul>
              <li>📦 Create flexible product bundles</li>
              <li>💰 Dynamic discount calculations</li>
              <li>📊 Real-time analytics dashboard</li>
              <li>🎨 Beautiful customer interface</li>
              <li>📱 Mobile-responsive design</li>
            </ul>
          </Card>
        </Layout.Section>
      </Layout>
      
      <div style={{ 
        marginTop: "2rem", 
        padding: "1rem", 
        borderTop: "1px solid #e1e3e5",
        textAlign: "center",
        fontSize: "0.875rem",
        color: "#6d7175"
      }}>
        <p>Powered by Zenith Weave</p>
        <p>Crafted by Mostafa Magdy | hi@zenithweave.com</p>
      </div>
    </Page>
  );
}