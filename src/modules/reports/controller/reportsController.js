// Require Services :
const reportService =
  require("../../../../src/modules/reports/service/reportsService");

// DAILY INCOME
exports.dailyIncomeReport =
  async (req, res) => {

    try {

      const report =
        await reportService.dailyIncomeReportService();

      return res.status(200).json({
        success: true,
        data: report,
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message: error.message,
      });

    }

  };

// MONTHLY INCOME
exports.monthlyIncomeReport =
  async (req, res) => {

    try {

      const report =
        await reportService.monthlyIncomeReportService();

      return res.status(200).json({
        success: true,
        data: report,
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message: error.message,
      });

    }

  };

// DAILY TOTAL SLIPS
exports.dailyTotalSlipsReport =
  async (req, res) => {

    try {

      const report =
        await reportService.dailyTotalSlipsReportService();

      return res.status(200).json({
        success: true,
        data: report,
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message: error.message,
      });

    }

  };

// MONTHLY TOTAL SLIPS
exports.monthlyTotalSlipsReport =
  async (req, res) => {

    try {

      const report =
        await reportService.monthlyTotalSlipsReportService();

      return res.status(200).json({
        success: true,
        data: report,
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message: error.message,
      });

    }

  };

// DAILY PATIENTS
exports.dailyPatientsReport =
  async (req, res) => {

    try {

      const report =
        await reportService.dailyPatientsReportService();

      return res.status(200).json({
        success: true,
        data: report,
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message: error.message,
      });

    }

  };

// MONTHLY PATIENTS
exports.monthlyPatientsReport =
  async (req, res) => {

    try {

      const report =
        await reportService.monthlyPatientsReportService();

      return res.status(200).json({
        success: true,
        data: report,
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message: error.message,
      });

    }

  };


// DAILY SLIP TYPES
exports.dailySlipTypeReport =
  async (req, res) => {

    try {

      const report =
        await reportService.dailySlipTypeReportService();

      return res.status(200).json({
        success: true,
        data: report,
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message: error.message,
      });

    }

  };


// MONTHLY SLIP TYPES
exports.monthlySlipTypeReport =
  async (req, res) => {

    try {

      const report =
        await reportService.monthlySlipTypeReportService();

      return res.status(200).json({
        success: true,
        data: report,
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message: error.message,
      });

    }

  };


// DAILY OPERATOR REPORT
exports.dailyOperatorReport =
  async (req, res) => {

    try {

      const report =
        await reportService.dailyOperatorReportService();

      return res.status(200).json({
        success: true,
        data: report,
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message: error.message,
      });

    }

  };


// MONTHLY OPERATOR REPORT
exports.monthlyOperatorReport =
  async (req, res) => {

    try {

      const report =
        await reportService.monthlyOperatorReportService();

      return res.status(200).json({
        success: true,
        data: report,
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message: error.message,
      });

    }

  };


// PATIENT HISTORY
exports.patientHistoryReport =
  async (req, res) => {

    try {

      const report =
        await reportService.patientHistoryReportService(
          req.params.mrNumber
        );

      return res.status(200).json({
        success: true,
        data: report,
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message: error.message,
      });

    }

  };