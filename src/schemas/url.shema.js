const joi = require("joi");

const longUrl = joi.string().uri();
const category = joi.string().min(3).max(20);
const expireDate = joi.date();
const shortUrl = joi.string().min(3).max(9);
const newName = joi.string().min(3).max(9);

const createUrl = joi.object({
  url: longUrl.required(),
  category: category,
  expireDate: expireDate,
});

const getShortUrl = joi.object({
  shortUrl: shortUrl.required(),
});

const changePropeties = joi.object({
  shortUrl: shortUrl.required(),
  newName: newName,
  category: category,
  expireDate: expireDate,
});

module.exports = { createUrl, getShortUrl, changePropeties };
