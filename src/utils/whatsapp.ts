export const WHATSAPP_NUMBER = '918108975875';
export const CONTACT_EMAIL = 'partnerships@creatorssyncmedia.in';
export const CONTACT_PHONE = '+91 8108975875';
export const CONTACT_ADDRESS = 'Ghatkopar West Mumbai Maharashtra 400086';

/**
 * Opens WhatsApp in a new tab with the pre-filled message sent to +918108975875
 */
export const sendToWhatsApp = (text: string) => {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text.trim())}`;
  window.open(url, '_blank');
};

export const formatContactInquiryMessage = (data: {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  inquiryType?: string;
  message: string;
}): string => {
  let msg = `*🚀 CreatorsSyncMedia - Direct Contact Inquiry*\n\n`;
  msg += `👤 *Name:* ${data.name}\n`;
  msg += `📧 *Email:* ${data.email}\n`;
  if (data.company) msg += `🏢 *Company / Channel:* ${data.company}\n`;
  if (data.phone) msg += `📞 *Phone:* ${data.phone}\n`;
  if (data.inquiryType) msg += `📋 *Inquiry Type:* ${data.inquiryType}\n`;
  msg += `\n💬 *Message:*\n${data.message}\n`;
  return msg;
};

export const formatCampaignBriefMessage = (data: {
  fullName: string;
  workEmail: string;
  companyName: string;
  phone: string;
  campaignType: string;
  budgetRange: string;
  timeline: string;
  campaignBrief: string;
}): string => {
  let msg = `*🎯 CreatorsSyncMedia - Campaign Brief Submission*\n\n`;
  msg += `👤 *Name:* ${data.fullName}\n`;
  msg += `🏢 *Brand / Company:* ${data.companyName}\n`;
  msg += `📧 *Work Email:* ${data.workEmail}\n`;
  msg += `📞 *Phone / WhatsApp:* ${data.phone}\n\n`;
  msg += `📌 *Campaign Format:* ${data.campaignType}\n`;
  msg += `💰 *Budget Range:* ${data.budgetRange}\n`;
  msg += `⏱️ *Timeline:* ${data.timeline}\n\n`;
  msg += `📝 *Campaign Brief:*\n${data.campaignBrief}\n`;
  return msg;
};

export const formatCreatorCollabMessage = (data: {
  creatorName: string;
  creatorHandle: string;
  brandName: string;
  email: string;
  budget: string;
  details?: string;
}): string => {
  let msg = `*🤝 CreatorsSyncMedia - Creator Collab Request*\n\n`;
  msg += `⭐ *Target Creator:* ${data.creatorName} (${data.creatorHandle})\n`;
  msg += `🏢 *Brand / Company:* ${data.brandName}\n`;
  msg += `📧 *Work Email:* ${data.email}\n`;
  msg += `💰 *Estimated Budget:* ${data.budget}\n`;
  if (data.details) {
    msg += `\n📝 *Brief Pitch / Target Dates:*\n${data.details}\n`;
  }
  return msg;
};

export const formatCreatorApplicationMessage = (data: {
  creatorName: string;
  email: string;
  phone?: string;
  youtubeUrl: string;
  subscriberCount: string;
  niche: string;
  message?: string;
}): string => {
  let msg = `*🎬 CreatorsSyncMedia - Creator Network Application*\n\n`;
  msg += `👤 *Creator / Channel:* ${data.creatorName}\n`;
  msg += `📧 *Email:* ${data.email}\n`;
  if (data.phone) msg += `📞 *WhatsApp / Phone:* ${data.phone}\n`;
  msg += `📺 *YouTube Channel:* ${data.youtubeUrl}\n`;
  msg += `👥 *Subscriber Tier:* ${data.subscriberCount}\n`;
  msg += `🎯 *Primary Niche:* ${data.niche}\n`;
  if (data.message) {
    msg += `\n💬 *Channel Details:*\n${data.message}\n`;
  }
  return msg;
};
