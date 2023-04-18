const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const user = require('../Models/UserModel');
const nodemailer = require('nodemailer');
const email = process.env.EMAIL
const password = process.env.PASSWORD
exports.register = async (req, res) => {
  try {
    const found = await user.findOne({ Email: req.body.Email })
    if (found) {
      res.status(400).send({ message: 'email already exist' })
    }
    else {
      const salt = bcrypt.genSaltSync(10);
      req.body.Password = bcrypt.hashSync(req.body.Password, salt);
      await user.create(req.body)
      res.status(201).send({ message: 'account created succesfully' })
    }
  } catch (error) {
    res.status(500).send({ message: 'error serveur' || error })
  }
}
exports.login = async (req, res) => {
  try {
    const found = await user.findOne({ Email: req.body.Email })

    if (found) {
      const valid = bcrypt.compareSync(req.body.Password, found.Password)
      if (valid) {
        const data = {
          username: found.Name,
          useremail: found.Email,
          userId: found._id
        }
        const token = jwt.sign(data, process.env.JWTSECRET, { expiresIn: '1d' });
        res.status(200).send({ message: 'connected successfully', token })
      }
      else {
        res.status(400).send({ message: 'verify password' })
      }
    }
    else {
      res.status(400).send({ message: 'verify email and password' })
    }
  } catch (error) {
    res.status(500).send({ message: 'erreur serveur' || error })
  }
}
exports.forgotPassword = async (req, res) => {
  try {
    const { Email } = req.body;

    const User = await user.findOne({ Email });
    if (!User) {
      return res.status(400).json({ message: 'User not found' });
    }
    const token = jwt.sign({ userId: User._id }, process.env.JWTSECRET, { expiresIn: '15m' });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: email,
        pass: password,
      },
    });

    const mailOptions = {
      from: email,
      to: Email,
      subject: 'Réinitialisation de votre mot de passe',
      html: `
        <p>Cliquez sur le lien ci-dessous pour réinitialiser votre mot de passe :</p>
        <a  href="http://localhost:4000/resetPassword/${token}">Réinitialiser votre mot de passe</a>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: 'Password reset link sent to your email' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

exports.resetPassword = async (req, res) => {
  const { NewPassword } = req.body;
  const { token } = req.params

  try {

    const decoded = jwt.verify(token, process.env.JWTSECRET)
    const userfound = await user.findById(decoded.userId)
    if (!userfound) {
      return res.status(404).send({ message: 'User not found' });
    }

    await user.findByIdAndUpdate(userfound._id, { Password: NewPassword })

    res.status(200).send({ message: 'Password reset successfully' });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: 'Invalid token' });
  }
}