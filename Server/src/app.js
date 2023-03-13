const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP }= require('express-graphql');
const mongoose = require('mongoose');

const graphQlSchema = require('./schema/index');
const graphQlResolvers = require('./resolvers/index');

const app = express();

// helps read json files
app.use(bodyParser.json());

// middleware with endpoint
app.use(
    '/softiq', 
    graphqlHTTP({
        // schema property points to graphql schema
        schema: graphQlSchema,
        rootValue: graphQlResolvers, // points to javascript object with all resolver functions in it
        graphiql: true
    })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${
      process.env.MONGO_PASSWORD
    }@cluster0.3k84oek.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });




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