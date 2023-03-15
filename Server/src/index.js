// import { ApolloServer } from "@apollo/server";
// import { startStandaloneServer } from '@apollo/server/standalone'
// import { MongoClient, ObjectId } from "mongodb";
// import dotenv from "dotenv";

// (dotenv).config();

// const { DB_URI, DB_NAME } = process.env

// const typeDefs = `

//     type Query {
//         getUser (id: ID!): User

//         getQuestion (id: ID!): Question

//         getFeedback (id: ID!): Feedback
//     }
    
//     type Mutation{

//         signUp(input: SignUp): User!

//         signIn(input: SignIn): User!
        
//         createFeeback( feedbackID: ID!, userID: ID!, score: Int!, category: String!, questionRating: Int! ): Feedback!

//         createQuestion(
//             starCategory: Boolean!
//             questionDescription: String!
//             difficulty: String!
//             tips: String  
//         ) : Question!

//     }
    
//     #need enums for specific feedback as well
    
//     #need to use enums for experience, workingOn, and customerFacing; predefined list of values
//     enum WorkExperience {
//         BEGINNER
//         INTERMEDIATE
//         ADVANCED
//     }

//     enum WorkingOn {
//         #what is the users intention for using the app; what do they want to improve on
//         ANSWERNG_QUESTIONS
//         SPEAKING_CLEARLY
//         NON_VERBAL_BEHAVIOR
//     }

//     enum CustomerFacing {
//         YES
//         NO
//         UNSURE
//     }

//     input SignUp {
//         firstName: String!
//         lastName: String!
//         email: String!
//         userName: String!
//         password: String!
//         experience: WorkExperience!
//         workingOn: WorkingOn!
//         customerFacing: CustomerFacing!
//     }

//     input SignIn {
//         userName: String!
//         password: String!
//     } 
    
//     #practiceCounter and streakCounter are not persistent data. would it need to be stored on the client side? research...
//     type User {
//         userID: ID!
//         userName: String!
//         password: String!
//         firstName: String!
//         lastName: String!
//         email: String!
//         interviewLevel: String!
//         customerFacing: Boolean!
//         practiceCounter: Int
//         streakCounter: Int
//     }
//     type Feedback {
//         feedbackID: ID!
//         userID: ID!
//         questionID: ID!
//         score: Int!
//         category: String!
//         questionRating: Int!
//     }

//     type Question {
//         questionID: ID!
//         starCategory: Boolean!
//         questionDescription: String!
//         difficulty: String!
//         tips: String
//     }
// `
// const resolvers = {
//     Query: {
//         getUser: async(_, {id}, {db}) => {
//             return await db.collection('User').findOne({ _id: ObjectId(id)});
//         },
//         getFeedback: async(_, {id}, {db} ) => {
            
//             // do more research
//             // need to filter out the overall feedbacks based on the individual user.
//             // problem that can come up: if a user clicks to view their overall feedback it 
//             // might return all the overall feedbacks for all the users
//            // const feebackList = db.collection("OverallFeedback").findOne
//             return await db.collection("OverallFeedback").findOne({ _id: ObjectId(id) });
//         },

//         getQuestion: async(_, {id}, {db}) => {
//             return await db.collection("Question").findOne({ _id: ObjectId(id) }); 
//         },

//     },
//     Mutation: {
//         signUp: async(_, {input}, {db}) => {
//             // authentication stuff goes here (maybe)

//             const newUser = {
//                 ...input
//                 // password info will come with authentication
//             }

//             // save new user to database
//             const result = await db.collection('User').insert(newUser);
//             const user = result.ops[0]

//             return {
//                 user
//                 // password/authentication info goes here (maybe)
//             }
//         },

//         signIn: async(_, {input}, {db}) => {
//             // password/authentication info goes here as well (maybe)
//             const user = await db.collection('User').findOne({userName: input.userName});
        
//             return{
//                 user
//             }
//         },

//         // createUser: async(_, {}, {db}){
//         //     // practiceCounter and streakCounter are not persistent data. would it need to be stored on the client side? research...
//         // },
//         createFeeback: async(_, {feedbackID, userID, score, category, questionRating}, {db}) => {
            
//             //retrieves overall feeeback
//             const newFeeback = {feedbackID, userID, score, category, questionRating, createdAt : new Date().toISOString()}

//             //writes to database 
//             const result = await db.collection("Feeback").insertOne(newFeeback)
//             return result.ops[0];
//         },
        
//         createQuestion : async(_, {starCategory,questionDescription,difficulty, tips}, {db}) => {

//             // "Cannot read properties of undefined (reading 'collection')"
//             const newQuestion = {starCategory, questionDescription, difficulty, tips }
//             const result = await db.collection("Question").insertOne(newQuestion);

//             return result.ops[0]

//         }
        
//     }

// };


// const start = async () => {
//     const client = new MongoClient(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
//     await client.connect();
//     const db = client.db(DB_NAME); // defines the database

//     const context = {
//         db
//     }
//     // The ApolloServer constructor requires two parameters: your schema

//     // definition and your set of resolvers.

//     const server = new ApolloServer({
//         typeDefs,
//         resolvers,  
//         context
//     });
//     //

//     //
    
//     // Passing an ApolloServer instance to the `startStandaloneServer` function:
    
//     //  1. creates an Express app
    
//     //  2. installs your ApolloServer instance as middleware
    
//     //  3. prepares your app to handle incoming requests
    
//     const { url } = await startStandaloneServer(server, {
    
//         listen: { port: 4000 },
    
//     });
    
    
//     console.log(`🚀  Server ready at: ${url + 'softiq'}`);
// }

// start();

