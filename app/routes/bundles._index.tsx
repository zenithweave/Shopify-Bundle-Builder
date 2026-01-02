import { Card, Page, Layout, Button, Badge, DataTable } from "@shopify/polaris";
import { useLoaderData, Link } from "@remix-run/react";
import { BundleService } from "../utils/bundle";

export async function loader({ request }) {
  const url = new URL(request.url);
  const shopId = url.searchParams.get("shop") || "default-shop";
  
  const bundles = await BundleService.getBundles(shopId);
  
  return { bundles };
}

export default function BundlesPage() {
  const { bundles } = useLoaderData();

  const rows = bundles.map((bundle) => [
    bundle.title,
    `${bundle.discountType === 'PERCENTAGE' ? bundle.discountValue + '%' : '$' + bundle.discountValue}`,
    `${bundle.minProducts}-${bundle.maxProducts} items`,
    bundle.products.length,
    <Badge status={bundle.isActive ? "success" : "attention"}>
      {bundle.isActive ? "Active" : "Inactive"}
    </Badge>,
    <div style={{ display: "flex", gap: "0.5rem" }}>
      <Button size="small" url={`/bundles/${bundle.id}/edit`}>
        Edit
      </Button>
      <Button size="small" destructive>
        Delete
      </Button>
    </div>,
  ]);

  return (
    <Page
      title="Bundle Management"
      subtitle="Manage your product bundles and discounts"
      primaryAction={{
        content: "Create New Bundle",
        url: "/bundles/new",
      }}
    >
      <Layout>
        <Layout.Section>
          <Card>
            <DataTable
              columnContentTypes={[
                "text",
                "numeric",
                "numeric",
                "numeric",
                "text",
                "text",
              ]}
              headings={[
                "Bundle Name",
                "Discount",
                "Product Range",
                "Products",
                "Status",
                "Actions",
              ]}
              rows={rows}
            />
          </Card>
        </Layout.Section>

        {bundles.length === 0 && (
          <Layout.Section>
            <Card sectioned>
              <div style={{ textAlign: "center", padding: "2rem" }}>
                <h3>No bundles yet</h3>
                <p>Create your first bundle to get started!</p>
                <div style={{ marginTop: "1rem" }}>
                  <Button primary url="/bundles/new">
                    Create Your First Bundle
                  </Button>
                </div>
              </div>
            </Card>
          </Layout.Section>
        )}

        <Layout.Section>
          <Card title="Quick Stats" sectioned>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
              <div>
                <h4>Total Bundles</h4>
                <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{bundles.length}</p>
              </div>
              <div>
                <h4>Active Bundles</h4>
                <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                  {bundles.filter(b => b.isActive).length}
                </p>
              </div>
              <div>
                <h4>Total Products</h4>
                <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                  {bundles.reduce((sum, bundle) => sum + bundle.products.length, 0)}
                </p>
              </div>
            </div>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}