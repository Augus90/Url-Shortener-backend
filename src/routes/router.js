const { Router } = require("express");
const service = require("../services/urls.service");
const validatorHandler = require("../middlewares/validator.handler");
const { getShortUrl } = require("../schemas/url.shema");
const urlRouter = require("./url.router");

const router = Router();

router.use("/url", urlRouter);

router.get(
  "/:shortUrl",
  validatorHandler(getShortUrl, "params"),
  async (req, res, next) => {
    // #swagger.tags = ['URL']
    const shotURl = {
      short: req.params.shortUrl,
    };

    try {
      const longUrl = await service.findURL(shotURl);

      if (longUrl == null) {
        next({ message: "Couldn't find URL" });
      }

      res.status(200).send({ url: longUrl.full });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
