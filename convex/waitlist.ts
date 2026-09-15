import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const join = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    whatsapp: v.optional(v.string()),
    interest: v.string(),
  },

  handler: async (ctx, args) => {
    await ctx.db.insert("waitlist", {
      name: args.name,
      email: args.email,
      whatsapp: args.whatsapp,
      interest: args.interest,
    });
  },
});
