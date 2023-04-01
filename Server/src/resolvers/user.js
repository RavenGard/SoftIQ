const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const crypto = require("crypto");
const { ObjectId } = require("mongodb");

const initials = (firstName, lastName) => {
  return firstName.charAt(0) + lastName.charAt(0);
};

module.exports = {
  createUser: async (args) => {
    try {
      const {
        firstName,
        lastName,
        email,
        userName,
        password,
        interviewLevel,
        workingOn,
        customerFacing,
      } = args.userInput;

      // Validate required properties
      if (!firstName || !lastName || !email || !userName || !password) {
        throw new Error("Missing required properties.");
      }

      const currUser = await User.findOne({ email });

      if (currUser) {
        throw new Error("User exists already.");
      }

      const sameUserName = await User.findOne({ userName });

      if (sameUserName) {
        throw new Error("User name exists already.");
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const userInitials = initials(firstName, lastName);

      const newUser = new User({
        firstName,
        lastName,
        email,
        userName,
        password: hashedPassword,
        interviewLevel,
        workingOn,
        customerFacing,
        initials: userInitials,
      });

      const result = await newUser.save();

      return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
      throw err;
    }
  },

  getInitials: async (args) => {
    try {
      const id = new ObjectId(args.userId);

      const user = await User.findOne({ _id: id });

      if (!user) {
        throw new Error("User not found.");
      }

      const initials = user.initials;

      if (!initials) {
        throw new Error("Initials not found.");
      }

      console.log("Initials: " + initials);

      return { initials: initials };
    } catch (err) {
      throw err;
    }
  },

  login: async ({ email, password }) => {
    try {
      const user = await User.findOne({ email: email });

      // Entering in wrong email but not getting Invalid credentials error.

      if (!user) {
        throw new error("Invalid credentials.");
      }

      const isEqual = await bcrypt.compare(password, user.password);

      if (!isEqual) {
        throw new Error("Invalid credentials.");
      }

      const generateSecretKey = () => {
        const secret = crypto.randomBytes(64).toString("hex");
        return secret;
      };

      const newSecretKey = generateSecretKey();

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        newSecretKey,
        {
          expiresIn: "2d",
        }
      );
      return { userId: user.id, token: token, tokenExpiration: 48 };
    } catch (err) {
      throw err;
    }
  },
};
