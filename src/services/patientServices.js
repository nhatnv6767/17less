import db from "../models/index";
import _ from "lodash";

require('dotenv').config();

let postBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameters"
                });
            } else {
                // upsert patient
                let user = await db.User.findOrCreate({
                    where: {
                        email: data.email
                    },
                    // if dont have email
                    defaults: {
                        email: data.email,
                        roleId: 'R3'
                    },
                });

                console.log("Check user: ", user[0]);
                // create a booking record
                if (user) {
                    // await db.
                }

                resolve({
                    errCode: 0,
                    errMessage: "OK",
                });
            }

        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    postBookAppointment: postBookAppointment,
};
