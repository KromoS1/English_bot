export const userString = (ctx) => {
  return JSON.stringify(
    ctx.from.id == ctx.chat.id
      ? ctx.from
      : {
          from: ctx.from,
          chat: ctx.chat,
        },
  );
};

export const logMsg = (ctx) => {
  const from = userString(ctx);
  console.log('<', ctx.message.text, from);
};

export const logOutMsg = (ctx, text) => {
  console.log(
    '>',
    {
      id: ctx.chat.id,
    },
    text,
  );
};
