import { Project } from "../models/index.js";


export default {
  Query: {
    Project: async (parent, args, context, info) => {
      return await Project.findById(args.id);
    },
    Projects: async (parent, args, contenxt, info) => {
      return await Project.find({});
    }
  },
  Mutation: {
    NewProject: async (parent, args, context, info) => {
      const project = await Project.create(args);
      return project;
    },
    UpdateProject: async (parent, args, context, info) => {
      try {
        const updatedProject = await Project.findByIdAndUpdate(args.id, {
          Title: args.Title,
          FrontEnd: args.FrontEnd,
          BackEnd: args.BackEnd,
          Link: args.Link,
          Description: args.Description,
          Status: args.Status,
          Asset: args.Asset
        });
        return updatedProject;
      } catch (err) {
        console.error(err);
      }
    },
    DeleteProject: async (parent, args, context, info) => {
      const deletedProject = await Project.findByIdAndRemove({ _id: args.id });
      return deletedProject ? true : false;
    }
  }
};