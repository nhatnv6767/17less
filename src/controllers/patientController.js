import doctorService from "../services/doctorService";

let postBookAppointment = async (req, res) => {
    try {
        let infor = await doctorService.getProfileDoctorById(req.body);
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res
            .status(200)
            .json({errCode: -1, errMessage: "Error from server"});
    }
};

Module.exports = {
    postBookAppointment: postBookAppointment
};