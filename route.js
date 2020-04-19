const router = require("express").Router();
const PollController = require("./controllers/PollController");

router.get("/", PollController.index);
router.get("/create", PollController.create);
router.post("/store", PollController.store);
router.get("/polls/:id", PollController.show);
router.post("/polls/:id", PollController.storeOpinion);
    


module.exports = router;