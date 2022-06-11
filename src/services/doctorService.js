import db from "../models/index";
import _ from "lodash";

require('dotenv').config();

const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;

let getTopDoctorHome = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                limit: limitInput,
                where: {roleId: "R2"},
                order: [["createdAt", "DESC"]],
                attributes: {
                    exclude: ["password"],
                },
                include: [
                    {
                        model: db.Allcode,
                        as: "positionData",
                        attributes: ["valueEn", "valueVi"],
                    },
                    {
                        model: db.Allcode,
                        as: "genderData",
                        attributes: ["valueEn", "valueVi"],
                    },
                ],
                raw: true,
                nest: true,
            });

            resolve({
                errCode: 0,
                data: users,
            });
        } catch (e) {
            reject(e);
        }
    });
};

let getAllDoctors = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctors = await db.User.findAll({
                where: {
                    roleId: "R2",
                },
                attributes: {
                    exclude: ["password", "image"],
                },
            });
            resolve({
                errCode: 0,
                data: doctors,
            });
        } catch (e) {
            reject(e);
        }
    });
};

let saveDetailInforDoctor = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (
                !inputData.doctorId ||
                !inputData.contentHTML ||
                !inputData.contentMarkdown ||
                !inputData.action
            ) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing parameter",
                });
            } else {
                if (inputData.action === 'CREATE') {
                    await db.Markdown.create({
                        contentHTML: inputData.contentHTML,
                        contentMarkdown: inputData.contentMarkdown,
                        description: inputData.description,
                        doctorId: inputData.doctorId,
                    });
                } else if (inputData.action === 'EDIT') {
                    let doctorMarkdown = await db.Markdown.findOne({
                        where: {
                            doctorId: inputData.doctorId,
                        },
                        // để hiểu doctorMardown là 1 thằng sequelize object
                        raw: false,
                    });

                    if (doctorMarkdown) {
                        doctorMarkdown.contentHTML = inputData.contentHTML;
                        doctorMarkdown.contentMarkdown = inputData.contentMarkdown;
                        doctorMarkdown.description = inputData.description;
                        // doctorMarkdown.updatedAt = new Date();
                        await doctorMarkdown.save();
                    }
                }

                resolve({
                    errCode: 0,
                    errMessage: "Save infor doctor succeed!",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let getDetailDoctorById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing parameter",
                });
            } else {
                let data = await db.User.findOne({
                    where: {id: inputId},
                    attributes: {
                        exclude: ["password"],
                    },
                    include: [
                        {
                            model: db.Markdown,
                            attributes: ["description", "contentHTML", "contentMarkdown"],
                        },
                        {
                            model: db.Allcode,
                            as: "positionData",
                            attributes: ["valueEn", "valueVi"],
                        },
                        {
                            model: db.Allcode,
                            as: "genderData",
                            attributes: ["valueEn", "valueVi"],
                        },
                    ],
                    raw: false,
                    nest: true,
                });

                // convert image -> base64
                if (data && data.image) {
                    data.image = new Buffer(data.image, "base64").toString("binary");
                }

                if (!data) {
                    data = {};
                }

                resolve({
                    errCode: 0,
                    data: data,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let bulkCreateSchedule = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.arrSchedule) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameters!!"
                });
            } else {
                let schedule = data.arrSchedule;
                if (schedule && schedule.length > 0) {
                    schedule = schedule.map(item => {
                        item.maxNumber = MAX_NUMBER_SCHEDULE;
                        return item;
                    });
                }
                console.log("Bulk Create Schedule Data", schedule);

                //  TO TEST

                /** Bulk Create Schedule Data [
                 {
                        doctorId: 32,
                        date: 1654959600000,
                        timeType: 'T1',
                        maxNumber: '10'
                      },
                 {
                        doctorId: 32,
                        date: 1654959600000,
                        timeType: 'T2',
                        maxNumber: '10'
                      },
                 {
                        doctorId: 32,
                        date: 1654959600000,
                        timeType: 'T3',
                        maxNumber: '10'
                      }
                 ]

                 *
                 * **/
                let existing = await db.Schedule.findAll({
                    where: {
                        doctorId: 32,
                        date: 1654959600000,
                    },
                    attributes: ['timeType', 'date', 'doctorId', 'maxNumber'],
                    raw: true,
                });
                let toCreate = _.differenceBy(schedule, existing, ['timeType', 'date']);
                console.log("Check by Lodash Existing", toCreate);
                console.log("Check by Lodash Find ALL", existing);

                // await db.Schedule.bulkCreate(schedule);
                resolve({
                    errCode: 0,
                    errMessage: "OK"
                });
            }

        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctors: getAllDoctors,
    saveDetailInforDoctor: saveDetailInforDoctor,
    getDetailDoctorById: getDetailDoctorById,
    bulkCreateSchedule: bulkCreateSchedule,
};
