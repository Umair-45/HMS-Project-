// Function For Slip Types :
const SLIP_TYPES = {
  OPD_DAY: "OPD_DAY",

  OPD_EVENING: "OPD_EVENING",

  OPD_NIGHT:"OPD_NIGHT",

  HIJAMA: "HIJAMA",

  ULTRASOUND: "ULTRASOUND",

  LAB: "LAB",

  NORMAL_DELIVERY: "NORMAL_DELIVERY",

  DNC: "DNC",

  C_SECTION: "C_SECTION",

  ENT: "ENT",

  ENT_OPERATION:"ENT_OPERATION"
};

// Function For Payment Status :
const PAYMENT_STATUS = {
  PAID: "PAID",

  UNPAID: "UNPAID",

  HALF_PAID: "HALF_PAID",
};

// Export Module :
module.exports = {
  SLIP_TYPES,
  PAYMENT_STATUS,
};