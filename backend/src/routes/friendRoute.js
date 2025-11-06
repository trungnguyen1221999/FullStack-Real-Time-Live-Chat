import express from "express";

import {
    acceptFriendRequest,
    addFriend,
    declineFriendRequest,
    getAllFriends,
    getFriendRequests
} from "../controller/friendController.js";

const router = express.Router();

router.post("/requests", addFriend);
router.post("/requests/:requestId/accept/", acceptFriendRequest);
router.post("/requests/:requestId/decline/", declineFriendRequest);
router.get("/", getAllFriends);
router.get("/requests", getFriendRequests);

export default router;
