const Message = require("../models/Message.js");

function createMessageDocument(messageData) {
  return Message.create(messageData);
}

function getMessagesCollection(relationshipId) {
  return Message.find({ relationshipId }).sort({ createdAt: -1 }).limit(50);
}
function getUnreadCount(relationshipId, userId) {
  return Message.countDocuments({
    relationshipId,
    sender: { $ne: userId },
    isRead: false,
  });
}

function markMessagesRead(relationshipId, userId) {
  return Message.updateMany(
    { relationshipId, sender: { $ne: userId }, isRead: false },
    { isRead: true },
  );
}

module.exports = {
  createMessageDocument,
  getMessagesCollection,
  getUnreadCount,
  markMessagesRead,
};
