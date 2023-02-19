import { ApolloServer } from "@apollo/server";
import { startStandalaoneServer } from '@apollo/server/standalone'
import { MongoClient, ObjectId } from "mongodb";

const dotenv = require("dotenv")
const DB = require("mongodb/lib/db")

const { DB_URI, DB_NAME } = process.env
dotenv.config();

const typeDefs = `

    type Query {
        getUser (id: ID!): User

        getOverallFeedback (id: ID!): OverallFeedback

        getQuestion (id: ID!): Question

        getSpecificFeedback (id: ID!): SpecificFeedback
    }
    
    type Mutation{
        
        #creating user
        createUser(input: SignUp): User!

        createOverallFeeback( feedbackID: ID!, userID: ID!, score: Int!): OverallFeedback!

        createQuestion(
            questionID: ID!
            starCategory: Boolean!
            questionDescription: String!
            difficulty: String!
            notes: String
            
        ) : Question !

        createSpecificFeedback(
            specificFeedbackID: ID!
            feedbackID: ID!
            category: String!
            questionRating Int!
            notes: String!
            
        ): SpecificFeedback!

    }
    
    #need enums for specific feedback as well
    
    #need to use enums for experience, workingOn, and customerFacing; predefined list of values
    enum WorkExperience {
        BEGINNER
        INTERMEDIATE
        ADVANCED
    }

    enum WorkingOn {
        #what is the users intention for using the app; what do they want to improve on
        ANSWERNG_QUESTIONS
        SPEAKING_CLEARLY
        NON_VERBAL_BEHAVIOR
    }

    enum CustomerFacing {
        YES
        NO
        UNSURE
    }

    input SignUp {
        firstName: String!
        lastName: String!
        email: String!
        userName: String!
        password: String!
        experience: WorkExperience!
        workingOn: WorkingOn!
        customerFacing: CustomerFacing!
    }

    input SignIn {
        userName: String!
        password: String!
    } 

    # make it an input since it is the user typing in their feedback
    input SpecificFeedback {
        specificFeedbackID: ID!
        feedbackID: ID!
        category: String!
        questionRating Int!
        notes: String!
    }
    
    #practiceCounter and streakCounter are not persistent data. would it need to be stored on the client side? research...
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
    }
    type Question {
        questionID: ID!
        starCategory: Boolean!
        questionDescription: String!
        difficulty: String!
        tips: String
    }

    # type SpecificFeedback {
      #  specificFeedbackID: ID!
       # feedbackID: ID!
       # category: String!
       # questionRating: Int!
       # notes: String!
    # } 

    # how do tips fit into our database structure; there are tips for interview prep and for during the interview
    type Tips {
        starCategory: Boolean!
        tipDescription: String!
        questionID: ID!
    }
`
const resolvers = {
    Query: {
        getUser: async(_, {id}, {db}) => {
            return await db.collection('User').findOne({ _id: ObjectId(id)});
        },
        getOverallFeedback: async(_,{id}, {db} ) => {
            
            // do more research
            // need to filter out the overall feedbacks based on the individual user.
            // problem that can come up: if a user clicks to view their overall feedback it 
            // might return all the overall feedbacks for all the users
           // const feebackList = db.collection("OverallFeedback").findOne
            return await db.collection("OverallFeedback").findOne({ _id: ObjectId(id) });
        },

        getQuestion: async(_, {id}, {db}) => {
            return await db.collection("Question").findOne({ _id: ObjectId(id) }); 
        },

        getSpecificFeedback: async(_,{id}, {db} ) => {   
            return await db.collection("SpecificFeedback").findOne({ _id: ObjectId(id) });
        },

    },
    Mutation: {
        signUp: async(_, {input}, {db}) => {
            // authentication stuff goes here (maybe)

            const newUser = {
                ...input
                // password info will come with authentication
            }

            // save new user to database
            const result = await db.collection('User').insert(newUser);
            const user = result.ops[0]

            return {
                user
                // password/authentication info goes here (maybe)
            }
        },

        signIn: async(_, {input}, {db}) => {
            // password/authentication info goes here as well (maybe)
            const user = await db.collection('User').findOne({userName: input.userName});
        
            return{
                user
            }
        },

        createSpecificFeeback: async(_, {input}, {db}) => {
            // where does overall feedback fit in??

            //retrieves user specific feeback 
            const newSpecificFeeback = {
                ...input
            }

            // writes specific feedback from user into the database
            const result = await db.collection("SpecificFeeback").insert(newSpecificFeeback);
            const specificFeeback = result.ops[0]
        },

        // createUser: async(_, {}, {db}){
        //     // practiceCounter and streakCounter are not persistent data. would it need to be stored on the client side? research...
        // },

        createOverallFeeback: async(_, {feedbackID, userID, score}, {db}) => {
            
            //retrieves overall feeeback
            const newOverallFeeback = {feedbackID, userID,score, createdAt : new Date().toISOString()
            }

            //writes to database 
            const result = await db.collection("OverallFeeback").insert(newOverallFeeback)
            return result.ops[0];
        },
        
        createQuestion : async(_, {questionID, starCategory,questionDescription,difficulty, notes}, {db}) => {

            const newQuestion = { questionID, starCategory, questionDescription, difficulty, notes }
            const result = await db.collection("Question").insert(newQuestion);

            return result.ops[0]

        }
        
    }

}

