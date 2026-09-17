import { query } from "./_generated/server";


/* ================================================================
   TOTAL WAITLIST
   ================================================================ */

export const getWaitlistCount = query({

    args: {},

    handler: async (ctx) => {

        const waitlist =
            await ctx.db
                .query("waitlist")
                .collect();

        return waitlist.length;
    },

});


/* ================================================================
   NEW THIS WEEK
   ================================================================ */

export const getWeeklySignups = query({

    args: {},

    handler: async (ctx) => {

        const now =
            Date.now();

        const sevenDaysAgo =
            now -
            (7 * 24 * 60 * 60 * 1000);

        const waitlist =
            await ctx.db
                .query("waitlist")
                .collect();

        const weeklySignups =
            waitlist.filter(function (person) {

                return (
                    person._creationTime >=
                    sevenDaysAgo
                );

            });

        return weeklySignups.length;
    },

});


/* ================================================================
   NEW THIS MONTH
   ================================================================ */

export const getMonthlySignups = query({

    args: {},

    handler: async (ctx) => {

        const waitlist =
            await ctx.db
                .query("waitlist")
                .collect();

        const now =
            new Date();

        const monthStart =
            new Date(
                now.getFullYear(),
                now.getMonth(),
                1
            ).getTime();

        const monthlySignups =
            waitlist.filter(function (person) {

                return (
                    person._creationTime >=
                    monthStart
                );

            });

        return monthlySignups.length;
    },

});


/* ================================================================
   TOP LEARNING INTEREST
   ================================================================ */

export const getTopInterest = query({

    args: {},

    handler: async (ctx) => {

        const waitlist =
            await ctx.db
                .query("waitlist")
                .collect();

        const interestCounts:
            Record<string, number> = {};


        waitlist.forEach(function (signup) {

            const interest =
                signup.interest;

            if (!interestCounts[interest]) {

                interestCounts[interest] =
                    0;

            }

            interestCounts[interest]++;

        });


        let topInterest =
            "—";

        let highestCount =
            0;


        Object.keys(interestCounts).forEach(
            function (interest) {

                if (
                    interestCounts[interest] >
                    highestCount
                ) {

                    highestCount =
                        interestCounts[interest];

                    topInterest =
                        interest;

                }

            }
        );


        return topInterest;
    },

});


/* ================================================================
   LEARNERS
   ================================================================ */

export const getLearners = query({

    args: {},

    handler: async (ctx) => {

        const learners =
            await ctx.db
                .query("waitlist")
                .order("desc")
                .collect();

        return learners.map(function (learner) {

            return {

                name:
                    learner.name,

                email:
                    learner.email,

                whatsapp:
                    learner.whatsapp ?? "—",

                interest:
                    learner.interest,

                createdAt:
                    learner._creationTime,

            };

        });

    },

});
