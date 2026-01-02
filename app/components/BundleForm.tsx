import { Card, FormLayout, TextField, Select, Button } from "@shopify/polaris";
import { useState } from "react";

export function BundleForm({ bundle, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: bundle?.title || "",
    description: bundle?.description || "",
    discountType: bundle?.discountType || "PERCENTAGE",
    discountValue: bundle?.discountValue || "",
    minProducts: bundle?.minProducts || "1",
    maxProducts: bundle?.maxProducts || "10",
  });

  const handleInputChange = (field) => (value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const discountTypeOptions = [
    { label: "Percentage", value: "PERCENTAGE" },
    { label: "Fixed Amount", value: "FIXED" },
  ];

  return (
    <Card sectioned>
      <form onSubmit={handleSubmit}>
        <FormLayout>
          <TextField
            label="Bundle Title"
            value={formData.title}
            onChange={handleInputChange("title")}
            placeholder="e.g., Summer Collection Bundle"
            required
          />
          
          <TextField
            label="Description"
            value={formData.description}
            onChange={handleInputChange("description")}
            multiline={3}
            placeholder="Describe your bundle to customers..."
          />
          
          <FormLayout.Group>
            <Select
              label="Discount Type"
              options={discountTypeOptions}
              value={formData.discountType}
              onChange={handleInputChange("discountType")}
            />
            
            <TextField
              label="Discount Value"
              value={formData.discountValue}
              onChange={handleInputChange("discountValue")}
              placeholder={formData.discountType === "PERCENTAGE" ? "20" : "10.00"}
              suffix={formData.discountType === "PERCENTAGE" ? "%" : "$"}
              type="number"
              required
            />
          </FormLayout.Group>
          
          <FormLayout.Group>
            <TextField
              label="Minimum Products"
              value={formData.minProducts}
              onChange={handleInputChange("minProducts")}
              type="number"
              min="1"
              required
            />
            
            <TextField
              label="Maximum Products"
              value={formData.maxProducts}
              onChange={handleInputChange("maxProducts")}
              type="number"
              min="1"
              required
            />
          </FormLayout.Group>
          
          <div style={{ display: "flex", gap: "1rem" }}>
            <Button primary submit>
              {bundle ? "Update Bundle" : "Create Bundle"}
            </Button>
            <Button onClick={onCancel}>Cancel</Button>
          </div>
        </FormLayout>
      </form>
    </Card>
  );
}