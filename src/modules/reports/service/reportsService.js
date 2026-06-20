// Require Models :
const Slip = require("../../../../src/modules/slip/model/slipModel");

const Patient = require("../../../../src/modules/patient/model/patientModel");

// Logic For Daily Income Report :
exports.dailyIncomeReportService =
  async () => {

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const result = await Slip.aggregate([

      {
        $match: {

          isDeleted: false,

          createdAt: {
            $gte: today,
          },

        },
      },

      {
        $group: {

          _id: null,

          totalIncome: {
            $sum: "$amount",
          },

          totalSlips: {
            $sum: 1,
          },

        },
      },

    ]);

    return {

      totalIncome:
        result[0]?.totalIncome || 0,

      totalSlips:
        result[0]?.totalSlips || 0,

    };

  };

// Logic For Monthly Income Report :
exports.monthlyIncomeReportService =
  async () => {

    const today = new Date();

    const firstDay = new Date(

      today.getFullYear(),

      today.getMonth(),

      1

    );

    const result = await Slip.aggregate([

      {
        $match: {

          isDeleted: false,

          createdAt: {
            $gte: firstDay,
          },

        },
      },

      {
        $group: {

          _id: null,

          totalIncome: {
            $sum: "$amount",
          },

          totalSlips: {
            $sum: 1,
          },

        },
      },

    ]);

    return {

      totalIncome:
        result[0]?.totalIncome || 0,

      totalSlips:
        result[0]?.totalSlips || 0,

    };

  };

// Logic For Daily Total Slips Report :
exports.dailyTotalSlipsReportService =
    async () => {

        const today = new Date();

        today.setHours(0, 0, 0, 0);

        const totalSlips =
            await Slip.countDocuments({

                isDeleted: false,

                createdAt: {
                    $gte: today,
                },

            });

        return {
            totalSlips,
        };

    };

//  Logic For Monthly Total Slips Report :
exports.monthlyTotalSlipsReportService =
    async () => {

        const today = new Date();

        const firstDay = new Date(
            today.getFullYear(),
            today.getMonth(),
            1
        );

        const totalSlips =
            await Slip.countDocuments({

                isDeleted: false,

                createdAt: {
                    $gte: firstDay,
                },

            });

        return {
            totalSlips,
        };

    };

// Logic For Daily Patient Report :
exports.dailyPatientsReportService =
    async () => {

        const today = new Date();

        today.setHours(0, 0, 0, 0);

        const totalPatients =
            await Patient.countDocuments({

                isDeleted: false,

                createdAt: {
                    $gte: today,
                },

            });

        return {
            totalPatients,
        };

    };

// Logic For Monthly Patients Reports :
exports.monthlyPatientsReportService =
    async () => {

        const today = new Date();

        const firstDay = new Date(
            today.getFullYear(),
            today.getMonth(),
            1
        );

        const totalPatients =
            await Patient.countDocuments({

                isDeleted: false,

                createdAt: {
                    $gte: firstDay,
                },

            });

        return {
            totalPatients,
        };

    };

// Logic For Daily Slip Type Report :
exports.dailySlipTypeReportService =
    async () => {

        const today = new Date();

        today.setHours(0, 0, 0, 0);

        return await Slip.aggregate([

            {
                $match: {

                    isDeleted: false,

                    createdAt: {
                        $gte: today,
                    },

                },
            },

            {
                $group: {

                    _id: "$slipType",

                    totalSlips: {
                        $sum: 1,
                    },

                    totalIncome: {
                        $sum: "$amount",
                    },

                },
            },

            {
                $sort: {
                    totalSlips: -1,
                },
            },

        ]);

    };

// Logic For Monthly Slip Type Report :
exports.monthlySlipTypeReportService =
    async () => {

        const today = new Date();

        const firstDay = new Date(
            today.getFullYear(),
            today.getMonth(),
            1
        );

        return await Slip.aggregate([

            {
                $match: {

                    isDeleted: false,

                    createdAt: {
                        $gte: firstDay,
                    },

                },
            },

            {
                $group: {

                    _id: "$slipType",

                    totalSlips: {
                        $sum: 1,
                    },

                    totalIncome: {
                        $sum: "$amount",
                    },

                },
            },

            {
                $sort: {
                    totalSlips: -1,
                },
            },

        ]);

    };

// Logic For Daily Operator Report :
exports.dailyOperatorReportService =
    async () => {

        const today = new Date();

        today.setHours(0, 0, 0, 0);

        return await Slip.aggregate([

            {
                $match: {

                    isDeleted: false,

                    createdAt: {
                        $gte: today,
                    },

                },
            },

            {
                $group: {

                    _id: "$registeredBy",

                    totalSlips: {
                        $sum: 1,
                    },

                    totalIncome: {
                        $sum: "$amount",
                    },

                },
            },

            {
                $lookup: {

                    from: "auths",

                    localField: "_id",

                    foreignField: "_id",

                    as: "operator",

                },
            },

            {
                $unwind: "$operator",
            },

            {
                $project: {

                    _id: 0,

                    operatorName:
                        "$operator.username",

                    role: "$operator.role",

                    totalSlips: 1,

                    totalIncome: 1,

                },
            },

            {
                $sort: {
                    totalSlips: -1,
                },
            },

        ]);

    };

// Logic For Monthly Operator Report :
exports.monthlyOperatorReportService =
    async () => {

        const today = new Date();

        const firstDay = new Date(
            today.getFullYear(),
            today.getMonth(),
            1
        );

        return await Slip.aggregate([

            {
                $match: {

                    isDeleted: false,

                    createdAt: {
                        $gte: firstDay,
                    },

                },
            },

            {
                $group: {

                    _id: "$registeredBy",

                    totalSlips: {
                        $sum: 1,
                    },

                    totalIncome: {
                        $sum: "$amount",
                    },

                },
            },

            {
                $lookup: {

                    from: "auths",

                    localField: "_id",

                    foreignField: "_id",

                    as: "operator",

                },
            },

            {
                $unwind: "$operator",
            },

            {
                $project: {

                    _id: 0,

                    operatorName:
                        "$operator.username",

                    role: "$operator.role",

                    totalSlips: 1,

                    totalIncome: 1,

                },
            },

            {
                $sort: {
                    totalSlips: -1,
                },
            },

        ]);

    };

// Logic For Patient History Report :
exports.patientHistoryReportService =
    async (mrNumber) => {

        const patient =
            await Patient.findOne({

                mrNumber,

                isDeleted: false,

            });

        if (!patient) {
            throw new Error(
                "Patient not found"
            );
        }

        const slips = await Slip.find({

            mrNumber,

            isDeleted: false,

        })

            .populate(
                "registeredBy",
                "username role"
            )

            .sort({ createdAt: -1 });

        return {
            patient,
            slips,
        };

    };