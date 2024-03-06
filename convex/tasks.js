import { mutation, query } from "./_generated/server";
import { v } from 'convex/values'

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("tasks").collect();
  },
});

export const post = mutation({
  args: {
    text: v.string(),
    isCompleted: v.boolean()
  },
  handler: async (ctx, args) => {
    const task = await ctx.db.insert("tasks", {
      text: args.text,
      isCompleted: args.isCompleted
    })
    return task
  }
})