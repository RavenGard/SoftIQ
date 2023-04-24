export const calcAverageWeeklyScore = (feedback) => {
  let week1Sum = 0;
  let week2Sum = 0;
  let week3Sum = 0;
  let week4Sum = 0;
  let week1Avg = 0;
  let week2Avg = 0;
  let week3Avg = 0;
  let week4Avg = 0;
  let week1Count = 0;
  let week2Count = 0;
  let week3Count = 0;
  let week4Count = 0;

  feedback.forEach((element) => {
    if (element.week === "Week 1") {
      week1Sum += element.score;
      week1Count++;
    } else if (element.week === "Week 2") {
      week2Sum += element.score;
      week2Count++;
    } else if (element.week === "week 3") {
      week3Sum += element.score;
      week3Count++;
    } else if (element.week === "week 4") {
      week4Sum += element.score;
      week4Count++;
    }
  });
  week1Avg = week1Sum / week1Count;
  week2Avg = week2Sum / week2Count;
  week3Avg = week3Sum / week3Count;
  week4Avg = week4Sum / week4Count;

  return [week1Avg, week2Avg, week3Avg, week4Avg];
};
