module.exports = {
  speaker(obj, _, ctx) {
    const { speaker } = obj.speaker
    const { session } = ctx

    if (!speaker) return null;

    return ctx.load(speaker)
  }
}