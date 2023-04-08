const express = require('express')
const router = express.Router()
const reportModel = require('../Models/reportModel')
const nodemailer = require('nodemailer')


const listReport = async (req, res, next) =>{
    try {
        reportModel.find({})
        .then(listReport => {
            res.json(listReport)
        })
        .catch(next)
    } catch (error) {
        console.log(error)
    }
  }
  const send_Email_Report = (req, res, next) => {
    try {

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
            subject: `Message from ${req.body.fromEmail}: ${req.body.subject} Report your post`,
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
        

        // const emailsend = emailModel.create({
        //     fromemail: req.body.fromEmail,
        //     toemail: req.body.toEmail,
        //     subject: req.body.subject,
        //     content: req.body.message,
        // })
        .catch(next)
    } catch (error) {
    }
}


module.exports ={
    listReport: listReport,
    send_Email_Report: send_Email_Report

}