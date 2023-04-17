const express = require('express');
const HttpError = require('../models/http-error');
const User = require('../models/user');
const mongoose = require('mongoose');

/*
function updateByKey(obj, updatedObj) {
    Object.keys(obj).forEach((key, index) => {
        updatedObj[key] = obj[key];
    });
    return updatedObj;
}
//HARDCODED - MAY NOT WORK
const updateUserById = (req, res, next) => {
    if(req.body === null || !req.body){
        return next(new HttpError('Request was empty', 400));
    }
    const user = req.body;
    const userId = parseInt(req.params.uid);
    const updatedUser = {...TESTIUSERS.find(u => u.id === userId)};
    const userIndex = TESTIUSERS.findIndex(p => p.id === userId);
    if(!updatedUser){
        return next(new HttpError('User could not been found', 404));
    }
    updatedUser = updateByKey(user, updatedUser);
    TESTIUSERS[userIndex] = updatedUser;
    res.status(200).json({user:updatedUser});
    console.log('Updated data:' + updatedUser);
}*/

const countUsers = async (req, res, next) => {
    try {
    await User.countDocuments({}, function (err, count){
        console.log('There are ' + count + ' users');      
        return res.status(201).json({message : 'User count is ' + count});
    })
    } catch{
        next(new HttpError("Counting failed, please try again!", 500));
    }
}

const createUser = async (req, res, next) => {
    const {email, password, name, city, birthyear, picurl} = req.body;
        const createdUser = new User ({
            email,
            password,
            name,
            city,
            birthyear,
            picurl
        });

        try {
            await createdUser.save();
        }catch (err){
            return next(new HttpError("Creating user failed, please try again!", 500));
        }
    res.status(201).json({message: 'Created user: ' + name});
}


const deleteUserById =  async (req, res, next) => {
    const userId = req.params.uid;
    await User.deleteOne({_id: userId }).then(function(){
        console.log("Data deleted"); // Success
    }).catch(function(error){
        console.log(error); // Failure
    });
}

const getAllUsers = async (req, res, next) => {
    let allUsers = [];
    try{

        allUsers = await User.find({}).select('-password').select('-email');
        console.log(allUsers);

    }catch{
        return next(new HttpError("Could not retrieve users data, please try again!", 500));
    }
    if(allUsers === [] || allUsers === null){
        console.log("No users found");
        return next(new HttpError('Could not find users(Maybe there is no users)', 404));
    }else{
        res.status(200).json(allUsers);
        console.log("getAllUsers works");
    }
}

const getUserById = async (req, res, next)  => {
    const userId = req.params.uid;
    let user;
    try{
        user = await User.findOne({_id: userId});   
    }catch{
        console.log("getUser: id not found");
        return next(new HttpError('User not retrieved, try again', 500))
    }
    if(!user || user === null){
        console.log("getUser - Id: " + userId +  " did not match");
        return next(new HttpError('User not found,', 404))
    }
    res.status(200).json({user});
    console.log("getUser works");
}


const login = (req, res, next) => {
    res.send({
        "token": 'test',
        "uid": "62fa2ebc0fa49e3840a9dbd1"
    });
}

exports.createUser = createUser;
exports.deleteUser = deleteUserById; // delete user
exports.getUser = getUserById;
exports.getAll = getAllUsers;
exports.login = login;
exports.count = countUsers; // Count users
