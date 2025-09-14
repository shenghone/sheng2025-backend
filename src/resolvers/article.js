import {Article } from "../models/index.js";


export default {
  Query: {
    Article: async(parent, args, context, info) => {
      return await Article.findById(args.id);
    },
    Articles: async(parent, args, contenxt, info) => {
      return await Article.find({});
    }
  },
  Mutation: {
    NewArticle: async (parent, args, context, info) => {
      const article = await Article.create(args);
      return article;
    },
    UpdateArticle: async (parent, args, context, info) => {
      const updatedArticle = await Article.findOneAndUpdate(
        { _id: args.id },
        {
          Title: args.Title,
          Content: args.Content,
          Status: args.Status
        }
      );
      const newArticle = await Article.findById(args.id);
      return newArticle;
    },
    DeleteArticle: async (parent, args, context, info) => {
      const article = await Article.findByIdAndRemove(args.id)
      return article ? true : false;
    }
  }
};