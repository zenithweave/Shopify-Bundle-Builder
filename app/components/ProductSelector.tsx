import { Card, ResourceList, Avatar, TextStyle, Button } from "@shopify/polaris";
import { useState } from "react";

export function ProductSelector({ products, selectedProducts, onSelectionChange }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectionChange = (selectedItems) => {
    onSelectionChange(selectedItems);
  };

  return (
    <Card title="Select Products for Bundle" sectioned>
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: "100%",
            padding: "0.5rem",
            border: "1px solid #d1d5db",
            borderRadius: "0.375rem",
          }}
        />
      </div>

      <ResourceList
        items={filteredProducts}
        renderItem={(product) => (
          <ResourceList.Item
            id={product.id}
            media={
              <Avatar
                source={product.images?.[0]?.src || "/placeholder-product.png"}
                size="medium"
                alt={product.title}
              />
            }
            accessibilityText={`Select ${product.title}`}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h3>
                  <TextStyle variation="strong">{product.title}</TextStyle>
                </h3>
                <p>
                  <TextStyle variation="subdued">
                    {product.variants?.[0]?.price 
                      ? `$${product.variants[0].price}` 
                      : "Price not available"}
                  </TextStyle>
                </p>
                {product.vendor && (
                  <p>
                    <TextStyle variation="subdued">Brand: {product.vendor}</TextStyle>
                  </p>
                )}
              </div>
              <Button
                size="small"
                primary={selectedProducts.includes(product.id)}
                onClick={() => {
                  const newSelection = selectedProducts.includes(product.id)
                    ? selectedProducts.filter((id) => id !== product.id)
                    : [...selectedProducts, product.id];
                  handleSelectionChange(newSelection);
                }}
              >
                {selectedProducts.includes(product.id) ? "Selected" : "Select"}
              </Button>
            </div>
          </ResourceList.Item>
        )}
        selectable
        selectedItems={selectedProducts}
        onSelectionChange={handleSelectionChange}
        loading={!products.length}
      />
      
      {selectedProducts.length > 0 && (
        <div style={{ marginTop: "1rem", padding: "1rem", backgroundColor: "#f8f9fa", borderRadius: "0.375rem" }}>
          <p><strong>Selected Products:</strong> {selectedProducts.length}</p>
        </div>
      )}
    </Card>
  );
}