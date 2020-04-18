const Poll = require('../models/Poll');

const pollController = {
  index: async (req, res, next) => {
    try {
      let polls = await Poll.find();
      res.render("../views/poll/index", { polls });
    } catch (error) {
      console.log(error);
    }
  },

  create: (req, res, next) => {
    res.render("../views/poll/create");
  },

  store: async (req, res, next) => {
    let { title, description, options } = req.body;

    options = options.map((option) => {
      return {
        name: option,
        vote: 0,
      };
    });

    let poll = new Poll({
      title,
      description,
      options,
    });

    try {
      await poll.save();
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  },

  show: async (req, res, next) => {
    let id = req.params.id;
    let poll = await Poll.findById(id);

    let options = [...poll.options];
    let results = [];

    options.forEach((option) => {
      let percentage = (option.vote * 100) / poll.totalVote;

      results.push({
        ...option._doc,
        percentage: percentage ? percentage : 0,
      });
    });

    try {
      res.render("../views/poll/show", { poll, results });
    } catch (error) {
      console.log(error);
    }
  },

  storeOpinion: async (req, res, next) => {
    let id = req.params.id;
    let optionId = req.body.option;
    console.log(req.body);

    try {
      let poll = await Poll.findById(id);
      let options = [...poll.options];

      let index = options.findIndex((option) => option.id == optionId);
      options[index].vote = options[index].vote + 1;

      let totalVote = poll.totalVote + 1;
      await Poll.findOneAndUpdate(
        { _id: id },
        { $set: { options, totalVote } }
      );
      res.redirect("/polls/" + poll.id);
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = pollController;