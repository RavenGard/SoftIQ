const { buildSchema } = require("graphql");

// Relate question to Feedback schema

module.exports = buildSchema(`
    type Question {
        _id: ID!
        starCategory: Boolean!
        questionDescription: String!
        difficulty: String!
        tips: [String!]
        createdAt: String!
        updatedAt: String!
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
        initials: String!
        practiceCounter: Int
        streakCounter: Int
    }

    type Feedback {
        _id: ID!
        user: User!
        question: Question!
        score: Int!
        title: String!
        questionRating: Int!
        createdAt: String!
    }

    type AuthData {
        userId: ID!
        token: String!
        tokenExpiration: Int!
    }

    type Initials {
        initials: String!
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
        title: String!
        questionRating: Int!
    }

    type RootQuery {
        getQuestions: [Question!]!
        getFeedback(userId: ID!, questionId: ID!): [Feedback]!
        getAllFeedback(userId: ID!): [Feedback]!
        getInitials(userId: ID!): Initials
        login(email: String!, password: String!): AuthData
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
