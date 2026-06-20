// Require Dotenv :
const dotenv = require("dotenv");
dotenv.config();

// Configuration from env :
const FBR_API_URL = process.env.FBR_API_URL || "http://localhost:8524/api/IMSFiscal/GetInvoiceNumberByModel";
const FBR_POS_ID = process.env.FBR_POS_ID || "194518";
const FBR_TOKEN = process.env.FBR_TOKEN || "";

/**
 * Format date to YYYY-MM-DD HH:mm:ss
 * @param {Date|string} date - Date object or string
 * @returns {string} Formatted date string
 */
function formatDate(date) {
  const d = new Date(date || Date.now());
  const pad = (num) => String(num).padStart(2, "0");
  
  const year = d.getFullYear();
  const month = pad(d.getMonth() + 1);
  const day = pad(d.getDate());
  
  const hours = pad(d.getHours());
  const minutes = pad(d.getMinutes());
  const seconds = pad(d.getSeconds());
  
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

/**
 * Sends a slip transaction to FBR POS service
 * @param {Object} slip - The slip document from database
 * @returns {Promise<Object>} FBR response object
 */
async function sendInvoiceToFBR(slip) {
  try {
 const payload = {
  InvoiceNumber: "",
  POSID: parseInt(FBR_POS_ID, 10),

  USIN: slip._id.toString(),
  DateTime: formatDate(slip.createdAt),

  BuyerName: slip.patientName || "Walk-In Patient",
  BuyerCNIC: "",
  BuyerNTN: "",

  TotalQuantity: 1,
  TotalSaleValue: slip.amount || 0,

  TotalTaxCharged: 0,

  TotalBillAmount: slip.amount || 0,

  PaymentMode: 1,
  InvoiceType: 1,

  RefUSIN: "",

  Items: [
    {
      ItemCode: slip.slipType || "SERVICE",
      ItemName: (slip.slipType || "SERVICE").replace(/_/g, " "),
      PCTCode: "00000000",

      Quantity: 1,

      SaleValue: slip.amount || 0,

      TaxCharged: 0,

      TaxRate: 0,

      TotalAmount: slip.amount || 0,

      Discount: 0,
      FurtherTax: 0,

      InvoiceType: 1,
      RefUSIN: ""
    }
  ]
};

    console.log("[FBR Client] Sending payload to FBR:", JSON.stringify(payload, null, 2));

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 6000); // 6 seconds timeout

    const headers = {
      "Content-Type": "application/json"
    };

    // If direct token integration is configured
    if (FBR_TOKEN) {
      headers["Authorization"] = `Bearer ${FBR_TOKEN}`;
    }

    const response = await fetch(FBR_API_URL, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    clearTimeout(id);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("[FBR Client] Received response from FBR:", JSON.stringify(data, null, 2));

    const fbrInvoiceNumber = data.FBRInvoiceNumber || data.InvoiceNumber;
    
    if (fbrInvoiceNumber) {
      return {
        success: true,
        fbrInvoiceNumber: fbrInvoiceNumber,
        statusText: data.Response || "Success"
      };
    } else {
      return {
        success: false,
        error: data.Response || "FBR did not return an invoice number",
        raw: data
      };
    }
  } catch (error) {
    console.error("[FBR Client] FBR Integration Error:", error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

module.exports = {
  sendInvoiceToFBR
};
