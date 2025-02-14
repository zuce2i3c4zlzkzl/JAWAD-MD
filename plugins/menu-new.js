import moment from 'moment-timezone';
import fs from 'fs';
import os from 'os';
import { generateWAMessageFromContent, proto, prepareWAMessageMedia } from '@whiskeysockets/baileys';
import config from '../config.cjs';

// Helper function to format bytes
function formatBytes(bytes) {
  const units = ['bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 bytes';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${units[i]}`;
}

// Uptime calculation
const uptime = process.uptime();
const day = Math.floor(uptime / (24 * 3600));
const hours = Math.floor((uptime % (24 * 3600)) / 3600);
const minutes = Math.floor((uptime % 3600) / 60);
const seconds = Math.floor(uptime % 60);
const uptimeMessage = `*I am alive now since ${day}d ${hours}h ${minutes}m ${seconds}s*`;

// Time-based greeting
const time = moment().tz("Asia/Colombo").format("HH:mm:ss");
let pushwish = time < "05:00" ? "Good Morning 🌄" :
               time < "11:00" ? "Good Morning 🌄" :
               time < "15:00" ? "Good Afternoon 🌅" :
               time < "18:00" ? "Good Evening 🌃" :
               "Good Night 🌌";

// Main menu handler
const menuHandler = async (m, Matrix) => {
  const prefix = config.PREFIX;
  const mode = config.MODE === 'public' ? 'public' : 'private';
        const validCommands = ['listx', 'helpx', 'menux'];

  try {
    const menuHeader = await prepareWAMessageMedia({
      image: fs.readFileSync('./media/khan.jpg')
    }, { upload: Matrix.waUploadToServer });

    const msg = generateWAMessageFromContent(m.from, {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            body: {
              text: `╭━━━〔 *KHAN-MD* 〕━━━┈⊷
┃★╭──────────────
┃★│ Owner : *KHAN-MD*
┃★│ User : *${m.pushName}*
┃★│ Baileys : *Multi Device*
┃★│ Type : *NodeJs*
┃★│ Mode : *${mode}*
┃★│ Platform : *${os.platform()}*
┃★│ Prefix : *[ ${prefix} ]*
┃★│ Version : *1.1.0*
┃★╰──────────────
╰━━━━━━━━━━━━━━━┈⊷`
            },
            footer: {
              text: "© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴋʜᴀɴ-ᴍᴅ"
            },
            header: {
              ...menuHeader,
              title: "KHAN-MD MAIN MENU",
              subtitle: "Powered by Dark Shadow Modz"
            },
            nativeFlowMessage: {
              buttons: [
                {
                  name: "quick_reply",
                  buttonParamsJson: JSON.stringify({
                    display_text: "ALIVE",
                    id: `${prefix}alive`
                  })
                },
                {
                  name: "quick_reply",
                  buttonParamsJson: JSON.stringify({
                    display_text: "PING",
                    id: `${prefix}ping`
                  })
                },
                {
                  name: "single_select",
                  buttonParamsJson: JSON.stringify({
                    title: "SELECT THE MENU",
                    sections: [
                      {
                        title: "HERE ARE ALL MENU OPTIONS ⤵️",
                        highlight_label: "KHAN-MD 🇵🇰",
                        rows: [
                          {
                            title: "🌍 ALL MENU",
                            description: "Tap To Show Khan MD All Menu",
                            id: "View All Menu"
                          },
                          {
                            title: "⬇️ DOWNLOADER MENU",
                            description: "Tap To Show The Downloader Menu",
                            id: "Downloader Menu"
                          },
                          {
                            title: "✨ AI MENU",
                            description: "Tap To See Ai Menu",
                            id: "Ai Menu"
                          },
                          {
                            title: "🧚‍♂️ FUN MENU",
                            description: "Tap To Show Fun Menu",
                            id: "Fun Menu"
                          }
                        ]
                      }
                    ]
                  })
                }
              ]
            }
          }
        }
      }
    }, {});

    await Matrix.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id });
  } catch (e) {
    console.error(e);
    await Matrix.sendMessage(m.from, { text: `Error: ${e.message}` }, { quoted: m });
  }
};

// Submenu handlers
const submenuHandlers = {
  "View All Menu": async (m, Matrix) => {
    const str = `╭━━━〔 *KHAN-MD* 〕━━━┈⊷
┃★╭──────────────
┃★│ Owner : *KHAN-MD*
┃★│ User : *${m.pushName}*
┃★│ Baileys : *Multi Device*
┃★│ Type : *NodeJs*
┃★│ Mode : *${config.MODE}*
┃★│ Platform : *${os.platform()}*
┃★│ Prefix : *[ ${config.PREFIX} ]*
┃★│ Version : *1.1.0*
┃★╰──────────────
╰━━━━━━━━━━━━━━━┈⊷
╭━❮ 𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳 ❯━╮
┃◈ ${config.PREFIX}𝙰𝚙𝚔
┃◈ ${config.PREFIX}𝙵𝚊𝚌𝚎𝚋𝚘𝚘𝚔
┃◈ ${config.PREFIX}𝙸𝚗𝚜𝚝𝚊
┃◈ ${config.PREFIX}𝚈𝚝𝚖𝚙3
┃◈ ${config.PREFIX}𝚈𝚝𝚖𝚙4
╰━━━━━━━━━━━━━━━⪼`;
    await Matrix.sendMessage(m.from, { image: fs.readFileSync('./media/khan.jpg'), caption: str }, { quoted: m });
  },
  "Downloader Menu": async (m, Matrix) => {
    const str = `╭━━━〔 *DOWNLOADER MENU* 〕━━━┈⊷
┃★╭──────────────
┃★│ Owner : *KHAN-MD*
┃★│ User : *${m.pushName}*
┃★│ Baileys : *Multi Device*
┃★│ Type : *NodeJs*
┃★│ Mode : *${config.MODE}*
┃★│ Platform : *${os.platform()}*
┃★│ Prefix : *[ ${config.PREFIX} ]*
┃★│ Version : *1.1.0*
┃★╰──────────────
╰━━━━━━━━━━━━━━━┈⊷
╭━❮ 𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳 ❯━╮
┃◈ ${config.PREFIX}𝙰𝚙𝚔
┃◈ ${config.PREFIX}𝙵𝚊𝚌𝚎𝚋𝚘𝚘𝚔
┃◈ ${config.PREFIX}𝙸𝚗𝚜𝚝𝚊
┃◈ ${config.PREFIX}𝚈𝚝𝚖𝚙3
┃◈ ${config.PREFIX}𝚈𝚝𝚖𝚙4
╰━━━━━━━━━━━━━━━⪼`;
    await Matrix.sendMessage(m.from, { image: fs.readFileSync('./media/khan.jpg'), caption: str }, { quoted: m });
  }
};

// Export the handler
export default {
  command: "menu",
  desc: "Show interactive menu",
  handler: menuHandler,
  submenuHandlers
};