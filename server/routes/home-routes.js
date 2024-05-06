import express from "express";

import { getUser, getFriends, home, getMessages, searchUsers, updateUser, getFriendRequests, getUserProfileData, rejectRequest, getMessagesByFriendId, getNotifications, clearAllNotifications } from "../controllers/home-controller.js";
import { deleteFriend, deleteUser } from "../controllers/dev-controller.js";
import { verifyToken } from "../middleware/auth-middleware.js";

const router = express.Router();


router.get('/', verifyToken, home);

router.get('/getuser', verifyToken, getUser);
router.patch('/updateuser', verifyToken, updateUser);
router.get('/getfriends', verifyToken, getFriends);

router.get('/getmessages', verifyToken, getMessages);
router.get('/getmessagesbyfriendid', verifyToken, getMessagesByFriendId);

router.get('/searchusers', verifyToken, searchUsers);
router.get('/getfriendrequests', verifyToken, getFriendRequests);
router.post('/getuserprofiledata', verifyToken, getUserProfileData);

router.post('/rejectrequest', verifyToken, rejectRequest);
router.post('/deleteuser', deleteUser);
router.post('/deletefriend', deleteFriend);

router.get('/getnotifications', verifyToken, getNotifications);
router.post('/clearallnotifications', verifyToken, clearAllNotifications);


export default router;