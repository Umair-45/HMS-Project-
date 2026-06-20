// Require Patient Service :
const patientService = require("../../../../src/modules/patient/service/patientService");

// Register Patient :
exports.createPatient = async (req, res) => {
    try {

        const patient = await patientService.createPatientService(
            req.body,
            req.user._id
        );

        res.status(201).json({
            success: true,
            message: "Patient created successfully",
            data: patient,
        });

    } catch (error) {

        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message,
            existingPatient: error.patient || null,
        });

    }
};

// Get All Patients :
exports.getAllPatients = async (req, res) => {
    try {

        const patients =
            await patientService.getAllPatientsService(req.query);

        res.status(200).json({
            success: true,
            total: patients.length,
            data: patients,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// Get Single Patient By MR Number :
exports.getPatientByMr = async (req, res) => {
    try {

        const patient =
            await patientService.getPatientByMrService(
                req.params.mrNumber
            );

        if (!patient) {
            return res.status(404).json({
                success: false,
                message: "Patient not found",
            });
        }

        res.status(200).json({
            success: true,
            data: patient,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// Update Patient :
exports.updatePatient = async (req, res) => {
    try {

        const patient =
            await patientService.updatePatientService(
                req.params.mrNumber,
                req.body
            );

        if (!patient) {
            return res.status(404).json({
                success: false,
                message: "Patient not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Patient updated successfully",
            data: patient,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// Patient Soft Delete 
exports.softDeletePatient = async (req, res) => {
    try {

        const patient =
            await patientService.softDeletePatientService(
                req.params.mrNumber
            );

        if (!patient) {
            return res.status(404).json({
                success: false,
                message: "Patient not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Patient soft deleted successfully",
            data: patient,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// Patient Permanent Dlete :
exports.permanentDeletePatient = async (req, res) => {
    try {

        const patient =
            await patientService.permanentDeletePatientService(
                req.params.mrNumber
            );

        if (!patient) {
            return res.status(404).json({
                success: false,
                message: "Patient not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Patient permanently deleted",
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};