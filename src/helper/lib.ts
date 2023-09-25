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
  return `${ctx.message.text} ${from}`;
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

export const updateNameCommand = (command: string): string => {
  return command
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const resetNameCommand = (command: string): string => {
  return command
    .split(' ')
    .map((word) => word.charAt(0).toLowerCase() + word.slice(1))
    .join('_');
};
