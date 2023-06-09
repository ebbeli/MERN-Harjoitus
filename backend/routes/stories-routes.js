const express = require("express");
const storiesControllers = require("../controllers/story-controllers");

const router = express.Router();

router.get("/user/:uid", storiesControllers.getUsersStories);
router.get("/", storiesControllers.getAll);
router.post("/", storiesControllers.newStory);
router.get("/:id", storiesControllers.getStory);
router.post("/delete", storiesControllers.deleteStory);

module.exports = router;
