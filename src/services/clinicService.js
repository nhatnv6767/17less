import db from "../models/index";

let createClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.address || !data.descriptionHTML || !data.descriptionMarkdown
                || !data.image) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameters"
                });
            } else {
                await db.Clinic.create({
                    name: data.name,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown
                });
            }
            resolve({
                errCode: 0,
                errMessage: "OK"
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    createClinic: createClinic,
};