import mongoose from "mongoose";
import moment from "moment-timezone";

const IST = "Asia/Kolkata"; // Indian Standard Time zone

const dataInfo = new mongoose.Schema({
  subject: {
    type: String,
    required: true
  },
  sheet: {
    type: String,
    required: true
  },
  numbers: {
    questionIndex: {
      type: Number,
      default: 0
    },
    maxValue: {
      type: Number,
      default:1000
    },
    generatedNumbers: {
      type: [Number],
      default: []
    }
  },
  createdOn: {
    type: String, // Store as string for custom formatting
    default: () => moment().tz(IST).format("DD-MM-YYYY HH:mm") // Default to current date in IST
  },
  updatedOn: {
    type: String, // Store as string for custom formatting
    default: () =>moment().tz(IST).format("DD-MM-YYYY HH:mm") // Default to current date in IST
  }
});

// Update the updatedOn field before saving
dataInfo.pre('save', function(next) {
  this.updatedOn = moment().tz(IST).format("DD-MM-YYYY HH:mm");
  next();
});

const DataInfo = mongoose.model('List', dataInfo);

export default DataInfo;
