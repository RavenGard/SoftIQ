// date was defined in the example through the Event schema when users had to input 
// the date of the event. since we are using the Date object to generate the time we 
// don't need the prop 'date'. you end up getting an invalid time error.
exports.dateToString = () => new Date().toISOString();
// current error is that createdAt continues to update when querying the database.