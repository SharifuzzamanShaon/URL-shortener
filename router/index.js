const router = require("express").Router();
const { redirectToOrginal } = require("../controller/redirectToOrginal");

router.get("/:shortUrl", redirectToOrginal);

module.exports = router;