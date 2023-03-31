const { buildSchema } = require('graphql')

// Relate question to Feedback schema

module.exports = buildSchema(`
    type Question {
        _id: ID!
        starCategory: Boolean!
        questionDescription: String!
        difficulty: String!
        tips: [String!]
    }

    type User {
        _id: ID!
        firstName: String!
        lastName: String!
        email: String!
        userName: String!
        password: String
        interviewLevel: String!
        workingOn: String!
        customerFacing: Boolean!
        practiceCounter: Int
        streakCounter: Int
    }

    type Feedback {
        _id: ID!
        user: User!
        question: Question!
        score: Int!
        category: String!
        questionRating: Int!
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
        interviewLevel: String!
        workingOn: String!
        customerFacing: Boolean!
    }

    input SignIn {
        userName: String!
        password: String!
    } 

    input QuestionInput {
        starCategory: Boolean!
        questionDescription: String!
        difficulty: String!
        tips: [String!] 
    }

    input UserInput {
        firstName: String!
        lastName: String!
        email: String!
        userName: String!
        password: String
        interviewLevel: String!
        workingOn: String!
        customerFacing: Boolean!
        practiceCounter: Int
        streakCounter: Int
    }

    input FeedbackInput {
        score: Int!
        category: String!
        questionRating: Int!
    }

    type RootQuery {
        getQuestions: [Question!]!
        getFeedback(userId: ID!, questionId: ID!): Feedback
    }

    type RootMutation {
        createQuestion(questionInput: QuestionInput): Question
        createUser(userInput: UserInput): User!
        createFeedback(feedbackInput: FeedbackInput, userId: ID!, questionId: ID!): Feedback
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }

`);