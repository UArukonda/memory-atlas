const Message = require("../models/Message.js");

function createMessageDocument(messageData) {
  return Message.create(messageData);
}

function getMessagesCollection(relationshipId) {
  return Message.find({ relationshipId }).sort({ createdAt: -1 }).limit(50);
}

module.exports = { createMessageDocument, getMessagesCollection };
