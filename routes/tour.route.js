const express = require("express");
const router = express.Router();
const toursControllers = require("../controllers/tour.controller");

router
  .route("/")
  .get(toursControllers.getTours)
  .post(toursControllers.createTour);

router
  .route("/:id")
  .patch(toursControllers.updateTour)
  .delete(toursControllers.deleteTourById);

module.exports = router;
