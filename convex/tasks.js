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

export const update = mutation({
  args: {
    isCompleted: v.boolean(),
    id: v.id("tasks")
  },
  handler: async (ctx, args) => {
    const task = await ctx.db.patch(args.id, {
      isCompleted: args.isCompleted,
    })
    return task
  }
})

export const remove = mutation({
  args: {
    id: v.id("tasks")
  },
  handler: async (ctx, args) => {
    const task = await ctx.db.delete(args.id)
    return task
  }
})