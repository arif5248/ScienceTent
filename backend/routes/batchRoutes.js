const express = require("express");
const {
  createBatch,
  getAllBatches,
} = require("../controllers/batchcontroller");
const { isAuthenticatedUser, isAuthorizeRoles } = require("../middleware/auth");

const router = express.Router();

router
  .route("/admin/batch/new")
  .post(isAuthenticatedUser, isAuthorizeRoles("admin"), createBatch);
router
  .route("/admin/batches")
  .get(isAuthenticatedUser, isAuthorizeRoles("admin"), getAllBatches);

module.exports = router;
