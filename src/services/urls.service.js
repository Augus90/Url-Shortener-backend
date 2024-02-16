const { models } = require("mongoose");
const model = require("../db/models/url.model");
const boom = require("@hapi/boom");

async function shotenURL(longUrl) {
  const alreadyExist = await model.findOne(longUrl);
  if (alreadyExist !== null) {
    console.log(`Found ${alreadyExist.full} in the database`);
    return alreadyExist;
  }

  const shortUrl = await new model(longUrl);
  return shortUrl.save();
}

async function findAll() {
  const allUrl = await model.find();

  return allUrl;
}

async function findURL(url) {
  const longUrl = await model.findOne(url);

  if (longUrl === null) {
    throw boom.notFound("No URL Found");
  }

  if (longUrl.expire && longUrl.expire < Date.now()) {
    await model.deleteOne(longUrl);
    throw boom.notFound("URL already expired");
  }

  longUrl.clicks++;
  longUrl.save();

  return longUrl;
}

async function remove(url) {
  const longUrl = await model.findOne(url);
  if (longUrl === null) {
    throw boom.notFound("URL not found");
  }

  return model.deleteOne(longUrl);
}

async function rename(oldName, newName) {
  const longUrl = await model.findOne({
    short: oldName,
  });

  if (longUrl == null) throw boom.notFound("Not Found URL");

  longUrl.short = newName;
  longUrl.save();

  return longUrl;
}

module.exports = {
  shotenURL,
  findURL,
  findAll,
  remove,
  rename,
};
