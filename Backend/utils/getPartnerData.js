const { findUserById } = require("../repositories/user.repository.js");
const { getProfileById } = require("../repositories/profile.repository.js");

async function getPartnerData(relationship, currentUserId) {
  const { userAId, userBId } = relationship;
  const partnerId = currentUserId.equals(userAId)
    ? userBId.toString()
    : userAId.toString();
  const partner = await findUserById(partnerId);
  if (!partner) return null;
  const partnerProfile = await getProfileById(partnerId);
  return { partner, partnerProfile };
}

module.exports = { getPartnerData };
