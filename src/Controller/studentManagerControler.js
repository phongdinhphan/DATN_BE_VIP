const express = require('express')
const router = express.Router()
const jobPostModel = require('../Models/jobPostModel')
const jobApplicationModel = require('../Models/jobApplication')
const studentModel = require('../Models/studentModel')
const skillModel = require('../Models/skillModel')
const companyModel = require('../Models/companyModel')
const accountModel = require('../Models/accountModel')




///[GET] http://localhost:5000/company
const listPost = async (req, res, next) => {
    try {
        jobPostModel.find({})
            .then(listPost => {
                res.json(listPost)
            })
            .catch(next)
    }
    catch (error) {
        console.log(error)
    }
}

const listCV = async (req, res, next) => {
    try {
        jobApplicationModel.find({})
            .then(listapp => {
                //console.log(listapp)
                const a = listapp?.filter((app) => {
                    const regex = new RegExp(req.email, 'i');
                    return app?.email && regex.test(app.email);
                });
                res.json(a)

            })
            .catch(next)
    } catch (error) {
        console.log(error)

    }


}

/// [GET] http://localhost:5000/company/details/:id
const detailsPost = (req, res, next) => {
    try {
        jobPostModel.findOne({ _id: req.params.accId })
            .then(account =>
                res.json(account)
            )
            .catch(next)
    } catch (error) {
        console.log(error)

    }

}

const detailsCV = (req, res, next) => {
    try {
        jobApplicationModel.findOne({ _id: req.params.accId })
            .then(account =>
                res.json(account)
            )
            .catch(next)
    } catch (error) {
        console.log(error)

    }

}

/// [POST] http://localhost:5000/company/create
const createCV = async (req, res, next) => {
    try {
        // get info user 
        const { name, major, email, namecompany, nameschool, title} = req.body;
        if (!name || !major || !email || !namecompany
            || !nameschool) {
            return res.status(400).json({
                success: false,
                message: "missing"
            })
        }
        if (!req.file) {
            res.send({
                status: false,
                message: "No files"
            })
        }
        const now = new Date();
        console.log(now);
        console.log(req.file);
        const jobaplli = await jobApplicationModel.create({
            date: now,
            name: name,
            major: major,
            email: email,
            namecompany: namecompany,
            nameschool: nameschool,
            status: "Đang chờ xác nhận",
            url: req.file.path,
            verify: false,
            title: title,
        })
        return res.json({
            success: true,
            message: "create jobapp success",
            jobaplli: jobaplli
        })
    } catch (error) {
        console.log(error)
    }
}


/// [PUT] http://localhost:5000/update-profile
const update_profile = (req, res, next) => {
    try {
        const { studentname, academicyear, address, code, major, school } = req.body
        studentModel.findOneAndUpdate({ studentemail: req.email }, {
            studentname: studentname,
            academicyear: academicyear,
            address: address,
            code: code,

            major: major,
            school: school,
        })
            .then(() => {
                res.json({
                    success: true,
                    profile: req.body
                })
            })
            .catch(next)
    } catch (error) {
        console.log(error);
    }

}

const profile = (req, res, next) => {
    try {
        studentModel.find({ studentemail: req.email })
            .then((profile) => {
                res.json({
                    success: true,
                    profile: profile
                })
            })
            .catch(next)
    } catch (error) {
        console.log(error);
    }

}

const listSkill = async (req, res, next) => {
    try {
        skillModel.find({})
            .then(listskill => {
                res.json(listskill)
            })
            .catch(next)
    } catch (error) {
        console.log(error);
    }
}

const reset_pass = async (req, res, next) => {
    try {
        const { newpassword, confpassword } = req.body;
        if (!newpassword || !confpassword) {
            return res.status(400).json({
                success: false,
                message: "missing"
            })
        }
        const check = await accountModel.findOneAndUpdate({ email: req.email }, { password: newpassword })

        if (!check) {
            return res.status(400).json({
                success: false,
                message: "email encorrect"
            })
        }

        if (confpassword != newpassword) {
            return res.status(400).json({
                success: false,
                message: "confirm password incorrect"
            })
        }
        return res.status(200).json({
            success: true,
            User: check,

        })
    } catch (error) {
        console.log(error);
    }
}

const add_favorite = async (req, res,next) => {
    try {
        studentModel.updateOne({ studentemail: req.email },{ $push: { favorite:  req.params.accId }})
            .then((profile) => {
                res.json({
                    success: true,
                    message: "Add success",
                    profile:profile,
                })
            })
            .catch(next)
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    listPost: listPost,
    listCV: listCV,
    createCV: createCV,
    detailsCV: detailsCV,
    detailsPost: detailsPost,
    update_profile: update_profile,
    profile: profile,
    listSkill: listSkill,
    reset_pass: reset_pass,
    add_favorite: add_favorite,
}

