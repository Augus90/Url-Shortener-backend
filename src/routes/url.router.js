const { Router } = require("express");
const service = require("../services/urls.service");
const validatorHandler = require("../middlewares/validator.handler");
const { createUrl, getShortUrl, changeName } = require("../schemas/url.shema");

const router = Router();

router.get("/", async (req, res) => {
  // #swagger.tags = ['URL']
  const allUrls = await service.findAll();

  const urlDTO = allUrls.map((url) => ({
    long: url.full,
    short: url.short,
    clicks: url.clicks,
  }));

  res.status(200).send(urlDTO);
});

router.post("/", validatorHandler(createUrl, "body"), async (req, res) => {
  // #swagger.tags = ['URL']
  const longURL = {
    full: req.body.url,
    category: req.body.category,
  };

  const shortURL = await service.shotenURL(longURL);

  res.status(201).send({
    long: shortURL.full,
    short: shortURL.short,
  });
});

router.delete(
  "/",
  validatorHandler(getShortUrl, "body"),
  async (req, res, next) => {
    // #swagger.tags = ['URL']
    const shortURL = {
      short: req.body.shortUrl,
    };
    try {
      service.remove(shortURL);
      res.status(202).send({ response: "Deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:shorturl",
  validatorHandler(getShortUrl, "params"),
  validatorHandler(getShortUrl, "body"),
  async (req, res, next) => {
    // #swagger.tags = ['URL']
    const shortURL = req.body.shortUrl;
    const newName = req.params.shorturl;

    try {
      const newURL = await service.rename(shortURL, newName);

      res.status(200).send({
        full: newURL.full,
        short: newURL.short,
        clicks: newURL.clicks,
        category: newURL.category,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
