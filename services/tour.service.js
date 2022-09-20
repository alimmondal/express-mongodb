const Tour = require("../models/Tour");

exports.getToursService = async (filters, queries) => {
  const tours = await Tour.find(filters)
    .select(queries.fields)
    .sort(queries.sortBy);
  return tours;
};

exports.createToursService = async (data) => {
  //post can be in two ways: save or create

  // 1. create
  const tour = await Tour.create(data);

  // 2. save
  // const tour = new Product(data);

  // instance creation > Do something > save()

  // if (tour.travelerQuantity == 0) {
  //   tour.status = "Cheapest";
  // }
  // const tour = await tour.save();

  return tour;
};

exports.updateTourService = async (tourId, data) => {
  //two ways to update: old & new;

  //new way;
  const result = await Tour.updateOne(
    { _id: tourId },
    { $set: data },
    {
      runValidators: true,
    }
  );

  //   old way;
  //   const tour = await Tour.findById(tourId);
  //   const result = await tour.set(data).save();

  return result;
};

exports.deleteTourByIdService = async (id) => {
  const result = await Tour.deleteOne({ _id: id });

  return result;
};
