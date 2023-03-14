const express = require('express')
const router = express.Router()
const jobPostModel = require('../Models/jobPostModel')
const jobApplicationModel = require('../Models/jobApplication')
const emailModel = require('../Models/emailModel')
const companyModel = require('../Models/companyModel')
const skillModel = require('../Models/skillModel')
const multer = require('multer');
const upload = multer();
const nodemailer = require('nodemailer')
const moment = require('moment');
const cloudinary = require('cloudinary').v2;

// const date = new Date();
// const formattedDate = format(date, 'dd/MM/yyyy');

///[GET] http://localhost:5000/company
const listPost = async (req, res, next) => {
    try {
        jobPostModel.find({})
            .then(listpost => {
                // console.log(listpost)
                const a = listpost?.filter((post) => {
                    const regex = new RegExp(req.username, 'i');
                    return post?.namecompany && regex.test(post.namecompany);
                });
                res.json(a)

            })
            .catch(next)
    } catch (error) {
        console.log(error);
    }
}

const listCV = async (req, res, next) => {
    try {
        jobApplicationModel.find()
            .then(listpost => {
                // console.log(listpost)
                const a = listpost?.filter((post) => post?.namecompany === req.username)
                res.json(a)

            })
            .catch(next)

    } catch (error) {
        console.log(error);
    }

}

/// [GET] http://localhost:5000/company/details/:id
const showDetails = (req, res, next) => {
    try {
        jobPostModel.findOne({ _id: req.params.accId })
            .then(account =>
                res.json(account)
            )
            .catch(next)
    } catch (error) {
        console.log(error);
    }

}

const showDetails_cv = (req, res, next) => {
    try {
        jobApplicationModel.findOne({ _id: req.params.accId })
            .then(account =>
                res.json(account)
            )
            .catch(next)
    } catch (error) {
        console.log(error);
    }

}

/// [POST] http://localhost:5000/company/create
const createPost = async (req, res, next) => {
    try {
        //get info user 
        const { benefit, expdate, gender, location, namecompany, title, required, salary, skill, responsibility } = req.body;
        if (!benefit || !expdate || !gender || !location || !namecompany
            || !title || !required || !salary || !responsibility || !skill) {
            cloudinary.uploader.destroy(req.file.filename)
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
        // const {expdate2} = "23/04/20223"
        console.log(req.file);
        // const filePath = req.file.path.replace(/\\/g, '/');
        // const expdate2 = moment.utc("23/04/2023", "DD/MM/YYYY").local();
        const jobpost = await jobPostModel.create({
            benefit: benefit,
            expdate: expdate,
            gender: gender,
            location: location,
            namecompany: namecompany,
            title: title,
            required: required,
            salary: salary,
            logo: req.file.path,
            skill: skill,
            responsibility: responsibility,
            verify: false

        })
        return res.json({
            success: true,
            message: "create jobpost success",
            jobpost: jobpost
        })
    } catch (error) {
        console.log(error);
    }
}

/// [PUT] http://localhost:5000/company/details/:id
const update = (req, res, next) => {
    try {
        jobPostModel.updateOne({ _id: req.params.accId }, req.body)
            .then(() => res.json(req.body))
            .catch(next)
    } catch (error) {
        console.log(error);
    }

}
/// [DELETE]  http://localhost:5000/company/:id
const Delete = (req, res, next) => {
    try {
        jobPostModel.findByIdAndDelete({ _id: req.params.accId }, req.body)
            .then(() => res.json({
                success: true,
                userDetele: req.body
            }))
            .catch(next)
    } catch (error) {
        console.log(error);
    }

}

const send_email = (req, res, next) => {
    console.log(req.body)
    const tranforter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.AUTH_EmailSend,
            pass: process.env.AUTH_Pass,
        }
    })

    const mailOptions = {
        from: req.body.fromEmail,
        to: req.body.toEmail,
        subject: `Message from ${req.body.fromEmail}: ${req.body.subject}`,
        text: req.body.message
    }

    tranforter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log("email sent " + info.response)
        }
    })

    const emailsend = emailModel.create({
        fromemail: req.body.fromEmail,
        toemail: req.body.toEmail,
        subject: req.body.subject,
        content: req.body.message,
    })

    return res.status(200).json({
        success: true,
        message: "send mail success",
        emailsend: emailsend
    })


}

const update_profile = (req, res, next) => {
    try {
        const {introduce, slogan} = req.body
        companyModel.findOneAndUpdate({emailcompany: req.email},{
            introduce: introduce,
            slogan: slogan,
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

const profile = (req, res,next) => {
    try {
        companyModel.find({emailcompany: req.email})
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
module.exports = {
    listPost: listPost,
    listCV: listCV,
    showDetails: showDetails,
    createPost: createPost,
    update: update,
    Delete: Delete,
    showDetails_cv: showDetails_cv,
    send_email: send_email,
    update_profile: update_profile,
    profile: profile
    // Upload: Upload
}

