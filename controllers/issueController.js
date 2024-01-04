const mongoose = require('mongoose')
const Issue = require('../models/IssueModel.js')
const { StatusCodes } = require('http-status-codes')


const getAllIssues = async (req, res) => {
    const allIssues = await Issue.find(req.query)
    res.status(StatusCodes.OK).json(allIssues)
};

const addNewIssue = async (req, res) => {
    let project = req.params.project;
    const { issue_title, issue_text, created_by } = req.body;
    if (!issue_title || !issue_text || !created_by) return res.status(StatusCodes.OK).json({ error: "required field(s) missing" })
    const newIssue = await Issue.create(req.body);
    res.status(StatusCodes.OK).json(newIssue);
};

const updateIssue = async (req, res) => {
    const id = req.body._id;
    if (!id) return res.status(StatusCodes.OK).json({ error: "missing _id" })
    const { issue_title, issue_text, created_by, assigned_to, status_text } = req.body;
    const inputFields = [issue_title, issue_text, created_by, assigned_to, status_text];
    const noInputFields = inputFields.every((field) => field === undefined);
    if (noInputFields) return res.status(StatusCodes.OK).json({ error: 'no update field(s) sent', _id: id })
    req.body.updated_on = new Date();
    try {
        const updatedIssue = await Issue.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedIssue) return res.status(StatusCodes.OK).json({ error: "could not update", _id: id })
    } catch (error) {
        return res.status(200).json({ error: "could not update", _id: id })
    }
    res.status(StatusCodes.OK).json({ result: "successfully updated", _id: id });
};

const deleteIssue = async (req, res) => {
    const id = req.body._id;
    if (!id) return res.status(StatusCodes.OK).json({ error: "missing _id" })
    try {
        const deletedIssue = await Issue.findByIdAndDelete(id);
        if (!deletedIssue) return res.status(StatusCodes.OK).json({ error: "could not delete", _id: id })
    } catch (error) {
        return res.status(200).json({ error: "could not delete", _id: id })
    }
    res.status(StatusCodes.OK).json({ result: "successfully deleted", _id: id })
};

module.exports = {
    getAllIssues,
    addNewIssue,
    updateIssue,
    deleteIssue
};