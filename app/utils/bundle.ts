import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Shopify API utilities
export class ShopifyAPI {
  static async getProducts(shop: string, accessToken: string) {
    try {
      const response = await fetch(
        `https://${shop}/admin/api/2024-01/products.json?limit=250`,
        {
          headers: {
            'X-Shopify-Access-Token': accessToken,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.products;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  static async createDiscount(shop: string, accessToken: string, discountData: any) {
    try {
      const priceRuleData = {
        price_rule: {
          title: discountData.title,
          target_type: "line_item",
          target_selection: "entitled",
          allocation_method: "across",
          value_type: discountData.discountType.toLowerCase(),
          value: discountData.discountType === "PERCENTAGE" 
            ? `-${discountData.discountValue}` 
            : discountData.discountValue,
          customer_selection: "all",
          starts_at: new Date().toISOString(),
          entitled_product_ids: discountData.productIds,
        },
      };

      const response = await fetch(
        `https://${shop}/admin/api/2024-01/price_rules.json`,
        {
          method: 'POST',
          headers: {
            'X-Shopify-Access-Token': accessToken,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(priceRuleData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating discount:', error);
      throw error;
    }
  }
}

// Bundle utilities
export class BundleService {
  static async createBundle(shopId: string, bundleData: any) {
    return await prisma.bundle.create({
      data: {
        shopId,
        title: bundleData.title,
        description: bundleData.description,
        discountType: bundleData.discountType,
        discountValue: bundleData.discountValue,
        minProducts: bundleData.minProducts,
        maxProducts: bundleData.maxProducts,
        products: {
          create: bundleData.productIds.map((productId: string, index: number) => ({
            productId,
            position: index,
          })),
        },
      },
      include: {
        products: true,
      },
    });
  }

  static async getBundles(shopId: string) {
    return await prisma.bundle.findMany({
      where: {
        shopId,
        isActive: true,
      },
      include: {
        products: true,
        analytics: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 10,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  static async updateBundle(bundleId: string, updateData: any) {
    return await prisma.bundle.update({
      where: { id: bundleId },
      data: updateData,
      include: {
        products: true,
      },
    });
  }

  static async deleteBundle(bundleId: string) {
    return await prisma.bundle.delete({
      where: { id: bundleId },
    });
  }
}

// Discount calculation utilities
export function calculateBundleDiscount(selectedProducts: any[], bundle: any) {
  const subtotal = selectedProducts.reduce((sum, product) => {
    const price = parseFloat(product.variants?.[0]?.price || product.price || '0');
    return sum + price;
  }, 0);

  if (selectedProducts.length >= bundle.minProducts) {
    if (bundle.discountType === 'PERCENTAGE') {
      return subtotal * (bundle.discountValue / 100);
    } else {
      return Math.min(bundle.discountValue, subtotal);
    }
  }

  return 0;
}

export function calculateBundleTotal(selectedProducts: any[], bundle: any) {
  const subtotal = selectedProducts.reduce((sum, product) => {
    const price = parseFloat(product.variants?.[0]?.price || product.price || '0');
    return sum + price;
  }, 0);

  const discount = calculateBundleDiscount(selectedProducts, bundle);
  return subtotal - discount;
}

// Validation utilities
export function validateBundleData(bundleData: any) {
  const errors: string[] = [];

  if (!bundleData.title || bundleData.title.trim().length < 3) {
    errors.push('Bundle title must be at least 3 characters long');
  }

  if (!bundleData.discountValue || bundleData.discountValue <= 0) {
    errors.push('Discount value must be greater than 0');
  }

  if (bundleData.discountType === 'PERCENTAGE' && bundleData.discountValue > 100) {
    errors.push('Percentage discount cannot exceed 100%');
  }

  if (!bundleData.minProducts || bundleData.minProducts < 1) {
    errors.push('Minimum products must be at least 1');
  }

  if (!bundleData.maxProducts || bundleData.maxProducts < bundleData.minProducts) {
    errors.push('Maximum products must be greater than or equal to minimum products');
  }

  if (!bundleData.productIds || bundleData.productIds.length < bundleData.minProducts) {
    errors.push('You must select at least the minimum number of products');
  }

  return errors;
}