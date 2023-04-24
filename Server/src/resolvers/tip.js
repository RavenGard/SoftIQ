const Tip = require("../models/tip");
const { transformTips } = require("../resolvers/merge");

module.exports = {
  getTips: async () => {
    try {
      const tips = await Tip.find();
      return tips.map((tip) => {
        return transformTips(tip);
      });
    } catch (err) {
      throw err;
    }
  },
  createTips: async (args) => {
    const tip = new Tip({
      tipId: args.tipInput.tipId,
      tipType: args.tipInput.tipType,
      tipTitle: args.tipInput.tipTitle,
      description: args.tipInput.description,
    });
    let createdTip;
    try {
      const result = await tip.save();
      createdTip = transformTips(result);
      return createdTip;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};