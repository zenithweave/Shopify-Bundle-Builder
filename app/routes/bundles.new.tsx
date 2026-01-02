import { Page, Layout, Card, Button, CalloutCard } from "@shopify/polaris";
import { useLoaderData, Link } from "@remix-run/react";
import { BundleForm } from "~/components/BundleForm";
import { ProductSelector } from "~/components/ProductSelector";
import { BundleService, ShopifyAPI, validateBundleData } from "~/utils/bundle";
import { useState } from "react";

export async function loader({ request }) {
  const url = new URL(request.url);
  const shopId = url.searchParams.get("shop") || "default-shop";
  
  // In a real app, you'd get the shop from the session
  const products = await ShopifyAPI.getProducts("your-shop.myshopify.com", "your-access-token");
  
  return { products, shopId };
}

export async function action({ request }) {
  const formData = await request.formData();
  const bundleData = JSON.parse(formData.get("bundleData"));
  
  const errors = validateBundleData(bundleData);
  if (errors.length > 0) {
    return { errors };
  }
  
  try {
    const bundle = await BundleService.createBundle("default-shop", bundleData);
    return { success: true, bundle };
  } catch (error) {
    return { errors: ["Failed to create bundle. Please try again."] };
  }
}

export default function NewBundlePage() {
  const { products } = useLoaderData();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [bundleData, setBundleData] = useState(null);
  const [errors, setErrors] = useState([]);

  const handleProductSelection = (productIds) => {
    setSelectedProducts(productIds);
  };

  const handleBundleSubmit = async (data) => {
    const bundleDataWithProducts = {
      ...data,
      productIds: selectedProducts,
    };

    const validationErrors = validateBundleData(bundleDataWithProducts);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // In a real app, this would be an API call
      console.log("Creating bundle:", bundleDataWithProducts);
      alert("Bundle created successfully!");
      // Redirect to bundles list
    } catch (error) {
      setErrors(["Failed to create bundle. Please try again."]);
    }
  };

  return (
    <Page
      title="Create New Bundle"
      subtitle="Set up your product bundle and discount rules"
      breadcrumbs={[
        {
          content: "Bundles",
          url: "/bundles",
        },
      ]}
    >
      <Layout>
        {errors.length > 0 && (
          <Layout.Section>
            <CalloutCard
              title="Please fix the following errors:"
              illustration="https://cdn.shopify.com/s/assets/admin/checkout/checkouts/custom-checkouts-icon.svg"
              primaryAction={{
                content: "Dismiss",
                onAction: () => setErrors([]),
              }}
            >
              <ul>
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </CalloutCard>
          </Layout.Section>
        )}

        <Layout.Section>
          <BundleForm
            onSave={handleBundleSubmit}
            onCancel={() => window.history.back()}
          />
        </Layout.Section>

        <Layout.Section>
          <ProductSelector
            products={products}
            selectedProducts={selectedProducts}
            onSelectionChange={handleProductSelection}
          />
        </Layout.Section>

        <Layout.Section>
          <Card title="Bundle Preview" sectioned>
            {selectedProducts.length > 0 ? (
              <div>
                <p><strong>Selected Products:</strong> {selectedProducts.length}</p>
                <p><strong>Bundle Type:</strong> {bundleData?.discountType || "Not set"}</p>
                <p><strong>Discount:</strong> {bundleData?.discountValue || "Not set"}</p>
                <div style={{ marginTop: "1rem" }}>
                  <Button primary>Create Bundle</Button>
                </div>
              </div>
            ) : (
              <p>Select products to see bundle preview</p>
            )}
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}