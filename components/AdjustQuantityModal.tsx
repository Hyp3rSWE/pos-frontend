import { Fragment, useState } from "react";
import { toast } from "react-hot-toast";

interface AdjustQuantityModalProps {
  isOpen: boolean;
  closeModal: () => void;
  productId: number;
  productName: string;
  currentQuantity: number;
  onQuantityAdjusted: () => void;
}

export default function AdjustQuantityModal({
  isOpen,
  closeModal,
  productId,
  productName,
  currentQuantity,
  onQuantityAdjusted,
}: AdjustQuantityModalProps) {
  const [newQuantity, setNewQuantity] = useState<number>(currentQuantity);
  const [reason, setReason] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      // Create the adjustment payload
      const adjustmentData = {
        user_id: 1, // TODO: Get this from your auth context/state
        product_id: productId,
        new_quantity: newQuantity,
        adjustment_reason: reason.trim(),
        // product_variant_id is optional, so we don't need to include it
      };

      const response = await fetch(`http://localhost:3001/adjustments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adjustmentData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || "Failed to adjust quantity");
      }

      toast.success("Quantity adjusted successfully");
      onQuantityAdjusted();
      closeModal();

      // Reset form
      setNewQuantity(currentQuantity);
      setReason("");
    } catch (error) {
      console.error("Adjustment error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to adjust quantity",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const isValidAdjustment = () => {
    return (
      newQuantity >= 0 &&
      newQuantity !== currentQuantity &&
      reason.trim().length > 0
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
  className="fixed inset-0 bg-black bg-opacity-50"
  onClick={closeModal}
  role="button"        
  tabIndex={0}         
  onKeyDown={(e) => {
    if (e.key === "Enter" || e.key === " ") {
      closeModal();
    }
  }} 
></div>


      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-lg p-6 w-full max-w-md mx-auto">
          <h3 className="text-xl font-semibold mb-4">
            Adjust Quantity for {productName}
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Quantity: {currentQuantity}
              </label>
              <input
                type="number"
                min="0"
                value={newQuantity}
                onChange={(e) =>
                  setNewQuantity(Math.max(0, Number(e.target.value)))
                }
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
  <label
    htmlFor="reason"  // Add the `htmlFor` attribute
    className="block text-sm font-medium text-gray-700 mb-1"
  >
    Reason for Adjustment
  </label>
  <textarea
    id="reason"  // Add the `id` attribute to match `htmlFor` in label
    value={reason}
    onChange={(e) => setReason(e.target.value)}
    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
    rows={3}
    placeholder="Please provide a reason for this adjustment"
  />
</div>

          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleSubmit}
              disabled={isLoading || !isValidAdjustment()}
            >
              {isLoading ? "Adjusting..." : "Adjust Quantity"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
