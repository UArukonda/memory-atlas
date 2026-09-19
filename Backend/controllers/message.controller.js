const {
  getMessagesCollection,
  getUnreadCount,
  markMessagesRead,
} = require("../repositories/message.repository.js");

const fetchMessages = async (req, res, next) => {
  try {
    const messages = await getMessagesCollection(req.relationship._id);
    return res.status(200).send({ messages: messages.reverse() });
  } catch (err) {
    next(err);
  }
};

const fetchUnreadCount = async (req, res, next) => {
  try {
    const count = await getUnreadCount(req.relationship._id, req.user.id);
    return res.status(200).send({ count });
  } catch (err) {
    next(err);
  }
};

const readMessages = async (req, res, next) => {
  try {
    await markMessagesRead(req.relationship._id, req.user.id);
    return res.status(200).send({ message: "Messages marked as read" });
  } catch (err) {
    next(err);
  }
};

module.exports = { fetchMessages, fetchUnreadCount, readMessages };
