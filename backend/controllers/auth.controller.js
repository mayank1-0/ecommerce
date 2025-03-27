const Customer = require('../models/Customer.model')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const saltRounds = 10
const sendEmail = require('../utils/sendEmail')
require('dotenv').config()

const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body
    if (!fullName || !email || !password)
      return res.status(400).send({
        success: false,
        message: 'Please fill all fields i.e. FullName, Email and Password',
      })
    if (password.length < 8)
      return res.status(400).send({
        success: false,
        message: 'Password length should be of 8 or more than 8 characters',
      })
    const existingCustomer = await Customer.findOne({ email })
    if (existingCustomer)
      return res
        .status(400)
        .send({ success: false, message: `Email is already taken` })
    const hashPassword = await bcrypt.hash(password, saltRounds)
    const newCustomer = new Customer({
      fullName,
      email,
      password: hashPassword,
    })
    await newCustomer.save()
    res.status(200).send({
      success: true,
      message: `New customer created successfully`,
      data: newCustomer,
    })
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error.name,
      message: error.message ? error.message : 'Something went wrong',
    })
  }
}

const login = async (req, res) => {
  try {    
    const { email, password } = req.body
    if (!email || !password)
      return res.status(400).send({
        success: false,
        message: 'Please enter both email and password',
      })
    const customer = await Customer.findOne({ email }).select('fullName password');
    if (!customer)
      return res
        .status(400)
        .send({ success: false, message: 'Invalid Credentials' })
    const match = await bcrypt.compare(password, customer.password)
    if (!match)
      return res
        .status(400)
        .send({ success: false, message: 'Invalid credentials' })
    const jwtToken = await jwt.sign(
      {
        id: customer._id,
        isActive: true
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    )
    let sessionData = req.session;
    sessionData.user = {};
    sessionData.token = jwtToken;
    sessionData.user.email = email;
    sessionData.user.name = customer.fullName;
    res
      .status(200).send({ success: true, message: 'Login successful', token: jwtToken, customerName: customer.fullName });
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error.name,
      message: error.message ? error.message : `Something went wrong`,
    })
  }
}

const resetPasswordLink = async (req, res) => {
  try {
    const { resetPasswordEmail } = req.body
    if (!resetPasswordEmail)
      return res
        .status(400)
        .send({ success: false, message: `Please enter an email` })
    const customer = await Customer.findOne({ email: resetPasswordEmail })
    if (!customer)
      return res.status(404).send({
        success: false,
        message: "User with the given email doesn't exists",
      })
    // reset password token i.e. a random-string
    const resetToken = crypto.randomBytes(32).toString('hex')
    // hashed reset token
    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex')
    // reset password expiry
    const resetPasswordExpiry = Date.now() + 15 * 60 * 1000 // Token expires in 15 minutes
    customer.resetPasswordToken = hashedToken
    customer.resetPasswordExpiry = resetPasswordExpiry
    await customer.save()
    // reset url and message
    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`
    const message = `You requested a password reset. Click the link below to reset your password: \n\n ${resetUrl}`
    // sending reset-password-email
    await sendEmail({
      to: resetPasswordEmail,
      subject: 'Password Reset Request',
      message,
    })
    res.status(200).send({
      success: true,
      message: 'Reset password email sent successfully',
    })
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error.message,
      message: 'Something went wrong',
    })
  }
}

const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword)
      return res
        .status(400)
        .send({
          success: false,
          message: `Please enter both, token and new password`,
        });
    if( newPassword.length < 8) return res.status(400).send({ success: false, message: `New password must be 8 or more characters long`});
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const hashPassword = await bcrypt.hash(newPassword, saltRounds);
    const customer = await Customer.findOneAndUpdate({
      resetPasswordToken: hashedToken,
      resetPasswordExpiry: { $gt: Date.now() },
    },
    {
      password: hashPassword,
      resetPasswordToken: undefined,
      resetPasswordExpiry: undefined
    },
    { new: true }
  );
    if( !customer ) return res.status(401).send({ success: false, message: "Password reset token expired"});
    res.status(200).send({success: true, message: 'Password reset successfully'});
  } catch (error) {
    res.status(500).send({ success: false, error: error.message, message: "Something went wrong"});
  }
}

const logout = async (req, res) => {  
  try {
    let sessionData = req.session;
    const logout = await sessionData.destroy();
    res.status(200).send({success: true, message: `Logout successful`})
  } catch (e) {
    res
      .status(500)
      .send({ success: false, error: e, message: "Logout Failed. Please try again" });
  }
}

const updateShippingAddress = async (req, res) => {
  try {
    const { shippingAddress } = req.body;
    const userId = req.id;
    const update = await Customer.findByIdAndUpdate(
      userId,
      { shippingAddress },
      { new: true }
    ).select('-password')
    if (update) return res.status(200).send({ success: true, message: `Shipping address for the loggedIn user updated successfully`, data: update })        
    res.status(404).send({success: false, message: `No customer with the given id found in the database`});
  } catch (error) {
    res.status(500).send({success: false, message: "Something went wrong", error});
  }
}


module.exports = { login, signup, resetPasswordLink, resetPassword, updateShippingAddress, logout }
