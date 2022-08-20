import { Router } from "express";

import { getStories, createStory } from "../controllers/stories.js";

const storyRoutes = Router();

storyRoutes.get("/", getStories);
storyRoutes.post("/", createStory);

export default storyRoutes;
