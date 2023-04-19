const express = require("express");
const HttpError = require("../models/http-error");
const Story = require("../models/story");
const User = require("../models/user");
const mongoose = require("mongoose");

//    { "story" : "Oli kivaa", "date" : "22.5.2022", "city" : "Siilinjärvi", "picurl" : "https://picsum.photos/100/100",  "user" :{ "uid": "62fa2ebc0fa49e3840a9dbd1",  "name" : "Eino Rissanen"}},
const TESTISTORIES = [
  {
    uid: "62fa2ebc0fa49e3840a9dbd1",
    id: 1,
    story: "Oli kivaa",
    name: "Eino Rissanen",
    date: "22.5.2022",
    city: "Siilinjärvi",
  },
  {
    uid: "62fa2ebc0fa49e3840a9dbd1",
    id: 2,
    story: "Jee Jee!",
    name: "Eino Rissanen",
    date: "11.6.2022",
    city: "Paikka",
  },
  {
    uid: "62fa2ebc0fa49e3840a9dbd1",
    id: 3,
    story: "Jos sul lysti on!",
    name: "Eino Rissanen",
    date: "30.12.1993",
    city: "Kuopio",
  },
  {
    uid: "62fa2dd3ea1ec41dec209758",
    id: 4,
    story: "Olipa Kerran!",
    name: "Anni Matikainen",
    date: "30.12.1993",
    city: "Oulu",
  },
];

const createStory = async (req, res, next) => {
  const { story, date, city, picurl, user } = req.body;
  let createdStory = new Story({
    story,
    date,
    city,
    picurl,
    user,
  });
  try {
    await createdStory.save();
  } catch (err) {
    console.log(err);
    return next(
      new HttpError("Creating story failed, please try again! ;", 500)
    );
  }
  res.status(201).json({ message: "Created story" });
};

function updateByKey(obj, updatedObj) {
  Object.keys(obj).forEach((key, index) => {
    updatedObj[key] = obj[key];
  });
  return updatedObj;
}
const getAllStories = async (req, res, next) => {
  let stories = [];
  try {
    stories = await Story.find({});
  } catch {
    return next(new HttpError("Could not retrieve data from DB", 500));
  }
  if (!stories || stories === null || stories === []) {
    console.log("DB could not been found");
    return next(new HttpError("Stories could not been found", 404));
  }
  res.status(200).send(stories);
  console.log("getAllStories works");
};

const getUsersStories = async (req, res, next) => {
  const userId = mongoose.Types.ObjectId(req.params.uid);
  console.log(userId);

  let stories = [];
  try {
    stories = await Story.find({ "user.id": userId });
  } catch {
    return next(
      new HttpError("Could not retrieve story data, please try again!", 500)
    );
  }
  if (!stories || stories === [] || stories === null) {
    console.log(
      "getUsersStores: Data could not been found(Maybe user does not have any)"
    );
    return next(
      new HttpError(
        "Stories could not been found(Maybe user does not have any)",
        404
      )
    );
  }

  res.status(200).json(stories);
  console.log("Users stories retrieved succesfully");
};

const getStory = async (req, res, next) => {
  const storyId = mongoose.Types.ObjectId(req.params.id);
  const story = await Story.findById(storyId);
  if (!story || story === null) {
    console.log("getStory: id not found");
    return next(new HttpError("Story could not been found", 404));
  }
  res.status(200).json(story);
  console.log("Story retrieved succesfully");
};
exports.getUsersStories = getUsersStories;
exports.newStory = createStory;
exports.getStory = getStory;
exports.getAll = getAllStories;
