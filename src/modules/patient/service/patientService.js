// Require Patient Model :
const Patient = require("../../../../src/modules/patient/model/patientModel");

// Logic For Generate MR Number :
const generateMrNumber = async () => {

    const lastPatient = await Patient.findOne()
        .sort({ createdAt: -1 });

    if (!lastPatient || !lastPatient.mrNumber) {
        return "MR-1001";
    }

    const lastMr = parseInt(
        lastPatient.mrNumber.split("-")[1]
    );

    return `MR-${lastMr + 1}`;
};

// Logic For Register Patient :
exports.createPatientService = async (data, userId) => {

    // Check Existing Patient
    const existingPatient = await Patient.findOne({
        patientName: data.patientName.trim(),
        phone: data.phone,
        guardianName: data.guardianName?.trim(),
        isDeleted: false,
    });

    if (existingPatient) {

        throw {
            statusCode: 409,
            message: "Patient already registered",
            patient: existingPatient,
        };

    }

    const mrNumber = await generateMrNumber();

    const patient = await Patient.create({
        ...data,
        mrNumber,
        createdBy: userId,
    });

    return patient;
};

// Logic For Get All Patients :
exports.getAllPatientsService = async (query) => {

    const filters = {
        isDeleted: false,
    };

    // Search Filters :
    if (query.search) {

        filters.$or = [
            {
                patientName: {
                    $regex: query.search,
                    $options: "i",
                },
            },

            {
                phone: {
                    $regex: query.search,
                    $options: "i",
                },
            },

            {
                mrNumber: {
                    $regex: query.search,
                    $options: "i",
                },
            },
        ];

    }

    // Gender Filter :
    if (query.gender) {
        filters.gender = query.gender;
    }

    return await Patient.find(filters)
        .populate("createdBy", "username role")
        .sort({ createdAt: -1 });

};

// Logic For  Get Single Patient By MR Number :
exports.getPatientByMrService = async (mrNumber) => {

    return await Patient.findOne({
        mrNumber,
        isDeleted: false,
    }).populate("createdBy", "username role");

};

// Logic For Update Patient :
exports.updatePatientService = async (mrNumber, data) => {

    return await Patient.findOneAndUpdate(
        {
            mrNumber,
            isDeleted: false,
        },

        data,

        {
            new: true,
        }
    );

};

// Logic For Soft Delete Patient :
exports.softDeletePatientService = async (mrNumber) => {

    return await Patient.findOneAndUpdate(
        {
            mrNumber,
        },

        {
            isDeleted: true,
        },

        {
            new: true,
        }
    );

};

// Logic For Permanent Delete Patient :
exports.permanentDeletePatientService = async (mrNumber) => {

    return await Patient.findOneAndDelete({
        mrNumber,
    });

};