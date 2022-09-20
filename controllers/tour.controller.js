const Product = require("../models/Tour");
const {
  getToursService,
  createToursService,
  updateTourService,
  deleteTourByIdService,
} = require("../services/tour.service");

exports.getTours = async (req, res, next) => {
  try {
    let filters = { ...req.query };

    //sort, page, limit > exclude
    const excludeFields = ["sort", "page", "limit"];
    excludeFields.forEach((field) => delete filters[field]);

    //gt,lt,gte,lte
    let filtersString = JSON.stringify(filters);
    filtersString = filtersString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );
    filters = JSON.parse(filtersString);

    const queries = {};

    if (req.query.sort) {
      // price,quantity > 'price quantity'
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
      console.log(sortBy);
    }
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queries.fields = fields;
      console.log(fields);
    }

    const tours = await getToursService(filters, queries);

    res.status(200).json({
      status: "success",
      data: tours,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Can't get the data",
      error: error.message,
    });
  }
};

exports.createTour = async (req, res, next) => {
  //post can be in two ways: save or create
  try {
    //or create
    const result = await createToursService(req.body);

    res.status(200).json({
      status: "Success",
      message: "Data inserted successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "data inserted failed",
      error: error.message,
    });
  }
};

exports.updateTour = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateTourService(id, req.body);

    res.status(200).json({
      status: "Success",
      message: "Data updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "couldn't update the tour",
      error: error.message,
    });
  }
};

exports.deleteTourById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteTourByIdService(id);

    if (!result.deletedCount) {
      return res.status(400).json({
        status: "fail",
        error: "Couldn't delete the tour",
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Tours deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "couldn't delete the tour",
      error: error.message,
    });
  }
};
