import { query } from "./_generated/server";

export const getWaitlistCount = query({
  args: {},
  handler: async (ctx, _args) => {
    const waitlist = await ctx.db.query("waitlist").collect();
    return waitlist.length;
  },
});