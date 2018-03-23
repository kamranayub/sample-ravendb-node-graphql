module.exports = {
  async talks(obj, { offset = 0, amount = 128 }, ctx) {
    return await ctx.session
      .query({ collection: "talks" })
      .skip(offset)
      .take(amount)
      .all();
  }
};
