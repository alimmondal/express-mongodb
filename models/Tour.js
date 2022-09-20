const mongoose = require("mongoose");

// schema design
const tourSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please provide a name for this tour"],
      trim: true,
      unique: [true, "name must be unique"],
      minLength: [3, "name must be at least 3 characters"],
      maxLength: [100, "name is too large"],
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "price can't be negative"],
    },
    location: {
      type: String,
      required: true,
      enum: {
        values: ["Jaflong", "Cox's Bazar", "HillTracts"],
        message: "location value must be {VALUE}",
      },
    },
    travelerQuantity: {
      type: Number,
      required: true,
      min: [0, "quantity can't be negative"],
      validate: {
        validator: (value) => {
          const isInteger = Number.isInteger(value);
          if (isInteger) {
            return true;
          } else {
            return false;
          }
        },
      },
      message: "Quantity must be an integer.",
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["top-viewed", "cheapest", "discontinued"],
        message: "status can't be {VALUE}",
      },
    },
  },
  {
    timestamps: true,
  }
);

//SCHEMA > MODEL > QUERY
const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
