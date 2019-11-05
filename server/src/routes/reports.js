const validator = require('validator');
const express = require('express');
const bot = require('../utils/bot');
const transporter = require('../utils/mailSender');

const router = express.Router();
const minLengthName = 2;
const maxLengthName = 25;
const minNumberOfQuestions = 1;
const maxNumberOfQuestions = 12;

router.post('/', async (req, res) => {
  const {
    name, email, token, body, numberOfQuestion,
  } = req.body;
  const checkExistParams = name && email && token && body && numberOfQuestion;

  if (!checkExistParams) {
    return res.status(400).json({
      error: true,
      message: 'Данные не отправлены.',
    });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({
      error: true,
      message: 'Некорректный Email.',
    });
  }

  if (name.length < minLengthName || name.length > maxLengthName) {
    return res.status(400).json({
      error: true,
      message: `Имя должно содержать от ${minLengthName} до ${maxLengthName} символов.`,
    });
  }

  if (numberOfQuestion < minNumberOfQuestions || numberOfQuestion > maxNumberOfQuestions) {
    return res.status(400).json({
      error: true,
      message: 'Некорректный номер задания.',
    });
  }

  const message = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    subject: 'Репорт',
    html: `Имя - ${name} <br> Cообщение - ${body} <br> Токен - ${token} <br> Email - 
    ${email} <br> NumberOfQuestion - ${numberOfQuestion}`,
  };

  try {
    await transporter.mailSender(message);
  } catch (error) {
    console.error(error);

    return res.status(400).json({
      error: true,
      message: 'Возникла ошибка при отправке.',
    });
  }

  try {
    await bot.sendMessageBot(
      `[Отправлен репорт]
      Имя - ${name}
      Cообщение - ${body}
      Токен - ${token}
      Email - ${email}
      NumberOfQuestion - ${numberOfQuestion}`,
    );
  } catch (error) {
    console.error(error);
  }

  return res.status(200).json({
    error: false,
    message: 'Письмо отправлено.',
  });
});

module.exports = router;
