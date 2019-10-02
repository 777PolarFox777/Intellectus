const express = require('express');
const bodyParser = require('body-parser');
const statistics = require('../db/dao/StatisticsDao');
const session = require('../utils/session');
const testPack = require('../utils/testPack');

const urlencodedParser = bodyParser.urlencoded({ extended: false });
const router = express.Router();

router.post('/', urlencodedParser, (req, res) => {
  const { answers } = req.body;
  const { token } = req.body;

  if (!(answers && token)) {
    res.status(400).json({
      error: true,
      message: 'Данные не отправлены.',
    });

    return;
  }

  const test = session.getSession(token);
  const rightOptions = testPack.rightOptions(test);

  res.status(201).json({
    rightOptions,
    statistics: statistics.get(),
  });
});

module.exports = router;
