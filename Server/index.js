import { ApolloServer } from "@apollo/server";
import { startStandalaoneServer } from '@apollo/server/standalone'
import { MongoClient, ObjectId } from "mongodb";

const dotenv = require("dotenv")
const DB = require("mongodb/lib/db")

const { DB_URI, DB_NAME } = process.env
dotenv.config();

const typeDefs = `
    type User {
        userID: ID!
        userName: String!
        password: String!
        firstName: String!
        lastName: String!
        email: String!
        interviewLevel: String!
        customerFacing: Boolean!
        practiceCounter: Int
        streakCounter: Int
    }
    type OverallFeedback {
        feedbackID: ID!
        userID: ID!
        questionID: ID!
        score: Int!
        date: Date!
    }
    type Question {
        questionID: ID!
        starCategory: String!
        questionDescription: String!
        difficulty: String!
        notes: String
    }
    type SpecificFeedback {
        specificFeedbackID: ID!
        feedbackID: ID!
        category: String!
        questionRating Int!
        notes: String!
    }   
`