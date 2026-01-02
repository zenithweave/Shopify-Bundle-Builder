import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { BundleService } from "../utils/bundle";

export async function loader({ request }) {
  const url = new URL(request.url);
  const shopId = url.searchParams.get("shop") || "default-shop";
  const bundleId = url.pathname.split("/")[2];
  
  const bundle = await BundleService.getBundles(shopId).then(bundles => 
    bundles.find(b => b.id === bundleId)
  );
  
  if (!bundle) {
    throw new Response("Bundle not found", { status: 404 });
  }
  
  return { bundle };
}

export default function BundlePage() {
  const { bundle } = useLoaderData();
  
  return (
    <div className="bundle-builder">
      <div className="bundle-header">
        <h1>{bundle.title}</h1>
        <p>{bundle.description}</p>
        <div className="discount-badge">
          Save {bundle.discountType === 'PERCENTAGE' ? bundle.discountValue + '%' : '$' + bundle.discountValue}
        </div>
      </div>
      
      <div className="bundle-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${Math.min(100, (selectedProducts.length / bundle.minProducts) * 100)}%` }}
          />
        </div>
        <p>Select {bundle.minProducts}+ products to unlock your discount</p>
      </div>
      
      <div className="product-grid">
        {/* Products will be rendered here */}
      </div>
      
      <div className="bundle-summary">
        <h3>Bundle Summary</h3>
        <div className="summary-content">
          <p>Selected: {selectedProducts.length}/{bundle.minProducts} products</p>
          <p>Subtotal: ${subtotal.toFixed(2)}</p>
          {discount > 0 && (
            <p className="discount">Discount: -${discount.toFixed(2)}</p>
          )}
          <p className="total">Total: ${(subtotal - discount).toFixed(2)}</p>
        </div>
        <button 
          className="add-to-cart-btn"
          disabled={selectedProducts.length < bundle.minProducts}
        >
          {selectedProducts.length < bundle.minProducts 
            ? `Add ${bundle.minProducts - selectedProducts.length} more products` 
            : "Add Bundle to Cart"
          }
        </button>
      </div>
      
      <style jsx>{`
        .bundle-builder {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        .bundle-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .bundle-header h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          color: #1a1a1a;
        }
        
        .bundle-header p {
          font-size: 1.1rem;
          color: #666;
          margin-bottom: 1.5rem;
        }
        
        .discount-badge {
          display: inline-block;
          background: linear-gradient(135deg, #ff6b6b, #ee5a24);
          color: white;
          padding: 0.5rem 1.5rem;
          border-radius: 25px;
          font-weight: bold;
          font-size: 1.1rem;
        }
        
        .bundle-progress {
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .progress-bar {
          width: 100%;
          height: 8px;
          background: #f0f0f0;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 1rem;
        }
        
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #4CAF50, #45a049);
          transition: width 0.3s ease;
        }
        
        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        
        .bundle-summary {
          background: #f8f9fa;
          padding: 1.5rem;
          border-radius: 12px;
          position: sticky;
          bottom: 0;
        }
        
        .summary-content p {
          margin: 0.5rem 0;
          font-size: 1.1rem;
        }
        
        .discount {
          color: #4CAF50;
          font-weight: bold;
        }
        
        .total {
          font-weight: bold;
          font-size: 1.3rem;
          color: #1a1a1a;
        }
        
        .add-to-cart-btn {
          width: 100%;
          padding: 1rem;
          background: linear-gradient(135deg, #4CAF50, #45a049);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .add-to-cart-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
        }
        
        .add-to-cart-btn:disabled {
          background: #ccc;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}