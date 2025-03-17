const router = require("express").Router();
const { checkToken } = require("../utils/auth");
const userController = require("../controllers/index.controller");

router.get('/', (req, res) => {
    res.send('Welcome to Dompetku API!');
})

router.post('/transactions', checkToken, userController.AddTransaction);
router.get('/dashboard/:email/:token', checkToken, userController.GetTransactions);

router.post("/create-transaction", userController.MidtransTransaction);
router.post("/midtrans-webhook", userController.MidtransWebHook);
router.get("/receipt/:order_id", userController.GetUserTransactions);

router.post('/my-token', userController.SignInToken);
router.post('/signup', userController.SignUpUser);

router.post("/notes", checkToken, userController.AddNote);
router.get("/notes/:email/:token", checkToken, userController.GetNote);
router.put("/notes/:email/:token/:id", checkToken, userController.UpdateNote);
router.delete("/notes/:email/:token/:id", checkToken, userController.DeleteNote);

router.post("/plans", checkToken, userController.AddPlan);
// router.get("/plans/:email/:token", checkToken, userController.GetPlan);
// router.put("/plans/:email/:token/:id", checkToken, userController.UpdatePlan);
router.delete("/plans/:email/:token/:id", checkToken, userController.DeletePlan);

module.exports = router;