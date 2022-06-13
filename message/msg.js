"use strict";
const {
	downloadContentFromMessage
} = require("@adiwajshing/baileys")
const { color, bgcolor } = require('../lib/color')
const { getBuffer, fetchJson, fetchText, getRandom, getGroupAdmins, runtime, sleep, makeid } = require("../lib/myfunc");
const { webp2mp4File } = require("../lib/convert")
const { y2mateA, y2mateV } = require('../lib/y2mate')
const { addBanned, unBanned, BannedExpired, cekBannedUser } = require("../lib/banned");
const { pinterest } = require("../lib/pinterest")
const { isLimit, limitAdd, getLimit, giveLimit, addBalance, kurangBalance, getBalance, isGame, gameAdd, givegame, cekGLimit } = require("../lib/limit");
const { isTicTacToe, getPosTic } = require("../lib/tictactoe");
const { addPlayGame, getJawabanGame, isPlayGame, cekWaktuGame, getGamePosi } = require("../lib/game");
const tictac = require("../lib/tictac");
const _prem = require("../lib/premium");

const fs = require ("fs");
const moment = require("moment-timezone");
const util = require("util");
const { exec, spawn } = require("child_process");
const ffmpeg = require("fluent-ffmpeg");
const xfar = require('xfarr-api');
const axios = require("axios");
const hxz = require("hxz-api");
const ra = require("ra-api");
const kotz = require("kotz-api");
const yts = require("yt-search");
const speed = require("performance-now");
const request = require("request");
const ms = require("parse-ms");

//Apikey melcanz, Search aja melcanz.com
//Apikey Anto = hardianto
//Apikey jojo = Syaa
const apikey = "melcantik"
const keyanto = "hardianto"
const jojoapi = "Syaa"
const ikiapi = "FuckBitch"

// Setting Donasi
const dana = "0896-5338-1067"
const ig = "xxyannkyy"

// Exif
const Exif = require("../lib/exif")
const exif = new Exif()

// DB Game
let tictactoe = [];
let tebakgambar = []

// Database
let actived = true
let pendaftar = JSON.parse(fs.readFileSync('./database/user.json'))
let ban = JSON.parse(fs.readFileSync('./database/ban.json'));
let mess = JSON.parse(fs.readFileSync('./message/response.json'));
let premium = JSON.parse(fs.readFileSync('./database/premium.json'));
let balance = JSON.parse(fs.readFileSync('./database/balance.json'));
let limit = JSON.parse(fs.readFileSync('./database/limit.json'));
let glimit = JSON.parse(fs.readFileSync('./database/glimit.json'));
let _cmd = JSON.parse(fs.readFileSync('./database/command.json'));
let _cmdUser = JSON.parse(fs.readFileSync('./database/commandUser.json'));
moment.tz.setDefault("Asia/Jakarta").locale("id");

module.exports = async(conn, msg, m, setting, store) => {
	try {
		let { ownerNumber, botName, moderatorNumber, gamewaktu, limitCount } = setting
		let { allmenu } = require('./help')
		const { type, quotedMsg, mentioned, now, fromMe } = msg
		if (msg.isBaileys) return
		const jam = moment.tz('asia/jakarta').format('HH:mm:ss')
		let dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
		const ucapanWaktu = "Selamat "+dt.charAt(0).toUpperCase() + dt.slice(1)
		const content = JSON.stringify(msg.message)
		const from = msg.key.remoteJid
		const chats = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (type == 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (type == 'documentMessage') && msg.message.documentMessage.caption ? msg.message.documentMessage.caption : (type == 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (type == 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : (type == 'buttonsResponseMessage' && msg.message.buttonsResponseMessage.selectedButtonId) ? msg.message.buttonsResponseMessage.selectedButtonId : (type == 'templateButtonReplyMessage') && msg.message.templateButtonReplyMessage.selectedId ? msg.message.templateButtonReplyMessage.selectedId : ''
		const toJSON = j => JSON.stringify(j, null,'\t')
		if (conn.multi) {
			var prefix = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/.test(chats) ? chats.match(/^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/gi) : '#'
		} else {
			if (conn.nopref) {
				prefix = ''
			} else {
				prefix = conn.prefa
			}
		}
		const more = String.fromCharCode(8206)
    const readmore = more.repeat(4001)
		const args = chats.split(' ')
		const command = chats.toLowerCase().split(' ')[0] || ''
		const isCmd = command.startsWith(prefix)
		const isGroup = msg.key.remoteJid.endsWith('@g.us')
		const sender = isGroup ? (msg.key.participant ? msg.key.participant : msg.participant) : msg.key.remoteJid
		const isOwner = ownerNumber.includes(sender)
		const isModerator = moderatorNumber.includes(sender)
		const isBan = cekBannedUser(sender, ban)
		const pushname = msg.pushName
		const q = chats.slice(command.length + 1, chats.length)
		const body = chats.startsWith(prefix) ? chats : ''
		const botNumber = conn.user.id.split(':')[0] + '@s.whatsapp.net'
		const groupMetadata = isGroup ? await conn.groupMetadata(from) : ''
		const groupName = isGroup ? groupMetadata.subject : ''
		const groupId = isGroup ? groupMetadata.id : ''
		const groupMembers = isGroup ? groupMetadata.participants : ''
		const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
		const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
		const isGroupAdmins = groupAdmins.includes(sender)
		const isUser = pendaftar.includes(sender)
		const isPremium = isOwner ? true : _prem.checkPremiumUser(sender, premium)

		const gcounti = setting.gcount
		const gcount = isPremium ? gcounti.prem : gcounti.user

		const mentionByTag = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.mentionedJid : []
                const mentionByReply = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.participant || "" : ""
                const mention = typeof(mentionByTag) == 'string' ? [mentionByTag] : mentionByTag
                mention != undefined ? mention.push(mentionByReply) : []
                const mentionUser = mention != undefined ? mention.filter(n => n) : []
		
		async function downloadAndSaveMediaMessage (type_file, path_file) {
			if (type_file === 'image') {
				var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
				let buffer = Buffer.from([])
				for await(const chunk of stream) {
					buffer = Buffer.concat([buffer, chunk])
				}
				fs.writeFileSync(path_file, buffer)
				return path_file
			} else if (type_file === 'video') {
				var stream = await downloadContentFromMessage(msg.message.videoMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
				let buffer = Buffer.from([])
				for await(const chunk of stream) {
					buffer = Buffer.concat([buffer, chunk])
				}
				fs.writeFileSync(path_file, buffer)
				return path_file
			} else if (type_file === 'sticker') {
				var stream = await downloadContentFromMessage(msg.message.stickerMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage, 'sticker')
				let buffer = Buffer.from([])
				for await(const chunk of stream) {
					buffer = Buffer.concat([buffer, chunk])
				}
				fs.writeFileSync(path_file, buffer)
				return path_file
			} else if (type_file === 'audio') {
				var stream = await downloadContentFromMessage(msg.message.audioMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.audioMessage, 'audio')
				let buffer = Buffer.from([])
				for await(const chunk of stream) {
					buffer = Buffer.concat([buffer, chunk])
				}
				fs.writeFileSync(path_file, buffer)
				return path_file
			}
		}
		const sendFileFromUrl = async (from, url, caption, options = {}) => {
		    let mime = '';
		    let res = await axios.head(url)
		    mime = res.headerd["content-type"]
		    let type = mime.split("/")[0]+"Message"
		    if (mime.split("/")[0] === "image") {
		       var img = await getBuffer(url)
		       return conn.sendMessage(from, { image: img, caption: caption }, options)
		    } else if (mime.split("/")[0] === "video") {
		       var vid = await getBuffer(url)
		       return conn.sendMessage(from, { video: vid, caption: caption }, options)
		    } else if (mime.split("/")[0] === "audio") {
		       var aud = await getBuffer(url)
		       return conn.sendMessage(from, { audio: aud, mimetype: 'audio/mp3' }, options)
		    } else {
		       var doc = await getBuffer(url)
		       return conn.sendMessage(from, { document: doc, mimetype: mime, caption: caption }, options)
		    }
		}
        async function sendPlay(from, query) {
           var url = await yts(query)
           url = url.videos[0].url
           hxz.youtube(url).then(async(data) => {
             var button = [{ buttonId: `/ytmp3 ${url}`, buttonText: { displayText: `🎵 Audio (${data.size_mp3})` }, type: 1 }, { buttonId: `/ytmp4 ${url}`, buttonText: { displayText: `🎥 Video (${data.size})` }, type: 1 }]
             conn.sendMessage(from, { caption: `*Title :* ${data.title}\n*Quality :* ${data.quality}\n*Url :* https://youtu.be/${data.id}`, location: { jpegThumbnail: await getBuffer(data.thumb) }, buttons: button, footer: 'Pilih Salah Satu Button Dibawah⬇️', mentions: [sender] })
           }).catch((e) => {
             conn.sendMessage(from, { text: mess.error.api }, { quoted: msg })
               ownerNumber.map( i => conn.sendMessage(from, { text: `Send Play Error : ${e}` }))
           })
        }
		const isUrl = (url) => {
			return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
		}
		function jsonformat(string) {
            return JSON.stringify(string, null, 2)
        }
		function monospace(string) {
            return '```' + string + '```'
        }
		function randomNomor(min, max = null) {
		  if (max !== null) {
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random() * (max - min + 1)) + min;
		  } else {
			return Math.floor(Math.random() * min) + 1
		  }
		}
		const pickRandom = (arr) => {
			return arr[Math.floor(Math.random() * arr.length)]
		}
		function mentions(teks, mems = [], id) {
			if (id == null || id == undefined || id == false) {
			  let res = conn.sendMessage(from, { text: teks, mentions: mems })
			  return res
			} else {
		      let res = conn.sendMessage(from, { text: teks, mentions: mems }, { quoted: msg })
		      return res
 		    }
		}
		const reply = (teks) => {
			conn.sendMessage(from, { text: teks }, { quoted: msg })
		}
		const textImg = (teks) => {
			return conn.sendMessage(from, { text: teks, jpegThumbnail: fs.readFileSync(setting.pathimg) }, { quoted: msg })
		}
		const sendMess = (hehe, teks) => {
			conn.sendMessage(hehe, { text, teks })
		}
		const buttonWithText = (from, text, footer, buttons) => {
			return conn.sendMessage(from, { text: text, footer: footer, templateButtons: buttons })
		}
		const sendContact = (jid, numbers, name, quoted, mn) => {
			let number = numbers.replace(/[^0-9]/g, '')
			const vcard = 'BEGIN:VCARD\n' 
			+ 'VERSION:3.0\n' 
			+ 'FN:' + name + '\n'
			+ 'ORG:;\n'
			+ 'TEL;type=CELL;type=VOICE;waid=' + number + ':+' + number + '\n'
			+ 'END:VCARD'
			return conn.sendMessage(from, { contacts: { displayName: name, contacts: [{ vcard }] }, mentions : mn ? mn : []},{ quoted: quoted })
		}
		//{ callButton: { displayText: `Call Owner!`, phoneNumber: `+6281319944917` } },
		const buttonsDefault = [
			{ urlButton: { displayText: `GRUP BOT`, url : `https://chat.whaapp.com/LGSSpulXgl9BDOiflqvAKI`}},
			{ callButton: { displayText: `Call Owner`, url : `0896-5338-1067`}},
			{ urlButton: { displayText: `Source Code`, url : `https://github.com/rtwone`}},
			{ quickReplyButton: { displayText: `Donasi`, id: `${prefix}donate` } },
			{ quickReplyButton: { displayText: `Info Bot`, id: `${prefix}infobot` } },
			{ quickReplyButton: { displayText: `DashBoard`, id: `${prefix}dashboard` } },
		]
		const buttonmenu = [
		  { urlButton: { displayText: `Source Code`, url: `github.com/rtwone/chitandabot`}},
		  { urlButton: { displayText: `Owner`, url:`wa.me/6289653381067?text=hy+bang`}},
		  {quickReplyButton: {displayText:`Dashboard`, id:'#dashboard'}},
		  {quickReplyButton: {displayText:`donasi`, id:'#donasi'}},
		  {quickReplyButton: {displayText: `Thanks to`, id: `#tqto`
		  }},]
		const button5 = [
			{ callButton: { displayText: `Number Owner`, phoneNumber: `0896-5338-1067` } },
			{ urlButton: { displayText: `Instagram`, url : `https://instagram.com/xxyannkyy` } },
			{ quickReplyButton: { displayText: `Back To Menu`, id: `${prefix}menu` } },
		] 
		const button3 = [
		{ callButton: { displayText: `Number Owner`, phoneNumber: `0896-5338-1067` } },
		{ urlButton: { displayText: `Grup Bot`, url : `https://chat.whaapp.com/LGSSpulXgl9BDOiflqvAKI`} },
		{ urlButton: { displayText: `Instagram`, url : `https://instagram.com/xxyannkyy` } },
		{ quickReplyButton: { displayText: `Back To Menu`, id: `${prefix}menu` } },
	] 
	const bece = [
	{ urlButton: { displayText: `Instagram`, url:`https://instagram.com/xxyannkyy`}},
	{ callButton: { displayText: 'Call Owner' , phoneNumber:'0896-5338-1067'}},
	{ quickReplyButton: { displayText:'Menu', id:`${prefix}menu` }},
	]
	
	const buttongrup = [
	{ urlButton: { displayText: `Group 1`, url: `https://chat.whatsapp.com/HECLovHbCI6LVVH4Q8FN2C`} },
	{ urlButton: { displayText: `Group 2`, url: `https://chat.whatsapp.com/KN91ApM2kIR09qRbiuXfEf`} },
	{ urlButton: { displayText: `Group 3`, url: `https://chat.whatsapp.com/LGSSpulXgl9BDOifIqvAKl`} },
	{ quickReplyButton: { displayText: `Back To Menu`, id: `${prefix}menu`} },
	]
    const yannzzz = [
		{ urlButton:  { displayText : 'Source Code' , url : 'https://github.com/rtwone' }},
		{ callButton : { displayText : 'Call Owner' , phoneNumber : '0896-5338-1067' }},
		]
    const bunbun = [ 
    { urlButton: { displayText: 'Instagram', url: 'https://instagram.com/xxyannkyy' }},
    ]
		const isImage = (type == 'imageMessage')
		const isVideo = (type == 'videoMessage')
		const isSticker = (type == 'stickerMessage')
		const isQuotedMsg = (type == 'extendedTextMessage')
		const isQuotedImage = isQuotedMsg ? content.includes('imageMessage') ? true : false : false
		const isQuotedAudio = isQuotedMsg ? content.includes('audioMessage') ? true : false : false
		const isQuotedDocument = isQuotedMsg ? content.includes('documentMessage') ? true : false : false
		const isQuotedVideo = isQuotedMsg ? content.includes('videoMessage') ? true : false : false
		const isQuotedSticker = isQuotedMsg ? content.includes('stickerMessage') ? true : false : false

		// Auto Read & Presence Online
		conn.sendReadReceipt(from, sender, [msg.key.id])
		conn.sendPresenceUpdate('available', from)
		
		//banned
		if (!isGroup && isBan) {
		  conn.modifyChat(from, 'delete')
		}
        if (isBan) return

        BannedExpired(ban)
        
		// Premium
		_prem.expiredCheck(conn, premium)

		// Tictactoe
		if (isTicTacToe(from, tictactoe)) tictac(chats, prefix, tictactoe, from, sender, reply, mentions, addBalance, balance)

        // Game
		cekWaktuGame(conn, tebakgambar)
		if (isPlayGame(from, tebakgambar) && isUser) {
		  if (chats.toLowerCase() == getJawabanGame(from, tebakgambar)) {
		    var htgm = randomNomor(100, 150)
			addBalance(sender, htgm, balance)
		    reply(`*Selamat Jawaban Kamu Benar 🎉*\n\nJawaban : ${getJawabanGame(from, tebakgambar)}\nHadiah : ${htgm} balance\n\nIngin bermain lagi? ketik *${prefix}tebakgambar*`)
		    tebakgambar.splice(getGamePosi(from, tebakgambar), 1)
		  }
		}
		
		async function addCountCmdUser(nama, sender, u) {
         var posi = null
         var pos = null
         Object.keys(u).forEach((i) => {
            if (u[i].jid === sender) {
               posi = i
            }
          })
         if (posi === null) {
            u.push({jid: sender, db: [{nama: nama, count: 0}]})
            fs.writeFileSync('./database/commandUser.json', JSON.stringify(u, null, 2));
          Object.keys(u).forEach((i) => {
             if (u[i].jid === sender) {
               posi = i
             }
          })
         }
         if (posi !== null) {
         Object.keys(u[posi].db).forEach((i) => {
            if (u[posi].db[i].nama === nama) {
               pos = i
            }
          })
         if (pos === null) {
           u[posi].db.push({nama: nama, count: 1})
           fs.writeFileSync('./database/commandUser.json', JSON.stringify(u, null, 2));
          } else {
           u[posi].db[pos].count += 1
           fs.writeFileSync('./database/commandUser.json', JSON.stringify(u, null, 2));
          }
         }
        }

        async function getPosiCmdUser(sender, _db) {
         var posi = null
         Object.keys(_db).forEach((i) => {
          if (_db[i].jid === sender) {
             posi = i
          }
         })
          return posi
        }
        async function addCountCmd(nama, sender, _db) {
         addCountCmdUser(nama, sender, _cmdUser)
          var posi = null
            Object.keys(_db).forEach((i) => {
               if (_db[i].nama === nama) {
                 posi = i
               }
            })
            if (posi === null) {
              _db.push({nama: nama, count: 1})
              fs.writeFileSync('./database/command.json',JSON.stringify(_db, null, 2));
            } else {
            _db[posi].count += 1
            fs.writeFileSync('./database/command.json',JSON.stringify(_db, null, 2));
          }
        }
        
if (chats.startsWith("@6288213292687")){
   conn.sendMessage(from, { audio: {url : `https://d.top4top.io/m_22231oj7h1.mp3`}, mimetype: 'audio/mp4', ptt: true}, {quoted: msg})
}
if (chats.startsWith("eh")){
   conn.sendMessage(from, { audio: {url : `https://b.top4top.io/m_2223iin241.mp3`}, mimetype: 'audio/mp4', ptt: true}, {quoted: msg})
}
if (chats.startsWith("Eh")){
   conn.sendMessage(from, { audio: {url : `https://b.top4top.io/m_2223iin241.mp3`}, mimetype: 'audio/mp4', ptt: true}, {quoted: msg})
}
if (chats.startsWith("Ghoskyy")){
   conn.sendMessage(from, { audio: {url : `https://d.top4top.io/m_22231oj7h1.mp3`}, mimetype: 'audio/mp4', ptt: true}, {quoted: msg})
}
if (chats.startsWith("woy")){
   conn.sendMessage(from, { audio: {url : `https://d.top4top.io/m_22231oj7h1.mp3`}, mimetype: 'audio/mp4', ptt: true}, {quoted: msg})
}
		if (chats.startsWith("> ") && isOwner) {
		console.log(color('[EVAL]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Dari Owner aowkoakwoak`))
		  const ev = (sul) => {
            var sat = JSON.stringify(sul, null, 2)
            var bang = util.format(sat)
            if (sat == undefined) {
              bang = util.format(sul)
            }
            return textImg(bang)
          }
          try {
           textImg(util.format(eval(`;(async () => { ${chats.slice(2)} })()`)))
          } catch (e) {
           textImg(util.format(e))
          }
		} else if (chats.startsWith("$ ") && isOwner) {
        console.log(color('[EXEC]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Dari Owner aowkoakwoak`))
          exec(chats.slice(2), (err, stdout) => {
		    if (err) return reply(`${err}`)
		    if (stdout) reply(`${stdout}`)
		  })
        } else if (chats.startsWith("x ") && isOwner) {
	    console.log(color('[EVAL]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Dari Owner aowkaokwoak`))
		 try {
	       let evaled = await eval(chats.slice(2))
		   if (typeof evaled !== 'string') evaled = require("util").inspect(evaled)
			reply(`${evaled}`)
		 } catch (err) {
		   reply(`${err}`)
		 }
		}
		
		// Logs;
		if (!isGroup && isCmd && !fromMe) {
			addBalance(sender, randomNomor(45), balance)
			console.log('->[\x1b[1;32mCMD\x1b[1;37m]', color(moment(msg.messageTimestamp * 1000).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
		}
		if (isGroup && isCmd && !fromMe) {
			addBalance(sender, randomNomor(45), balance)
			console.log('->[\x1b[1;32mCMD\x1b[1;37m]', color(moment(msg.messageTimestamp *1000).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(groupName))
		}

		switch(command) {
			// Main Menu
			case 'menu':
			case prefix+'menu':
			case prefix+'help': 
			  addCountCmd('menu', sender,_cmd)
			    var teks = allmenu(sender, prefix, pushname, isOwner, isPremium, balance, limit, limitCount, glimit, gcount)
  conn.sendMessage(from, { caption: teks, image : {url: 'https://telegra.ph/file/2650f3061c6321025c68e.jpg'}, templateButtons: buttonmenu,footer: 'Ghos - Bid',mention: [sender]} )
				break
				
case prefix+'donasiah':
case 'donasiah':
  reply(`Jika Ingin Donasi Harap Hubungi Owner\n\nhttps://wa.me/6289653381067`)
  break
case prefix+'donasi':
case 'donasi':
case 'donate':
  case prefix+'donate':
    addCountCmd('donasi', sender, _cmd)
  var donasibut = [
			{ callButton: { displayText: `Number Owner`, phoneNumber: `0896-5338-1067` } },
			{ urlButton: { displayText: `Grup Bot`, url : `https://chat.whatsapp.com/LGSSpulXgl9BDOiflqvAKI` } },
			{ quickReplyButton: { displayText: `Aku Ingin Donasi`, id: `${prefix}donasiah` } },
		]
var teks = `  --[ *DONATE* ]--
  OVO
  - ${dana}
  DANA
  - ${dana}
  PULSA
  - ${dana}
  INSTAGRAM
  - https://www.instagram.com/xxyannkyy

  Note : Donasi Seikhlasnya`
 conn.sendMessage(from, { caption: teks, image: {url: `https://i.ibb.co/CPcFJ6c/IMG-20220131-WA0504.jpg`}, templateButtons: donasibut, footer: 'Ghos - Bid', mentions: [sender]} )  
break
case prefix+'sewa':
case 'sewa':
case 'daftarprem':
  case prefix+'daftarprem':
    addCountCmd('sewa', sender, _cmd)
  var teks = `--[ *List Harga Ghosbid Premium* ]--

_Yakin kamu mau daftar ke premium?_

*Keuntungan :*
- Limit Unlimited
- Akses Fitur Premium
- Bot Join Grup WhatsApp Mu
- Limit Tidak Akan Menurun
- Transfer Limit Game

*LIST DAFTAR PREMIUM*
- Rp.5.000  - 1 minggu
- Rp.10.000 - 2 minggu 
DST.`
			    conn.sendMessage(from, { caption: teks, location: { jpegThumbnail: fs.readFileSync(setting.pathimg) }, templateButtons: button5, footer: 'Ghos - Bid', mentions: [sender] })
			    break
			case prefix+'runtime':
			case 'runtime':
			  addCountCmd('runtime', sender, _cmd)
		let xynnnn = [
		{ urlButton: { displayText : 'Source Code' , url : 'https://github.com/rtwone' }},
		{ callButton : { displayText : 'Call Owner' , phoneNumber : '0896-5338-1067' }},
		]
		conn.sendMessage(from, { caption: 'active in', templateButtons: xynnnn, footer: `${runtime(process.uptime())}`}, { quoted: msg } )
			    break
			case prefix+'speed':
			case 'speed':
			  addCountCmd('speed', sender, _cmd)
			    let timestamp = speed();
                            let latensi = speed() - timestamp
                            conn.sendMessage(from, { caption: 'Kecepetan Respon Dalam',templateButtons: yannzzz, footer: `-> ${latensi.toFixed(4)} Second`}, {quoted: msg})
break 
case prefix+'sc':
case prefix+'sourcecode':
			case "sc":
addCountCmd('source code', sender, _cmd)
var escream = [ 
{ urlButton: { displayText: 'Sc Chitanda Bot', url:'https://github.com/rtwone'}},
{ urlButton: { displayText: 'Sc Jojo Bot', url:'https://github.com/getsya'}},
]

conn.sendMessage(from, { caption: `silahkan di pilih kak bebas yang mana saja\n\n*Note* : Thanks To ny Jangan Di hapus_^`, templateButtons: escream, footer:`Ghos Bid`}, {quoted: msg})
break
case prefix+'infobot':
  case prefix+'inforobot':
    case prefix+'info':
    case 'infobot':
      var captions = `*INFO GHOSKYY BID*

*Nama Bot :* Ghoskyy
*Name Owner :* Xyanndex
*Nomor Owner :* wa.me/6289653381067
*Engine :* NodeJs
*Status :* Aktif
*Aktif Selama :* ${runtime(process.uptime())}

===================
Thanks To
- Riyan
- Arasya
- Amel
- Hardianto
- Febri
- Xyanndex`

conn.sendMessage(from, { caption: captions, document: {url: 'https://telegra.ph/file/d78b4867ae3e95f296032.jpg'}, templateButtons: button3, footer: 'Ghos - Bid',mimetype:'application/vnd.openxmlfotmats-officedocument.presentationml.presentation',fileName:'Ghosky MD',fileLength:99999999,pageCount:'9999999',headerType:'DOCUMENT'} )
break
case prefix+'tqto':
case 'tqto':
	var aselyyy = `
	*- Adiwajshing*
	*- Irfan [base]*
	*- Arasya*
	*- Xyanndex*`

	conn.sendMessage(from, { caption: aselyyy, document: {url: 'https://telegra.ph/file/d78b4867ae3e95f296032.jpg'}, templateButtons: button3, footer: 'Ghoskyy',mimetype:'application/pdf',fileName:'Thanks To',fileLength:'9999999',pageCount:'999999999', mentions: [sender],headerType:'DOCUMENT'} )
	break
	case prefix+'groupghoskyy':
	case prefix+'grupghoskyy':
	  
	conn.sendMessage(from, {caption: 'silahkan tab di bawah ini!!', document: {url: 'https://telegra.ph/file/d78b4867ae3e95f296032.jpg'}, templateButtons: buttongrup,footer:'Ghoskyy',mimetype:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",fileName:'List Group Ghoskyy',fileLength:'99999',pageCount:'9999', headerType:'DOCUMENT'})
	break
	case prefix+'dashboard':
	case 'dashboard':
	  addCountCmd('dashboard', sender, _cmd)
		var posi = await getPosiCmdUser(sender, _cmdUser)
		_cmdUser[posi].db.sort((a, b) => (a.count < b.count) ? 1 : -1)
		_cmd.sort((a, b) => (a.count < b.count) ? 1 : -1)
		var posi = await getPosiCmdUser(sender, _cmdUser)
		var jumlah = _cmdUser[posi].db.length
		if (jumlah > 5) jumlah = 5
		var totalUser = 0
		for (let x of _cmdUser[posi].db) {
			totalUser = total + x.count
		}
		var total = 0
		for (let o of _cmd) {
			total = total + o.count
		}
  var teks = `*GhosBid MD DashBoard\n*Hit*\n*Global* : ${total}\n*User* : ${totalUser}\n\n`
	teks += `*Most Command Global*\n`
		for (let u = 0; u < 10; u ++) {
			teks += `*-* ${_cmd[u].nama} : ${_cmd[u].count}\n`
		}
		teks += `*Most Command User*\n`
		for (let i = 0; i < jumlah; i ++) {
			teks += `*-* ${_cmdUser[posi].db[i].nama} : ${_cmdUser[posi].db[i].count}\n`
		}
		reply(teks)
		break

			/*case prefix+'donate':
			case prefix+'donasi':
			    reply(`◪ DONASI
  │
  ├─ ❏ GOPAY
  ├─ ❏ 088213292687
  ├─ ❏ OVO
  ├─ ❏ 088213292687
  ├─ ❏ PULSA
  ├─ ❏ 081319944917
  ├─ ❏ PULSA2
  ├─ ❏ 088213292687
  ├─ ❏ INSTAGRAM
  └─ ❏ https://www.instagram.com/sofunsyabi.id
  
  Donasi Untuk Upgrade Ke Fitur Premium
  Note : Donasi Seikhlasnya`)
			    break*/
			case prefix+'owner': case 'owner':
			    for (let x of ownerNumber) {
			      sendContact(from, x.split('@s.whatsapp.net')[0], 'Xyanndexx', msg)
				}
		
			    break
			    case prefix+'moderator': case 'moderator':

			    for (let xyyannnkyy of moderatorNumber) {

			      sendContact(from, xyyannkyy.split('@s.whatsapp.net')[0], 'moderator', msg)
				}
			    break
			case prefix+'cekprem':
            case prefix+'cekpremium':
            case 'cekprem': case 'cekpremium':
              addCountCmd('cekprem', sender, _cmd)
                if (!isPremium) return reply(`Kamu bukan user premium, kirim perintah *${prefix}daftarprem* untuk membeli premium`)
                if (isOwner) return reply(`Lu owner bang!`)
                if (_prem.getPremiumExpired(sender, premium) == "PERMANENT") return reply(`PERMANENT`)
                let cekvip = ms(_prem.getPremiumExpired(sender, premium) - Date.now())
                let premiumnya = `*Expire :* ${cekvip.days} day(s) ${cekvip.hours} hour(s) ${cekvip.minutes} minute(s)`
                reply(premiumnya)
                break
            case prefix+'listprem': case 'listprem':
                let txt = `List Prem\nJumlah : ${premium.length}\n\n`
                let men = [];
                for (let i of premium) {
                    men.push(i.id)
                    txt += `*ID :* @${i.id.split("@")[0]}\n`
                  if (i.expired === 'PERMANENT') {
                    let cekvip = 'PERMANENT'
                    txt += `*Expire :* PERMANENT\n\n`
                  } else {
                    let cekvip = ms(i.expired - Date.now())
                    txt += `*Expire :* ${cekvip.days} day(s) ${cekvip.hours} hour(s) ${cekvip.minutes} minute(s) ${cekvip.seconds} second(s)\n\n`
                  }
                }
                mentions(txt, men, true)
                break
	        // Converter & Tools Menu
			case 's': case prefix+'sticker': case prefix+'stiker': case prefix+'s': case prefix+'stickergif': case prefix+'sgif': case prefix+'stikergif': case prefix+'stikgif':
			  addCountCmd('stiker', sender, _cmd)
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
				if (isImage || isQuotedImage) {
		           var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
			       var buffer = Buffer.from([])
			       for await(const chunk of stream) {
			          buffer = Buffer.concat([buffer, chunk])
			       }
			       var rand1 = 'sticker/'+getRandom('.jpg')
			       var rand2 = 'sticker/'+getRandom('.webp')
			       fs.writeFileSync(`./${rand1}`, buffer)
			       ffmpeg(`./${rand1}`)
				.on("error", console.error)
				.on("end", () => {
				  exec(`webpmux -set exif ./sticker/data.exif ./${rand2} -o ./${rand2}`, async (error) => {
				    conn.sendMessage(from, { sticker: fs.readFileSync(`./${rand2}`) })
				    limitAdd(sender, limit)
					fs.unlinkSync(`./${rand1}`)
			            fs.unlinkSync(`./${rand2}`)
			          })
				 })
				.addOutputOptions(["-vcodec", "libwebp", "-vf", "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"])
				.toFormat('webp')
				.save(`${rand2}`)
			    } else if (isVideo || isQuotedVideo) {
				 var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
				 var buffer = Buffer.from([])
				 for await(const chunk of stream) {
				   buffer = Buffer.concat([buffer, chunk])
				 }
			     var rand1 = 'sticker/'+getRandom('.mp4')
				 var rand2 = 'sticker/'+getRandom('.webp')
			         fs.writeFileSync(`./${rand1}`, buffer)
			         ffmpeg(`./${rand1}`)
				  .on("error", console.error)
				  .on("end", () => {
				    exec(`webpmux -set exif ./sticker/data.exif ./${rand2} -o ./${rand2}`, async (error) => {
				      conn.sendMessage(from, { sticker: fs.readFileSync(`./${rand2}`) }, { quoted: msg })
				      limitAdd(sender, limit)
					  fs.unlinkSync(`./${rand1}`)
				      fs.unlinkSync(`./${rand2}`)
				    })
				  })
				 .addOutputOptions(["-vcodec", "libwebp", "-vf", "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"])
				 .toFormat('webp')
				 .save(`${rand2}`)
                } else {
			       reply(`Kirim gambar/vidio dengan caption ${command} atau balas gambar/vidio yang sudah dikirim\nNote : Maximal vidio 10 detik!`)
			    }
                break
                /*case prefix+'setpp': case prefix+'setppbot':
            case prefix+'setpic': case prefix+'setpicbot':{
                if (!isOwner) return reply(mess.OnlyOwner)
                if (isImage || isQuotedImage) {
                    let encmedia = isQuotedImage ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                    let media = await conn.downloadMediaMessage(encmedia)
                    conn.updateProfilePicture(conn.user.jid, media)
                    .then((res) => reply(jsonformat(res)))
                    .catch((err) => reply(jsonformat(err)))
                } else {
                    reply(`Kirim gambar atau reply gambar dengan caption ${command}`)
                }
            }*/
                break
                case 'setpp':
                case prefix+'setpp': case prefix+'setppbot':
                   if (!isOwner) return reply(mess.OnlyOwner)
                   if (isImage || isQuotedImage) {
                     var media = await conn.downloadAndSaveMediaMessage(msg, 'image', 'ppbot.jpeg')
                     if (args[1] == '\'panjang\'') {
                       var { img } = await generateProfilePicture(media)
                       await conn.query({
                         tag: 'iq',
                         attrs: {
                           to: botNumber,
                           type:'set',
                           xmlns: 'w:profile:picture'
                         },
                         content: [
                           {
                             tag: 'picture',
                             attrs: { type: 'image' },
                             content: img
                           }
                         ]
                       })
                       fs.unlinkSync(media)
                       reply(`Sukses`)
                     } else {
                       var data = await conn.updateProfilePicture(botNumber, { url: media })
                       fs.unlinkSync(media)
                       reply(`Sukses`)
                     }
                   } else {
                     reply(`Kirim/balas gambar dengan caption ${command} untuk mengubah foto profil bot`)
                   }
                   break
			case prefix+'toimg': case prefix+'toimage':
			case prefix+'tovid': case prefix+'tovideo':
			case 'toimg': case 'tovid': case 'toimage': case 'tovideo':
			  addCountCmd('toimg', sender, _cmd)
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			    if (!isQuotedSticker) return reply(`Reply stikernya!`)
			    var stream = await downloadContentFromMessage(msg.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage, 'sticker')
			    var buffer = Buffer.from([])
			    for await(const chunk of stream) {
			       buffer = Buffer.concat([buffer, chunk])
			    }
			    var rand1 = 'sticker/'+getRandom('.webp')
			    var rand2 = 'sticker/'+getRandom('.png')
			    fs.writeFileSync(`./${rand1}`, buffer)
			    if (isQuotedSticker && msg.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.isAnimated !== true) {
			    exec(`ffmpeg -i ./${rand1} ./${rand2}`, (err) => {
			      fs.unlinkSync(`./${rand1}`)
			      if (err) return reply(mess.error.api)
			      conn.sendMessage(from, { image: { url: `./${rand2}` }}, { quoted: msg })
			      limitAdd(sender, limit)
				  fs.unlinkSync(`./${rand2}`)
			    })
			    } else {
			    reply(mess.wait)
		          webp2mp4File(`./${rand1}`).then( data => {
			       fs.unlinkSync(`./${rand1}`)
			       conn.sendMessage(from, { video: { url: data.result }}, { quoted: msg })
			       limitAdd(sender, limit)
				  })
			    }
			    break
	        // Downloader Menu
			/*case prefix+'tiktok':
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			    if (args.length < 2) return reply(`Kirim perintah ${command} link`)
			    if (!isUrl(args[1])) return reply(mess.error.Iv)
			    if (!args[1].includes('tiktok')) return reply(mess.error.Iv)
			    reply(mess.wait)
			    xfar.Tiktok(args[1]).then( data => {
			      conn.sendMessage(from, {
				   video: { url: data.medias[0].url },
				   caption: `${data.title}\n\nKamu bisa mengubahnya menjadi Vidio Tanpa Watermark atau Audio, pencet tombol dibawah untuk mengubahnya!`,
				   buttons: [{buttonId: `${prefix}tiktoknowm ${args[1]}`, buttonText: { displayText: "Without Watermark" }, type: 1 },
					{buttonId: `${prefix}tiktokaudio ${args[1]}`, buttonText: { displayText: "Audio" }, type: 1 }],
				   footer: "Create by @yannnnn.zz_"
			      }, { quoted: msg })
				  limitAdd(sender, limit)
			    }).catch(() => reply(mess.error.api))
			    break*/
			case prefix+'tiktoknowm':
			  case prefix+'tiktok':
			  case 'tiktok':
			    addCountCmd('tiktok', sender, _cmd)
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			    if (args.length < 2) return reply(`Kirim perintah ${command} link`)
			    if (!isUrl(args[1])) return reply(mess.error.Iv)
			    reply(mess.wait)
			    hxz.ttdownloader(args[1]).then( data => {
			      conn.sendMessage(from, { video: { url: data.nowm }}, { quoted: msg })
			      limitAdd(sender, limit)
				}).catch(() => reply(mess.error.api))
			    break
			case prefix+'tiktokaudio':
			case 'tiktokaudio':
			  addCountCmd('tiktokaudio', sender, _cmd)
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			    if (args.length < 2) return reply(`Kirim perintah ${command} link`)
			    if (!isUrl(args[1])) return reply(mess.error.Iv)
			    if (!args[1].includes('tiktok')) return reply(mess.error.Iv)
			    reply(mess.wait)
			    hxz.ttdownloader(args[1]).then( data => {
			      conn.sendMessage(from, { audio: { url: data.nowm }, mimetype: 'audio/mp4' }, { quoted: msg })
			       limitAdd(sender, limit)
				}).catch(() => reply(mess.error.api))
		        break
            case prefix+'play':
            case 'play':
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah ${command} query\nContoh : ${command} monokrom`)
                reply(mess.wait)
                await sendPlay(from, q)
				limitAdd(sender, limit)
                break
case prefix+'ytmp4': case prefix+'mp4':
case 'ytmp4':
  addCountCmd('ytmp4', sender, _cmd)
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			    if (args.length < 2) return reply(`Kirim perintah ${command} link`)
			    if (!isUrl(args[1])) return reply(mess.error.Iv)
			    if (!args[1].includes('youtu.be') && !args[1].includes('youtube.com')) return reply(mess.error.Iv)
			    reply(mess.wait)
			    xfar.Youtube(args[1]).then( data => {
			      //var teks = `*Youtube Video Downloader*\n\n*≻ Title :* ${data.title}\n*≻ Quality :* ${data.medias[1].quality}\n*≻ Size :* ${data.medias[1].formattedSize}\n*≻ Url Source :* ${data.url}`
			      var teks = `Succes`
			      conn.sendMessage(from, { video: { url: data.medias[1].url }, caption: teks }, { quoted: msg })
			      limitAdd(sender, limit)
				}).catch(() => reply(mess.error.api))
			    break
case prefix+'ytmp3': case prefix+'mp3':
case 'ytmp3':
  addCountCmd('ytmp3', sender, _cmd)
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			    if (args.length < 2) return reply(`Kirim perintah ${command} link`)
			    if (!isUrl(args[1])) return reply(mess.error.Iv)
			    if (!args[1].includes('youtu.be') && !args[1].includes('youtube.com')) return reply(mess.error.Iv)
			    reply(mess.wait)
			    xfar.Youtube(args[1]).then( data => {
			      var teks = `*Youtube Audio Downloader*\n\n*≻ Title :* ${data.title}\n*≻ Quality :* ${data.medias[7].quality}\n*≻ Size :* ${data.medias[7].formattedSize}\n*≻ Url Source :* ${data.url}\n\n_wait a minute sending media..._`
			      conn.sendMessage(from, { audio: { url: data.medias[7].url }, mimetype: 'audio/mp4' }, { quoted: msg })
			      limitAdd(sender, limit)
				}).catch(() => reply(mess.error.api))
			    break
case prefix+'yt2mp3':
case 'yt2mp3':
              var res = await y2mateA(args[1])
              
              break
			case prefix+'getvideo': case prefix+'getvidio':
			  addCountCmd('getvideo', sender, _cmd)
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			    if (!isQuotedImage) return reply(`Balas hasil pencarian dari ${prefix}ytsearch dengan teks ${command} <no urutan>`)
				if (!quotedMsg.fromMe) return reply(`Hanya bisa mengambil hasil dari pesan bot`)
				if (args.length < 2) return reply(`Balas hasil pencarian dari ${prefix}ytsearch dengan teks ${command} <no urutan>`)
				var kuoted = await quotedMsg.chats
                var ytIdRegex = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/gi
                var arrey = [...kuoted.matchAll(ytIdRegex)].map(x => x[1])
                if (arrey.length == 0) return reply(`Reply hasil dari *${prefix}ytsearch* dengan perintah *${command}* urutan`)
                if (isNaN(args[1])) return reply(`Hanya support angka! pilih angka 1 sampai 10\nContoh : ${command} 2`)
                if (args[1] > arrey.length) return reply(`Urutan Hasil *${prefix}ytsearch* Hanya Sampai *${arrey.length}*`)
			    reply(mess.wait)
			    xfar.Youtube(`https://youtube.com/watch?v=${arrey[args[1] -1]}`).then( data => {
			      var teks = `*Youtube Video Downloader*\n\n*≻ Title :* ${data.title}\n*≻ Quality :* ${data.medias[1].quality}\n*≻ Size :* ${data.medias[1].formattedSize}\n*≻ Url Source :* ${data.url}\n\n_wait a minute sending media..._`
			      conn.sendMessage(from, { video: { url: data.medias[1].url }, caption: teks }, { quoted: msg })
			       limitAdd(sender, limit)
				}).catch(() => reply(mess.error.api))
		        break
			case prefix+'getmusik': case prefix+'getmusic':
			case 'getmusik': case 'getmusic':
			  addCountCmd('getmusic', sender, _cmd)
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			    if (!isQuotedImage) return reply(`Balas hasil pencarian dari ${prefix}ytsearch dengan teks ${command} <no urutan>`)
				if (!quotedMsg.fromMe) return reply(`Hanya bisa mengambil hasil dari pesan bot`)
				if (args.length < 2) return reply(`Balas hasil pencarian dari ${prefix}ytsearch dengan teks ${command} <no urutan>`)
				var kuoted = await quotedMsg.chats
                var ytIdRegex = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/gi
                var arrey = [...kuoted.matchAll(ytIdRegex)].map(x => x[1])
                if (arrey.length == 0) return reply(`Reply hasil dari *${prefix}ytsearch* dengan perintah *${command}* urutan`)
                if (isNaN(args[1])) return reply(`Hanya support angka! pilih angka 1 sampai 10\nContoh : ${command} 2`)
                if (args[1] > arrey.length) return reply(`Urutan Hasil *${prefix}ytsearch* Hanya Sampai *${arrey.length}*`)
			    reply(mess.wait)
			    xfar.Youtube(`https://youtube.com/watch?v=${arrey[args[1] -1]}`).then( data => {
			      var teks = `*Youtube Audio Downloader*\n\n*≻ Title :* ${data.title}\n*≻ Quality :* ${data.medias[7].quality}\n*≻ Size :* ${data.medias[7].formattedSize}\n*≻ Url Source :* ${data.url}\n\n_wait a minute sending media..._`
			      conn.sendMessage(from, { image: { url: data.thumbnail }, caption: teks }, { quoted: msg })
			      conn.sendMessage(from, { document: { url: data.medias[7].url }, fileName: `${data.title}.mp3`, mimetype: 'audio/mp3' }, { quoted: msg })
			      limitAdd(sender, limit)
				}).catch(() => reply(mess.error.api))
			    break
case prefix+'file':
case 'file':
  addCountCmd('file', sender, _cmd)
if (!isOwner) return reply(mess.OnlyOwner)
if (args.length < 1) return reply ("*Mau nyari file apa kak*")
sendfile = `${q}`
anuu = fs.readFileSync(sendfile)
conn.sendMessage(from, {document: anuu, mimetype: 'application/octet-stream', fileName: `${q}`}, {quoted:msg})  
///aqua.sendMessage(m.chat, anuu, document, {mimetype: "application/octet-stream", filename: `${q}`, quoted: m})
break
			case 'ig': case prefix+'igdl': case prefix+'instagram': case prefix+'ig':
			  addCountCmd('instagram', sender, _cmd)
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
				if (args.length < 2) return reply(`Kirim perintah ${command} link`)
			    if (!isUrl(args[1])) return reply(mess.error.Iv)
			    if (!args[1].includes('instagram.com')) return reply(mess.error.Iv)
			    reply(mess.wait)
			    xfar.Instagram(args[1]).then( data => {
			     var teks = `*Instagram Downloader*\n\n*≻ Title :* ${data.title}\n*≻ Jumlah Media :* ${data.medias.length}\n*≻ Url Source :* ${data.url}\n\n_wait a minute sending media..._`
			     reply(teks)
			     for (let i of data.medias) {
				  if (i.extension === "mp4") {
				   conn.sendMessage(from, { video: { url: i.url }})
				  } else if (i.extension === "jpg") {
				   conn.sendMessage(from, { image: { url: i.url }})
			      }
			     }
				 limitAdd(sender, limit)
			    }).catch(() => reply(mess.error.api))
			    break
			case prefix+'facebook': case prefix+'fbdl':
			case 'facebook': case prefix+'fb': case 'fb':
			  addCountCmd('facebook', sender, _cmd)
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			    if (args.length < 2) return reply(`Kirim perintah ${command} link`)
			    if (!isUrl(args[1])) return reply(mess.error.Iv)
			    if (!args[1].includes('facebook.com')) return reply(mess.error.Iv)
			    reply(mess.wait)
			    xfar.Facebook(args[1]).then( data => {
			      conn.sendMessage(from, { video: { url: data.medias[0].url }, caption: data.title }, { quoted: msg })
			      limitAdd(sender, limit)
				}).catch(() => reply(mess.error.api))
			    break
			// Owner Menu
			case prefix+'exif':
			case 'exif':
			    if (!isOwner) return reply(mess.OnlyOwner)
			    var hohohoho = [
			    { urlButton: { displayText:'instagram', url:'https://instagram.com/xxyannkyy'}},]
			    var namaPack = q.split('|')[0] ? q.split('|')[0] : q
                var authorPack = q.split('|')[1] ? q.split('|')[1] : ''
                exif.create(namaPack, authorPack)
				conn.sendMessage(from, { text:`Sukses membuat exif` , templateButtons: hohohoho}, {quoted:msg})
				break
			case prefix+'leave':
			case 'leave':
			    if (!isOwner) return reply(mess.OnlyOwner)
				if (!isGroup) return reply(mess.OnlyGrup)
				conn.groupLeave(from)
			    break
			case prefix+'masuk':
			case 'masuk':
			  addCountCmd('join', sender, _cmd)
			  if (!isPremium)return reply("Khusus Pengguna Premium")
			    if (!isOwner) return reply(mess.OnlyOwner)
				if (args.length < 2) return reply(`Kirim perintah ${command} _linkgrup_`)
				if (!isUrl(args[1])) return reply(mess.error.Iv)
				var url = args[1]
			    url = url.split('https://chat.whatsapp.com/')[1]
				var data = await conn.groupAcceptInvite(url)
				reply(jsonformat(data))
				break
case prefix+'bc': case prefix+'broadcast': case 'broadcast':
			    if (!isOwner) return reply(mess.OnlyOwner)
		            if (args.length < 2) return reply(`Masukkan isi pesannya`)
                            var data = await store.chats.all()
                            for (let i of data)   {          
							conn.sendMessage(i.id, { text: `*Broadcast Message*\n${q}`, templateButtons: bece, footer:'From Xyann'})
                               await sleep(1000)
                            }
                            break
                            case prefix+'bcm': case 'bcm':
addCountCmd('bcm', sender, _cmd)
			    if (!isModerator) return reply(mess.onlyMode)

		            if (args.length < 2) return reply(`Masukkan isi pesannya`)
                            var data = await store.chats.all()
                            for (let i of data)   {          
							conn.sendMessage(i.id, { text: `*Broadcast Message*\n${q}`, templateButtons: bece, footer:'From Moderator'})
                               await sleep(1000)
                            }
                            break
			case prefix+'addprem':
			case 'addprem':
                if (!isOwner) return reply(mess.OnlyOwner)
                if (args.length < 2) return reply(`Penggunaan :\n*${prefix}addprem* @tag waktu\n*${prefix}addprem* nomor waktu\n\nContoh : ${command} @tag 30d`)
                if (!args[2]) return reply(`Mau yang berapa hari?`)
                if (mentioned.length !== 0) {
                    _prem.addPremiumUser(mentioned[0], args[2], premium)
                    reply('Sukses')
                } else {
                 var cekap = await conn.onWhatsApp(args[1]+"@s.whatsapp.net")
                 if (cekap.length == 0) return reply(`Masukkan nomer yang valid/terdaftar di WhatsApp`)
                    _prem.addPremiumUser(args[1] + '@s.whatsapp.net', args[2], premium)
                    reply('Sukses')
                }
                break
            case prefix+'delprem':
            case 'delprem':
                if (!isOwner) return reply(mess.OnlyOwner)
                if (args.length < 2) return reply(`Penggunaan :\n*${prefix}delprem* @tag\n*${prefix}delprem* nomor`)
                if (mentioned.length !== 0){
                    premium.splice(_prem.getPremiumPosition(mentioned[0], premium), 1)
                    fs.writeFileSync('./database/premium.json', JSON.stringify(premium))
                    reply('Sukses!')
                } else {
                 var cekpr = await conn.oWhatsApp(args[1]+"@s.whatsapp.net")
                 if (cekpr.length == 0) return reply(`Masukkan nomer yang valid/terdaftar di WhatsApp`)
                    premium.splice(_prem.getPremiumPosition(args[1] + '@s.whatsapp.net', premium), 1)
                    fs.writeFileSync('./database/premium.json', JSON.stringify(premium))
                    reply('Sukses!')
                }
                break
			// Random Menu
			case prefix+'quote': case prefix+'quotes':
			case prefix+'randomquote': case prefix+'randomquotes':
			case 'quote': case 'quotes':
			  addCountCmd('quotes', sender, _cmd)
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
				var data = await fetchJson(`https://docs-jojoapi.herokuapp.com/api/randomquote?apikey=${jojoapi}`)
				var anjayani = `${data.result.quotes}\n\nQuotes By - ${data.result.author}`
			    var but = [{buttonId: `${command}`, buttonText: { displayText: "Get Quotes" }, type: 1 }]
conn.sendMessage(from, { text: anjayani, buttons: but, footer: "Ghos - Bid", templateButtons: but }, {quoted: msg})
				limitAdd(sender, limit)
				break
case prefix+'covid': case prefix+'covid19': case prefix+'kopit':
case 'covid': case 'covid19':
  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
  var data = await fetchJson(`https://docs-jojoapi.herokuapp.com/api/covidworld?apikey=${jojoapi}`)
  var captnya = `*[ COVID WORLD ]*\n\nTotal Kasus Seluruh Dunia : *${data.result.totalCases}* Jiwa\nTotal Sembuh : *${data.result.recovered}* Jiwa\nMeninggal : *${data.result.deaths}* Jiwa\nKasus Aktif : *${data.result.activeCases}*\nKasus Tertutup : *${data.result.closedCases}*\n\nPembaruan Terakhir Pada : *${data.result.lastUpdate}*`
   conn.sendMessage(from, {caption: captnya, image: { url: `https://telegra.ph/file/86b3b90581f9d31353b62.jpg`}}, {quoted: msg})
   limitAdd(sender, limit)
   break
case prefix+'shortlink':
case 'shortlink':
  addCountCmd('shortlink', sender,_cmd)
  if (args.length < 2) return reply(`Kirim perintah ${command} link`)
  if (!isUrl(args[1])) return reply("Masukan Link")
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
				var data = await fetchJson(`https://docs-jojoapi.herokuapp.com/api/short/tiny?url=${args[1]}&apikey=${jojoapi}`)
			    reply(`Link : ${data.result.link}`)
				limitAdd(sender, limit)
				break
case prefix+'hitungmundur':
case 'hitungmundur':
  if (args.length < 2) return reply(`Mana tanggalnya?\nContoh : ${prefix}hitungmundur 12 10 2022`)
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			    if (isNaN(args[1], args[2], args[3])) return reply(`Harus berupa angka`)
				var data = await fetchJson(`https://melcanz.com/countdown?tanggal=${args[1]}&bulan=${args[2]}&tahun=${args[3]}&apikey=${apikey}`)
			    reply(`Terisisa ${data.result}`)
				limitAdd(sender, limit)
				break
case prefix+'kbbi':
case 'kbbi':
  addCountCmd('kbbi', sender,_cmd)
  if (args.length < 2) return reply(`Kirim perintah ${command} jembatan`)
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			    const kbbi = args.join(" ")
				var data = await fetchJson(`https://docs-jojoapi.herokuapp.com/api/kbbi?kata=${args[1]}&apikey=${jojoapi}`)
			    reply(`Kata : ${kbbi}\nArti : ${data.result.arti}`)
				limitAdd(sender, limit)
				break
			case prefix+'cecan': case prefix+'cewek':
			case 'cecan':
			  addCountCmd('cecan', sender,_cmd)
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
				reply(mess.wait)
			    var query = ["cecan hd","cecan indo","cewe cantik", "cewe aesthetic", "cecan aesthetic"]
                var data = await pinterest(pickRandom(query))
				var but = [{buttonId: `/cecan`, buttonText: { displayText: "Get Again Pict" }, type: 1 }]
				conn.sendMessage(from, { caption: "Random Cewe Cantik", image: { url: pickRandom(data.result) }, buttons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
			    limitAdd(sender, limit)
 			    break
			case prefix+'cogan': case prefix+'cowok': case 'cogan':
			  addCountCmd('cogan', sender,_cmd)
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
				reply(mess.wait)
				var query = ["cogan hd","cogan indo","cowo ganteng","handsome boy","hot boy","oppa","cowo aesthetic","cogan aesthetic"]
				var data = await pinterest(pickRandom(query))
				var but = [{buttonId: `/cogan`, buttonText: { displayText: "Get Again Pict" }, type: 1 }]
				conn.sendMessage(from, { caption: "Random Cowo Ganteng", image: { url: pickRandom(data.result) }, buttons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
			    limitAdd(sender, limit)
				break
case prefix+'naruto': case 'naruto':
  addCountCmd('naruto', sender, _cmd)
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
				reply(mess.wait)
			    var query = ["naruto hd","naruto boruto","naruto sasuke", "naruto aesthetic", "naruto aesthetic"]
                var data = await pinterest(pickRandom(query))
				var but = [{buttonId: `/naruto`, buttonText: { displayText: "Get Again Pict" }, type: 1 }]
				conn.sendMessage(from, { caption: "Random Foto Naruto", image: { url: pickRandom(data.result) }, buttons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
			    limitAdd(sender, limit)
 			    break
case prefix+'yaoi': case 'yaoi':
  addCountCmd('yaoi', sender, _cmd)
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)

				reply(mess.wait)
			    var query = ["yaoi","yaoi aesthetic","yaoi hd","yaoi ganteng"]
                var data = await pinterest(pickRandom(query))
				var but = [{buttonId: `/${command}`, buttonText: { displayText: "Get Again Pict" }, type: 1 }]
				conn.sendMessage(from, { caption: "Random Foto Yaoi", image: { url: pickRandom(data.result) }, buttons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
			    limitAdd(sender, limit)
 			    break
case prefix+'loli': case 'loli':
  addCountCmd('loli', sender, _cmd)
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
				reply(mess.wait)
			    var query = ["loli","loli chan","loli anime","loli hd","loli aesthetic"]
                var data = await pinterest(pickRandom(query))
				var but = [{buttonId: `/loli`, buttonText: { displayText: "Get Again Pict" }, type: 1 }]
				conn.sendMessage(from, { caption: "Random Foto Loli Chan", image: { url: pickRandom(data.result) }, buttons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
			    limitAdd(sender, limit)
 			    break
case prefix+'waifu': case 'waifu':
  addCountCmd('waifu', sender, _cmd)
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
				reply(mess.wait)
			    var query = ["waifu","waifu aesthetic","waifu hd"]
                var data = await pinterest(pickRandom(query))
				var but = [{buttonId: `/waifu`, buttonText: { displayText: "Get Again Pict" }, type: 1 }]
				conn.sendMessage(from, { caption: "Random Waifu", image: { url: pickRandom(data.result) }, buttons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
			    limitAdd(sender, limit)
 			    break
case prefix+'husbu': case 'husbu':
  addCountCmd('husbu', sender, _cmd)
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
				reply(mess.wait)
			    var query = ["husbu anime","husbu hd","husbu aesthetic"]
                var data = await pinterest(pickRandom(query))
				var but = [{buttonId: `/husbu`, buttonText: { displayText: "Get Again Pict" }, type: 1 }]
				conn.sendMessage(from, { caption: "Random Husbu", image: { url: pickRandom(data.result) }, buttons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
			    limitAdd(sender, limit)
 			    break
			// Search Menu
case prefix+'lirik': case 'lirik':
  addCountCmd('lirik', sender, _cmd)
  if (args.length < 2) return reply(`Liriknya mana?Kirim perintah ${command} Nama lagu\nContoh ${command} Indonesia Raya`)
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
reply("Lagu apaan tuh bingung nih bot, bentar bot cariin\n\nKlo bot gak respon berarti liriknya gak ketemu ya:(")
				var data = await fetchJson(`https://hardianto.xyz/api/info/lirik?query=${q}&apikey=${keyanto}`)
			    reply(`*Nama Lagu :* ${q}\n*Lirik Lagu :* ${data.lirik}`)
				limitAdd(sender, limit)
				break
			case prefix+'grupwa': case prefix+'searchgrup': case 'grupwa':
			   addCountCmd('grupwa', sender, _cmd)
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
				if (args.length < 2) return reply(`Kirim perintah ${command} nama grup`)
				reply(mess.wait)
			    hxz.linkwa(q).then(async(data) => {
				  if (data.length == 0) return reply(`Grup ${q} tidak ditemukan`)
				  var teks = `*Hasil Pencarian Dari ${q}*\n\n`
				  for (let x of data) {
					teks += `*Nama :* ${x.nama}\n*Link :* ${x.link}\n\n`
				  }
				  reply(teks)
				  limitAdd(sender, limit)
				}).catch(() => reply(mess.error.api))
			    break
			case prefix+'pinterest':
			case 'pinterest':
			  addCountCmd('pinterest', sender, _cmd)
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
				if (args.length < 2) return reply(`Kirim perintah ${command} query atau ${command} query --jumlah\nContoh :\n${command} cecan atau ${command} cecan --10`)
				reply(mess.wait)
			    var jumlah;
			    if (q.includes('--')) jumlah = q.split('--')[1]
			    pinterest(q.replace('--'+jumlah, '')).then(async(data) => {
				  if (q.includes('--')) {
					if (data.result.length < jumlah) {
					  jumlah = data.result.length
					  reply(`Hanya ditemukan ${data.result.length}, foto segera dikirim`)
					}
					for (let i = 0; i < jumlah; i++) {
					  conn.sendMessage(from, { image: { url: data.result[i] }})
					}
				    limitAdd(sender, limit)
				  } else {
					var but = [{buttonId: `/pinterest ${q}`, buttonText: { displayText: 'Next Photo' }, type: 1 }]
					conn.sendMessage(from, { caption: `Hasil pencarian dari ${q}`, image: { url: pickRandom(data.result) }, buttons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
				    limitAdd(sender, limit)
				  }
				})
			    break
			case prefix+'yts': case prefix+'ytsearch': case 'yts':
			  addCountCmd('ytsearch', sender, _cmd)
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			    if (args.length < 2) return reply(`Kirim perintah ${command} query`)
				reply(mess.wait)
			    yts(q).then( data => {
				  let yt = data.videos
				  var jumlah = 15
				  if (yt.length < jumlah) jumlah = yt.length
				  var no = 0
				  let txt = `*YOUTUBE SEARCH*

 *Data berhasil didapatkan*
 *Hasil pencarian dari ${q}*
 
 *${prefix}getmusic <no urutan>*
 *${prefix}getvideo <no urutan>*
 Untuk mengambil Audio/Video dari hasil pencarian`
                for (let i = 0; i < jumlah; i++) {
				  no += 1
				  txt += `\n─────────────────\n\n*No Urutan : ${no.toString()}*\n*▢ Judul :* ${yt[i].title}\n*▢ ID :* ${yt[i].videoId}\n*▢ Channel :* ${yt[i].author.name}\n*▢ Upload :* ${yt[i].ago}\n*▢ Ditonton :* ${yt[i].views}\n*▢ Duration :* ${yt[i].timestamp}\n*▢ URL :* ${yt[i].url}\n`
				}
				conn.sendMessage(from, { image: { url: yt[0].image }, caption: txt }, { quoted: msg })
				limitAdd(sender, limit)
				}).catch(() => reply(mess.error.api))
			    break
//report
case prefix+'report': case 'report':
  addCountCmd('report', sender, _cmd)
    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
        if (args.length < 2) return reply(`Kirim perintah ${command} laporan`)
        conn.sendMessage(from, { react: {text:`👍`, key: msg.key }})
       conn.sendMessage(from, {caption:`Sukses Kirim Ke Owner, Main² banned!`, templateButton: button3, footer:'Ghos Bid'}, {quoted : msg})
        for (let i of ownerNumber) {
            conn.reply(i, `*[ FEED TO OWNER ]*\nMessage nya : ${q}`, msg)
        }
        limitAdd(sender, limit)
        break
case prefix+'join': case 'join':
  addCountCmd('join', sender, _cmd)
  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
        if (args.length < 2) return reply(`Kirim perintah ${command} Link Grup Kamu`)
        reply(`Sukses Kirim Ke Owner, tunggu Laporan 3/4 menitan untuk masukan bot ke grup`)
        for (let i of ownerNumber) {
            conn.reply(i, `*[ INVITE TO GROUP ]*\nLink nya : ${q}`, msg)
        }
        limitAdd(sender, limit)
        break
//game & fun menu
//suit menu
case prefix+'suit': case 'suit':
  addCountCmd('suit', sender, _cmd)
  var but = [{buttonId: `/sbatu`, buttonText: { displayText: "Batu ✊" }, type: 1 }, {buttonId: `/sgunting`, buttonText: { displayText: "Gunting ✌️" }, type: 1 }, {buttonId: `/skertas`, buttonText: { displayText: "Kertas ✋" }, type: 1 }]
  var sutit = `*[ GAME SUIT ]*\n\nNOTE : *KAMU MEMILIKI 3 BUTTON DAN 3 KESEMPATAN UNTUK MEMILIH ANTARA BATU GUNTING KERTAS\nJIKA KAMU MEMENANGKAN 3 KESEMPATAN PERMAINAN BATU GUNTING KERTAS\n*KAMU MENANG!!*`
conn.sendMessage(from, { text: sutit, buttons: but, footer: "Pilih Button Di Bawah\n\n- _Jika Kamu Pakai WhatsApp Mod Langsung Saja Ketik /sgunting, /sbatu, /skertas_", templateButtons: but }, {quoted: msg})
break
case prefix+'sbatu': case 'sbatu':
  if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
  const batu = [`Aku Memilih *Batu*\nKamu Memilih *Batu*\n\n!! KITA SERI !!`,`Aku Memilih *Gunting*\nKamu Memilih *Batu*\n\n!! KAMU MENANG:( !!`,`Aku Memilih *Kertas*\nKamu Memilih *Batu*\n\n!! AKU MENANG !!`]
					const batuh = batu[Math.floor(Math.random() * batu.length)]
					var batuh2 = `*[ GAME SUIT ]*\n\n${batuh}`
					conn.sendMessage(from, { text: batuh2 }, { quoted: msg })
gameAdd(sender, glimit)
break
case prefix+'sgunting': case 'sgunting':
  if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
  const gunting = [`Aku Memilih *Batu*\nKamu Memilih *Gunting*\n\n!! AKU MENANG !!`,`Aku Memilih *Gunting*\nKamu Memilih *Gunting*\n\n!! KITA SERI !!`,`Aku Memilih *Kertas*\nKamu Memilih *Gunting*\n\n!! KAMU MENANG :( !!`]
					const guntingh = gunting[Math.floor(Math.random() * gunting.length)]
					var guntingh2 = `*[ GAME SUIT ]*\n\n${guntingh}`
					conn.sendMessage(from, { text: guntingh2 }, { quoted: msg })
gameAdd(sender, glimit)
break
case prefix+'skertas': case 'skertas':
  if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
  const kertas = [`Aku Memilih *Batu*\nKamu Memilih *Kertas*\n\n!! KAMU MENANG :( !!`,`Aku Memilih *Gunting*\nKamu Memilih *Kertas*\n\n!! KAMU KALAH !!`,`Aku Memilih *Kertas*\nKamu Memilih *Kertas*\n\n!! KITA SERI !!`]
					const kertash = kertas[Math.floor(Math.random() * kertas.length)]
					var kertash2 = `*[ GAME SUIT ]*\n\n${kertash}`
					conn.sendMessage(from, { text: kertash2 }, { quoted: msg })
gameAdd(sender, glimit)
break
//akher nsfw
case prefix+'slot': case 'slot':
  addCountCmd('slot', sender, _cmd)
  if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
  const pepekk = [
        '🍊 : 🍒 : 🍐',
        '🍒 : 🔔 : 🍊',
        '🍇 : 🍇 : 🍐',
        '🍊 : 🍋 : 🔔', //Arasya
        '🔔 : 🍒 : 🍐',
        '🔔 : 🍒 : 🍊',
        '🍊 : 🍋 : 🔔',        
        '🍐 : 🍒 : 🍋',
        '🍐 : 🍒 : 🍐',
        '🍊 : 🍒 : 🍒',
        '🔔 : 🔔 : 🍇',
        '🍌 : 🍌 : 🔔',
        '🥑 : 🥑 : 🥑 Win👑',
        '🍐 : 🔔 : 🔔',
        '🍊 : 🍋 : 🍒',
        '🌶️ : 🌶️ : 🌶️ Win👑',
        '🍋 : 🍋 : 🍋 Win👑',
        '🔔 : 🔔 : 🍇',
        '🔔 : 🍇 : 🍇', 
        '🔔 : 🍐 : 🔔',
        '🍌 : 🍌 : 🍌 Win👑'
        ]
  const kalah = [
        '🍊 : 🍒 : 🍐',
        '🍒 : 🔔 : 🍊',
        '🍇 : 🍇 : 🍐',
        '🍊 : 🍋 : 🔔', //Arasya
        '🔔 : 🍒 : 🍐',
        '🔔 : 🍒 : 🍊',
        '🍊 : 🍋 : 🔔',        
        '🍐 : 🍒 : 🍋',
        '🍐 : 🍒 : 🍐',
        '🍊 : 🍒 : 🍒',
        '🔔 : 🔔 : 🍇',
        '🍌 : 🍌 : 🔔',
        '🍐 : 🔔 : 🔔',
        '🍊 : 🍋 : 🍒',
        '🔔 : 🔔 : 🍇',
        '🔔 : 🍇 : 🍇', 
        '🔔 : 🍐 : 🔔',
        ]
 const kalah2 = [
        '🍊 : 🍒 : 🍐',
        '🍒 : 🔔 : 🍊',
        '🍇 : 🍇 : 🍐',
        '🍊 : 🍋 : 🔔', //Arasya
        '🔔 : 🍒 : 🍐',
        '🔔 : 🍒 : 🍊',
        '🍊 : 🍋 : 🔔',        
        '🍐 : 🍒 : 🍋',
        '🍐 : 🍒 : 🍐',
        '🍊 : 🍒 : 🍒',
        '🔔 : 🔔 : 🍇',
        '🍌 : 🍌 : 🔔',
        '🍐 : 🔔 : 🔔',
        '🍊 : 🍋 : 🍒',
        '🔔 : 🔔 : 🍇',
        '🔔 : 🍇 : 🍇', 
        '🔔 : 🍐 : 🔔',
        ]
        const selot = pepekk[Math.floor(Math.random() * pepekk.length)]
        const kalahnya = kalah[Math.floor(Math.random() * kalah.length)]
        const kalahnya2 = kalah2[Math.floor(Math.random() * kalah2.length)]
        var slotnya = `*[ 🎰 GAME SLOT 🎰 ]*

${kalahnya}
${selot}
${kalahnya2}

Note : Jika Kamu Mendapatkan Item Yang Sama, Kamu Menang!!!
Contoh : 🔔 : 🔔 : 🔔`
        var but = [{buttonId: `${command}`, buttonText: { displayText: "Kembali Slot" }, type: 1 }]
conn.sendMessage(from, { text: slotnya, buttons: but, footer: "© Slot By Arasya\n@sofunsyabi.id", templateButtons: but }, {quoted: msg})
gameAdd(sender, glimit)
        break
case prefix+'cekme':
  case prefix+'me':
  case 'cekme':
  case 'me':
    addCountCmd('me', sender, _cmd)
  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
  const ganteng = ['Cakep ✔️','Jelek Anjrit ❌']
  const sifat = ['Pembohong','Galak','Suka Bantu Orang','Baik','Jahat:(','Bobrok','Suka BadMood','Setia','Tulus','Beriman','Penyayang Binatang','Baperan']
  const suka = ['Makan','Tidur','Main Game','Sesama Jenis','Binatang',`Seseorang Yang ${pushname} Sukai`,'Belajar','Ibadah','Diri Sendiri']
  const nomernyah = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','31','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59','60','61','62','63','64','65','66','67','68','69','70','71','72','73','74','75','76','77','78','79','80','81','82','82','84','84','86','87','88','89','90','91','92','93','94','95','96','97','98','99','100']
  const keberanian = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','31','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59','60','61','62','63','64','65','66','67','68','69','70','71','72','73','74','75','76','77','78','79','80','81','82','82','84','84','86','87','88','89','90','91','92','93','94','95','96','97','98','99','100']
  const kepinteran = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','31','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59','60','61','62','63','64','65','66','67','68','69','70','71','72','73','74','75','76','77','78','79','80','81','82','82','84','84','86','87','88','89','90','91','92','93','94','95','96','97','98','99','100']
					const ganz = ganteng[Math.floor(Math.random() * ganteng.length)]
					const sipat = sifat[Math.floor(Math.random() * sifat.length)]
					const numb = nomernyah[Math.floor(Math.random() * nomernyah.length)]
					const gai = suka[Math.floor(Math.random() * suka.length)]
					const berani = keberanian[Math.floor(Math.random() * keberanian.length)]
					const pinter = kepinteran[Math.floor(Math.random() * kepinteran.length)]
  var cek = `*[ PRIBADI KAMU ]*
 
Nama : ${pushname}
Sifat : ${sipat}
Keberanian : ${berani}%
Ketakutan : ${numb}%
Cakep : ${ganz}
Cek Pintar : ${pinter}%
Menyukai : ${gai}
  `
var but = [{buttonId: '/y', buttonText: { displayText: 'Cocok' }, type: 1 }, {buttonId: '/n', buttonText: { displayText: 'Gak Cocok' }, type: 1 }]
					conn.sendMessage(from, { caption: cek, image: { url: `https://telegra.ph/file/a48660964fc598016dc71.png` }, buttons: but, footer: 'Ghos - Bid' }, { quoted: msg })
				    limitAdd(sender, limit)
				    break
case prefix+'y': 
conn.sendMessage(from, { react: { text: `👍`, key: msg.key}})
  reply("Yey Prediksi Bot Benar")
  break
case prefix+'n':
conn.sendMessage(from, { react: { text: `👎`, key: msg.key}})
  reply("Yah Maaf Ya kak:(")
  break
case prefix+'apakah': case 'apakah':
  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
				if (!q) return reply(`Penggunaan ${command} text\n\nContoh : ${command} saya wibu`)
					const apa = ['Iya', 'Tidak', 'Bisa Jadi', 'Betul']
					const kah = apa[Math.floor(Math.random() * apa.length)]
conn.sendMessage(from, { text: `Pertanyaan : Apakah ${q}\nJawaban : ${kah}` }, { quoted: msg })
limitAdd(sender, limit)
					break
case prefix+'bisakah':
  case prefix+'bisa':
    case prefix+'bisagak':
    case 'bisakah':
  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
				if (!q) return reply(`Penggunaan ${command} text\n\nContoh : ${command} saya wibu`)
					const bisa = ['Bisa','Gak Bisa','Gak Bisa Ajg Aaokawpk','TENTU PASTI KAMU BISA!!!!']
					const ga = bisa[Math.floor(Math.random() * bisa.length)]
conn.sendMessage(from, { text: `Pertanyaan : ${q}\nJawaban : ${ga}` }, { quoted: msg })
limitAdd(sender, limit)
					break
case prefix+'bagaimanakah':
  case prefix+'gimanakah':
    case prefix+'gimana':
    case 'bagaimana':
      if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
				if (!q) return reply(`Penggunaan ${command} text\n\nContoh : ${command} saya wibu`)
					const gimana = ['Gak Gimana2', 'Sulit Itu Bro', 'Maaf Bot Tidak Bisa Menjawab', 'Coba Deh Cari Di Gugel','astaghfirallah Beneran???','Pusing ah','Owhh Begitu:(','Yang Sabar Ya Bos:(','Gimana yeee']
					const ya = gimana[Math.floor(Math.random() * gimana.length)]
conn.sendMessage(from, { text: `Pertanyaan : ${q}\nJawaban : ${ya}` }, { quoted: msg })
limitAdd(sender, limit)
					break
case prefix+'rate':
case 'rate':
  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
				if (!q) return reply(`Penggunaan ${command} text\n\nContoh : ${command} Gambar aku`)
					const ra = ['5', '10', '15' ,'20', '25','30','35','40','45','50','55','60','65','70','75','80','85','90','100']
					const te = ra[Math.floor(Math.random() * ra.length)]
conn.sendMessage(from, { text: `Rate : ${q}\nJawaban : *${te}%*` }, { quoted: msg })
limitAdd(sender, limit)
					break
case prefix+'gantengcek':
  case prefix+'cekganteng':
  case 'gantengcek':
    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
				if (!q) return reply(`Penggunaan ${command} Nama\n\nContoh : ${command} Arasya`)
					const gan = ['5', '10', '15' ,'20', '25','30','35','40','45','50','55','60','65','70','75','80','85','90','100']
					const teng = gan[Math.floor(Math.random() * gan.length)]
conn.sendMessage(from, { text: `Nama : ${q}\nJawaban : *${teng}%*` }, { quoted: msg })
limitAdd(sender, limit)
					break
case prefix+'cantikcek':
  case prefix+'cekcantik':
  case 'cantikcek':
    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
				if (!q) return reply(`Penggunaan ${command} Nama\n\nContoh : ${command} Arasya`)
					const can = ['5', '10', '15' ,'20', '25','30','35','40','45','50','55','60','65','70','75','80','85','90','100']
					const tik = can[Math.floor(Math.random() * can.length)]
conn.sendMessage(from, { text: `Nama : ${q}\nJawaban : *${tik}%*` }, { quoted: msg })
limitAdd(sender, limit)
					break
case prefix+'sangecek':
  case prefix+'ceksange':
    case prefix+'gaycek':
      case prefix+'cekgay':
        case prefix+'lesbicek':
          case prefix+'ceklesbi':
          case 'cekgay': case 'sangecek': case 'lesbicek': case 'gaycek': case 'ceklesbi': case 'ceksange':
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
				if (!q) return reply(`Penggunaan ${command} Nama\n\nContoh : ${command} ${pushname}`)
					const sangeh = ['5', '10', '15','20', '25','30','35','40','45','50','55','60','65','70','75','80','85','90','100']
					const sange = sangeh[Math.floor(Math.random() * sangeh.length)]
conn.sendMessage(from, { text: `Nama : ${q}\nJawaban : *${sange}%*` }, { quoted: msg })
limitAdd(sender, limit)
					break
case prefix+'kapankah':
case 'kapankah':
  case prefix+'kapan':
    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
				if (!q) return reply(`Penggunaan ${command} Pertanyaan\n\nContoh : ${command} Saya Mati`)
					const kapan = ['5 Hari Lagi', '10 Hari Lagi', '15 Hari Lagi','20 Hari Lagi', '25 Hari Lagi','30 Hari Lagi','35 Hari Lagi','40 Hari Lagi','45 Hari Lagi','50 Hari Lagi','55 Hari Lagi','60 Hari Lagi','65 Hari Lagi','70 Hari Lagi','75 Hari Lagi','80 Hari Lagi','85 Hari Lagi','90 Hari Lagi','100 Hari Lagi','5 Bulan Lagi', '10 Bulan Lagi', '15 Bulan Lagi','20 Bulan Lagi', '25 Bulan Lagi','30 Bulan Lagi','35 Bulan Lagi','40 Bulan Lagi','45 Bulan Lagi','50 Bulan Lagi','55 Bulan Lagi','60 Bulan Lagi','65 Bulan Lagi','70 Bulan Lagi','75 Bulan Lagi','80 Bulan Lagi','85 Bulan Lagi','90 Bulan Lagi','100 Bulan Lagi','1 Tahun Lagi','2 Tahun Lagi','3 Tahun Lagi','4 Tahun Lagi','5 Tahun Lagi','Besok','Lusa',`Abis Command Ini Juga Lu ${q}`]
					const kapankah = kapan[Math.floor(Math.random() * kapan.length)]
conn.sendMessage(from, { text: `Pertanyaan : ${q}\nJawaban : *${kapankah}*` }, { quoted: msg })
limitAdd(sender, limit)
					break
		case 'ttt': case 'ttc': case 'tictactoe': case prefix+'tictactoe': case prefix+'ttt': case prefix+'ttc':
		  addCountCmd('tictactoe', sender, _cmd)
                if (!isGroup)return reply(mess.OnlyGrup)
			    if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
                if (isTicTacToe(from, tictactoe)) return reply(`Masih ada game yg blum selesai`)
                if (args.length < 2) return reply(`Kirim perintah *${prefix}tictactoe* @tag`)
                if (mentionByTag.length !== 1) {
				if (mentionByTag[0] === botNumber) return reply(`Tidak bisa bermain dengan bot!`)
                if (mentionByTag[0] === sender) return reply(`Sad amat main ama diri sendiri`)
                     var hadiah = randomNomor(100, 150)
				     mentions(monospace(`@${sender.split('@')[0]} menantang @${mentionByTag[0].split('@')[0]} untuk bermain TicTacToe\n\nKirim (Y/N) untuk bermain\n\nHadiah : ${hadiah} balance`), [sender, mentionByTag[0]], false)
                     tictactoe.push({
                        id: from,
                        status: null,
						hadiah: hadiah,
                        penantang: sender,
                        ditantang: mentionByTag[0],
                        TicTacToe: ['1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣']
                     })
					 gameAdd(sender, glimit)
                } else {
                    reply(`Kirim perintah *${prefix}tictactoe* @tag`)
                }
                break
			case prefix+'delttt':
            case prefix+'delttc':
            case 'delttc': case 'delttt':
                if (!isGroup)return reply(mess.OnlyGrup)
				if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
                if (!isTicTacToe(from, tictactoe)) return reply(`Tidak ada sesi game tictactoe di grup ini`)
                var posi = getPosTic(from, tictactoe)
                if (tictactoe[posi].penantang.includes(sender)) {
                    tictactoe.splice(posi, 1)
                    reply(`Berhasil menghapus sesi tictactoe di grup ini`)
                 } else if (tictactoe[posi].ditantang.includes(sender)) {
                     tictactoe.splice(posi, 1)
                     reply(`Berhasil menghapus sesi tictactoe di grup ini`)
                 } else if (isGroupAdmins) {
                     tictactoe.splice(posi, 1)
                     reply(`Berhasil menghapus sesi tictactoe di grup ini`)
                 } else if (isOwner) {
                     tictactoe.splice(posi, 1)
                     reply(`Berhasil menghapus sesi tictactoe di grup ini`)
                 } else {
                   reply(`Anda tidak bisa menghapus sesi tictactoe, karena bukan pemain!`)
                }
                break
			case prefix+'tebakgambar':
			case 'tebakgambar':
			  addCountCmd('tebakgambar', sender, _cmd)
		        if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
			    if (isPlayGame(from, tebakgambar)) return conn.reply(from, `Masih ada game yang belum diselesaikan`, tebakgambar[getGamePosi(from, tebakgambar)].msg)
				kotz.tebakgambar().then( data => {
				  data = data[0]
				  data.jawaban = data.jawaban.split('Jawaban ').join('')
				  var teks = `*TEBAK GAMBAR*\n\n`+monospace(`Petunjuk : ${data.jawaban.replace(/[b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z]/gi, '_')}\nWaktu : ${gamewaktu}s`)
				  conn.sendMessage(from, { image: { url: data.image }, caption: teks }, { quoted: msg })
				  .then( res => {
					var jawab = data.jawaban.toLowerCase()
					addPlayGame(from, 'Tebak Gambar', jawab, gamewaktu, res, tebakgambar)
					gameAdd(sender, glimit)
				  })
				})
			    break
			// Group Menu
			case prefix+'linkgrup': case prefix+'link': case prefix+'linkgc': case 'linkgrup': case 'linkgc': case 'link':
			  addCountCmd('linkgrup', sender, _cmd)
			    if (!isGroup) return reply(mess.OnlyGrup)
				if (!isBotGroupAdmins) return reply(mess.BotAdmin)
				var url = await conn.groupInviteCode(from).catch(() => reply(mess.error.api))
			    url = 'https://chat.whatsapp.com/'+url
				reply(url)
				break
			case prefix+'setppgrup': case prefix+'setppgc':
			case 'setppgrup':
			    if (!isGroup) return reply(mess.OnlyGrup)
				if (!isGroupAdmins) return reply(mess.GrupAdmin)
				if (!isBotGroupAdmins) return reply(mess.BotAdmin)
				if (isImage || isQuotedImage) {
				  var media = await downloadAndSaveMediaMessage('image', `ppgc${from}.jpeg`)
			      await conn.updateProfilePicture(from, { url: media })
				  .then( res => {
					reply(`Sukses`)
					fs.unlinkSync(media)
				  }).catch(() => reply(mess.error.api))
				} else {
			      reply(`Kirim/balas gambar dengan caption ${command}`)
				}
				break
case 'setppgrup':
  case prefix+'setppgrup':
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isGroup) return reply(mess.OnlyGrup)
                   if (isImage || isQuotedImage) {
                     var media = await conn.downloadAndSaveMediaMessage(quoted)
                     if (args[0] == '\'panjang\'') {
                       var { img } = await generateProfilePicture(media)
                       await conn.query({
                         tag: 'iq',
                         attrs: {
                           to: botNumber,
                           type:'set',
                           xmlns: 'w:profile:picture'
                         },
                         content: [
                           {
                             tag: 'picture',
                             attrs: { type: 'image' },
                             content: img
                           }
                         ]
                       })
                       fs.unlinkSync(media)
                       reply (`Sukses`)
                     } else if (args[0] == '\'samping\'') {
                       var { img } = await generateProfilePicture(media)
                       await conn.query({
                         tag: 'iq',
                         attrs: {
                           to: botNumber,
                           type:'set',
                           xmlns: 'w:profile:picture'
                         },
                         content: [
                           {
                             tag: 'picture',
                             attrs: { type: 'image' },
                             content: img
                           }
                         ]
                       })
                       fs.unlinkSync(media)
                       reply(`Sukses`)
                     }  else {
                       var data = await conn.updateProfilePicture(botNumber, { url: media })
                      fs.unlinkSync(media)
                       reply (`nice`)
                     }
                   } else {
                     reply (`Kirim/balas gambar dengan caption ${command} untuk mengubah foto profil bot`)
                   }
                   break
			case 'setnamegrup': case 'setnamegc': case prefix+'setnamegrup': case prefix+'setnamegc':
			    if (!isGroup) return reply(mess.OnlyGrup)
				if (!isGroupAdmins) return reply(mess.GrupAdmin)
				if (!isBotGroupAdmins) return reply(mess.BotAdmin)
				if (args.length < 2) return reply(`Kirim perintah ${command} teks`)
				await conn.groupUpdateSubject(from, q)
			    .then( res => {
				  reply(`Sukses`)
				}).catch(() => reply(mess.error.api))
			    break
			case 'setdesk': case 'setdesc': case prefix+'setdesc': case prefix+'setdescription':
			    if (!isGroup) return reply(mess.OnlyGrup)
				if (!isGroupAdmins) return reply(mess.GrupAdmin)
				if (!isBotGroupAdmins) return reply(mess.BotAdmin)
				if (args.length < 2) return reply(`Kirim perintah ${command} teks`)
				await conn.groupUpdateDescription(from, q)
			    .then( res => {
			      reply(`Sukses`)
				}).catch(() => reply(mess.error.api))
				break
			case prefix+'group': case prefix+'grup': case 'grup': case 'group':
		        if (!isGroup) return reply(mess.OnlyGrup)
				if (!isGroupAdmins) return reply(mess.GrupAdmin)
				if (!isBotGroupAdmins) return reply(mess.BotAdmin)
				if (args.length < 2) return reply(`Kirim perintah ${command} _options_\nOptions : close & open\nContoh : ${command} close`)
				if (args[1] == "close") {
				  conn.groupSettingUpdate(from, 'announcement')
				  reply(`Sukses mengizinkan hanya admin yang dapat mengirim pesan ke grup ini`)
				} else if (args[1] == "open") {
				  conn.groupSettingUpdate(from, 'not_announcement')
				  reply(`Sukses mengizinkan semua peserta dapat mengirim pesan ke grup ini`)
				} else {
				  reply(`Kirim perintah ${command} _options_\nOptions : close & open\nContoh : ${command} close`)
				}
			    break
			case prefix+'revoke':
			case 'revoke':
			    if (!isGroup) return reply(mess.OnlyGrup)
				if (!isGroupAdmins) return reply(mess.GrupAdmin)
				if (!isBotGroupAdmins) return reply(mess.BotAdmin)
				await conn.groupRevokeInvite(from)
			    .then( res => {
				  reply(`Sukses menyetel tautan undangan grup ini`)
				}).catch(() => reply(mess.error.api))
				break
			case prefix+'hidetag':
			case 'hidetag':
		        if (!isGroup) return reply(mess.OnlyGrup)
				if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
			    let mem = [];
		        groupMembers.map( i => mem.push(i.id) )
				conn.sendMessage(from, { text: q ? q : '', mentions: mem })
			    break
case prefix+'kick':
case 'kick':
    if (!isGroup) return reply(mess.OnlyGrup)
    if (!isGroupAdmins) return reply(mess.GrupAdmin)
    if (!isBotGroupAdmins) return reply(mess.BotAdmin)
    var number;
    if (mentioned.length !== 0) {
      number = mentioned[0]
      conn.groupParticipantsUpdate(from, [number], "remove")
      .then( res => reply(jsonformat(res)))
      .catch( err => reply(jsonformat(err)))
    } else if (isQuotedMsg) {
      number = quotedMsg.sender
      conn.groupParticipantsUpdate(from, [number], "remove")
      .then( res => reply(jsonformat(res)))
      .catch( err => reply(jsonformat(err)))
    } else {
      reply(`Tag atau balas pesan member yang ingin dikeluarkan dari grup`)
    }
    break

case prefix+'add':
case 'add':
  if (!isOwner)return reply("_Maaf Fitur Ini Di Nonaktifkan Oleh Owner, Karena menyebabkan nomer bot 3 kali ke banned_")
    if (!isGroup) return reply(mess.OnlyGrup)
    if (!isGroupAdmins) return reply(mess.GrupAdmin)
    if (!isBotGroupAdmins) return reply(mess.BotAdmin)
    var number;
    if (args[1]) {
      number = mentioned[0]
      var cek = await conn.onWhatsApp(number)
      if (cek.length == 0) return reply(`Masukkan nomer yang valid dan terdaftar di WhatsApp`)
      conn.groupParticipantsUpdate(from, [number], "add")
      .then( res => reply(jsonformat(res)))
      .catch( err => reply(jsonformat(err)))
    } else if (isQuotedMsg) {
      number = quotedMsg.sender
      var cek = await conn.onWhatsApp(number)
      if (cek.length == 0) return reply(`Member yang kamu balas pesannya sudah tidak terdaftar di WhatsApp`)
      conn.groupParticipantsUpdate(from, [number], "add")
      .then( res => reply(jsonformat(res)))
      .catch( err => reply(jsonformat(err)))
    } else {
      reply(`Kirim perintah ${command} nomer atau balas pesan orang yang ingin dimasukkan kedalam grup`)
    }
    break
    //banned
    case prefix+'ban':
      case 'ban':
                if (!isOwner) return reply('only owner')
                if (!isModerator) return reply(mess.OnlyMode)
                addCountCmd('ban', sender, _cmd)
                if (mentioned.length !== 0){
                    addBanned(mentioned[0], args[2], ban)
                    reply('Sukses')
                } else if (isQuotedMsg) {
                    if (quotedMsg.sender === ownerNumber) return reply(`Tidak bisa ban Owner`)
                    addBanned(quotedMsg.sender, args[1], ban)
                    reply(`Sukses ban target`)
                } else if (!isNaN(args[1])) {
                    var cekab = await conn.isOnWhatsApp(args[1]+"@s.whatsapp.net")
                 if (cekab === undefined) return reply(`Masukkan nomer yang valid/terdaftar di WhatsApp`)
                    addBanned(args[1] + '@s.whatsapp.net', args[2], ban)
                    reply('Sukses')
                } else {
                    reply(`Kirim perintah ${prefix}ban @tag atau nomor atau reply pesan orang yang ingin di ban`)
                }
                break
    case prefix+'unban':
      case 'unban':
                if (!isOwner) return reply('only owner')
                if(!isModerator) return reply(mess.OnlyMode)
                addCountCmd('unban', sender, _cmd)
                if (mentioned.length !== 0) {
                    unBanned(mentioned[0], ban)
                    reply('Sukses')
                } else if (isQuotedMsg) {
                    unBanned(quotedMsg.sender, ban)
                    reply(`Sukses unban target`) 
                } else if (!isNaN(args[1])) {
                    var cekb = await conn.isOnWhatsApp(args[1]+"@s.whatsapp.net")
                 if (cekb === undefined) return reply(`Masukkan nomer yang valid/terdaftar di WhatsApp`)
                    unBanned(args[1] + '@s.whatsapp.net', ban)
                    reply('Sukses')
                } else {
                    reply(`Kirim perintah ${prefix}unban @tag atau nomor atau reply pesan orang yang ingin di unban`)
                }
                break
    case prefix+'listban':
      case 'listban':
                addCountCmd('listban', sender, _cmd)
                let txtx = `List Banned\nJumlah : ${ban.length}\n\n`
                let menx = [];
                for (let i of ban){
                    menx.push(i.id)
                    txtx += `*ID :* @${i.id.split("@")[0]}\n`
                    if (i.expired === 'PERMANENT'){
                        let cekvip = 'PERMANENT'
                        txtx += `*Expire :* PERMANENT\n\n`
                    } else {
                        let cekvip = ms(i.expired - Date.now())
                        txtx += `*Expire :* ${cekvip.days} day(s) ${cekvip.hours} hour(s) ${cekvip.minutes} minute(s) ${cekvip.seconds} second(s)\n\n`
                    }
                }
                mentions(txtx, menx, true)
                break
			// Bank & Payment Menu
			case 'topbalance': case prefix+'topbalance':{
			  addCountCmd('Topbalance', sender, _cmd)
                balance.sort((a, b) => (a.balance < b.balance) ? 1 : -1)
                let top = '*── 「 TOP BALANCE 」 ──*\n\n'
                let arrTop = []
				var total = 20
				if (balance.length < 20) total = balance.length
                for (let i = 0; i < total; i ++){
                    top += `${i + 1}. @${balance[i].id.split("@")[0]}\n=> Balance : $${balance[i].balance}\n\n`
                    arrTop.push(balance[i].id)
                }
                mentions(top, arrTop, true)
            }
                break
            case 'buylimit': case prefix+'buylimit':{
                if (args.length < 2) return reply(`Kirim perintah *${prefix}buylimit* jumlah limit yang ingin dibeli\n\nHarga 1 limit = $150 balance`)
                if (args[1].includes('-')) return reply(`Jangan menggunakan -`)
                if (isNaN(args[1])) return reply(`Harus berupa angka`)
                if (args[1].toLowerCase() === 'infinity') return reply(`Yahaha saya ndak bisa di tipu`)
                let ane = Number(parseInt(args[1]) * 150)
                if (getBalance(sender, balance) < ane) return reply(`Balance kamu tidak mencukupi untuk pembelian ini`)
                kurangBalance(sender, ane, balance)
                giveLimit(sender, parseInt(args[1]), limit)
                reply(monospace(`Pembeliaan limit sebanyak ${args[1]} berhasil\n\nSisa Balance : $${getBalance(sender, balance)}\nSisa Limit : ${getLimit(sender, limitCount, limit)}/${limitCount}`))
            }
                break
			case prefix+'transfer':
			case 'tf':
            case prefix+'tf':{
                 if (args.length < 2) return reply(`Kirim perintah *${command}* @tag nominal\nContoh : ${command} @6288213292687 2000`)
                 if (mentioned.length == 0) return reply(`Tag orang yang ingin di transfer balance`)
                 if (!args[2]) return reply(`Masukkan nominal nya!`)
                 if (isNaN(args[2])) return reply(`Nominal harus berupa angka!`)
                 if (args[2].toLowerCase() === 'infinity') return reply(`Yahaha saya ndak bisa di tipu`)
                 if (args[2].includes("-")) return reply(`Jangan menggunakan -`)
                 var anu = getBalance(sender, balance)
                 if (anu < args[2] || anu == 'undefined') return reply(`Balance Kamu Tidak Mencukupi Untuk Transfer Sebesar $${args[2]}, Kumpulkan Terlebih Dahulu\nKetik ${prefix}balance, untuk mengecek Balance mu!`)
                 kurangBalance(sender, parseInt(args[2]), balance)
                 addBalance(mentioned[0], parseInt(args[2]), balance)
                 reply(`Sukses transfer balance sebesar $${args[2]} kepada @${mentioned[0].split("@")[0]}`)
            }
                 break
            case prefix+'buygamelimit':
            case 'buygamelimit':
            case 'buyglimit':
            case prefix+'buyglimit':{
                if (args.length < 2) return reply(`Kirim perintah *${prefix}buyglimit* jumlah game limit yang ingin dibeli\n\nHarga 1 game limit = $150 balance\nPajak $1 / $10`)
                if (args[1].includes('-')) return reply(`Jangan menggunakan -`)
                if (isNaN(args[1])) return reply(`Harus berupa angka`)
                if (args[1].toLowerCase() === 'infinity') return reply(`Yahaha saya ndak bisa di tipu`)
                let ane = Number(parseInt(args[1]) * 150)
                if (getBalance(sender, balance) < ane) return reply(`Balance kamu tidak mencukupi untuk pembelian ini`)
                kurangBalance(sender, ane, balance)
                givegame(sender, parseInt(args[1]), glimit)
                reply(monospace(`Pembeliaan game limit sebanyak ${args[1]} berhasil\n\nSisa Balance : $${getBalance(sender, balance)}\nSisa Game Limit : ${cekGLimit(sender, gcount, glimit)}/${gcount}`))
            }
                break
			case prefix+'limit': case prefix+'balance':
			case 'limit': case 'balance':
			case prefix+'ceklimit': case prefix+'cekbalance':
			    if (mentioned.length !== 0){
					var Ystatus = ownerNumber.includes(mentioned[0])
					var isPrim = Ystatus ? true : _prem.checkPremiumUser(mentioned[0], premium)
				    var ggcount = isPrim ? gcounti.prem : gcounti.user
                    var limitMen = `${getLimit(mentioned[0], limitCount, limit)}`
                    textImg(`Limit : ${_prem.checkPremiumUser(mentioned[0], premium) ? 'Unlimited' : limitMen}/${limitCount}\nLimit Game : ${cekGLimit(mentioned[0], ggcount, glimit)}/${ggcount}\nBalance : $${getBalance(mentioned[0], balance)}\n\nKamu dapat membeli limit dengan ${prefix}buylimit dan ${prefix}buyglimit untuk membeli game limit`)
                } else {
                    var limitPrib = `${getLimit(sender, limitCount, limit)}/${limitCount}`
                    textImg(`Limit : ${isPremium ? 'Unlimited' : limitPrib}\nLimit Game : ${cekGLimit(sender, gcount, glimit)}/${gcount}\nBalance : $${getBalance(sender, balance)}\n\nKamu dapat membeli limit dengan ${prefix}buylimit dan ${prefix}buyglimit untuk membeli game limit`)
                }
				break
//Api Anto
case prefix+'ssweb':
case 'ssweb':
  if (!isUrl(args[1])) return reply(mess.error.Iv)
  var seweb = chats.slice(7)
  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
  if (args.length < 2) return reply(`Kirim Perintah ${command} link Mu\nContoh ${command} https://github.com/GetSya`)
  reply(mess.wait)
  conn.sendMessage(from, { image: { url: `https://hardianto.xyz/api/tools/ssweb?url=${seweb}&apikey=${keyanto}`}})
  limitAdd(sender, limit)
  break
  case prefix+'sshpfull':
  case 'sshpfull':
  if (!isUrl(args[1])) return reply(mess.error.Iv)
  var seweb = chats.slice(7)
  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
  if (args.length < 2) return reply(`Kirim Perintah ${command} link Mu\nContoh ${command} https://github.com/GetSya`)
  reply(mess.wait)
  conn.sendMessage(from, { image: { url: `https://hadi-api.herokuapp.com/api/ssweb?url=${q}&device=phone&full=on`}})
  limitAdd(sender, limit)
  break
case prefix+'ssdesktop':
case 'ssdekstop':
  if (!isUrl(args[1])) return reply(mess.error.Iv)
  var seweb = chats.slice(7)
  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
  if (args.length < 2) return reply(`Kirim Perintah ${command} link Mu\nContoh ${command} https://github.com/GetSya`)
  reply(mess.wait)
  conn.sendMessage(from, { image: { url: `https://hadi-api.herokuapp.com/api/ssweb?url=${q}&device=desktop&full=on`}})
  limitAdd(sender, limit)
  break
case prefix+'nuliskanan':
case 'nuliskanan':
  var kanan = chats.slice(11)
  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
  if (args.length < 2) return reply(`Kirim Perintah ${command} Tulisan Mu\nContoh ${command} Jojo Ganteng\n\n⚠️ *NOTE : GAK BOLEH DI TAMBAHIN EMOJI/TEXT TEXT GAK JELAS*`)
  reply(mess.wait)
  conn.sendMessage(from, { image: { url: `https://hardianto.xyz/api/nuliskanan?text=${kanan}&apikey=${keyanto}`}})
  limitAdd(sender, limit)
  break
case prefix+'nuliskiri':
case 'nuliskiri':
  var kiri = chats.slice(10)
  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
  if (args.length < 2) return reply(`Kirim Perintah ${command} Tulisan Mu\nContoh ${command} Jojo Ganteng\n\n⚠️ *NOTE : GAK BOLEH DI TAMBAHIN EMOJI/TEXT TEXT GAK JELAS*`)
  reply(mess.wait)
  conn.sendMessage(from, { image: { url: `https://hardianto.xyz/api/nuliskanan?text=${kiri}&apikey=${keyanto}`}})
  limitAdd(sender, limit)
  break
case prefix+'foliokiri':
case 'foliokiri':
  var fkiri = chats.slice(10)
  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
  if (args.length < 2) return reply(`Kirim Perintah ${command} Tulisan Mu\nContoh ${command} Jojo Ganteng\n\n⚠️ *NOTE : GAK BOLEH DI TAMBAHIN EMOJI/TEXT TEXT GAK JELAS*`)
  reply(mess.wait)
  conn.sendMessage(from, { image: { url: `https://hardianto.xyz/api/foliokiri?text=${fkanan}&apikey=${keyanto}`}})
  limitAdd(sender, limit)
  break
case prefix+'foliokanan':
case 'foliokanan':
  var fkiri = chats.slice(11)
  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
  if (args.length < 2) return reply(`Kirim Perintah ${command} Tulisan Mu\nContoh ${command} Jojo Ganteng\n\n⚠️ *NOTE : GAK BOLEH DI TAMBAHIN EMOJI/TEXT TEXT GAK JELAS*`)
  reply(mess.wait)
  conn.sendMessage(from, { image: { url: `https://hardianto.xyz/api/foliokanan?text=${fkiri}&apikey=${keyanto}`}})
  limitAdd(sender, limit)
  break
case prefix+'nulis':
  case prefix+'tulis':
  case 'nulis': case 'tulis':
    case prefix+'menulis':
reply(`*[ COMMAND NOT FOUND ]*
Command Salah ❌
Silahkan Pilih Type Buku/Folio Berikut

- ${prefix}foliokanan <Text>
- ${prefix}foliokiri <Text>
- ${prefix}nuliskanan <Text>
- ${prefix}nuliskiri <Text>

Note : Anggap "<" dan ">" Tidak Ada
 `)
 break
//nsfw
case prefix+'ass':
case 'ass':
  if (!isOwner)return reply(`Fitur ${command} Di Non-aktif kan Oleh Owner\nKarena sudah menjelang bulan Ramadhan:)))`)
 /*if (!isPremium)return reply("Perintah Ini Khusus Pengguna Premium, Upgrade Fitur Premium Ke Owner, Ketik !owner")*/
  var data = await fetchJson(`https://docs-jojoapi.herokuapp.com/api/nsfw/ass?apikey=${jojoapi}`)
var but = [{buttonId: `${command}`, buttonText: { displayText: 'Next Photo' }, type: 1 }]
					conn.sendMessage(from, { caption: `Sangenya prem ini`, image: { url: data.result }, buttons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
					break
case prefix+'walpaper':
case 'walpaper':
var data = await fetchJson(`https://docs-jojoapi.herokuapp.com/api/random/walpaper?apikey=${jojoapi}`)
var but = [{ urlButton: { displayText: 'source code', url: data.result }}, { quickReplyButton: { displayText: 'Next' , id: `${command}` }},]
conn.sendMessage(from, {caption: 'nih kak', image: { url: data.result }, templateButtons: but, footer:'pencet tombol di bawah untuk foto selanjutnya'}, { quoted: msg })
break
case prefix+'bdsm':
case 'bdsm':
  addCountCmd('bdsm', sender, _cmd)
  if (!isOwner)return reply(`Fitur ${command} Di Non-aktif kan Oleh Owner\nKarena sudah menjelang bulan Ramadhan:)))`)
  /*if (!isPremium)return reply("Perintah Ini Khusus Pengguna Premium, Upgrade Fitur Premium Ke Owner, Ketik !owner")*/
  var data = await fetchJson(`https://docs-jojoapi.herokuapp.com/api/nsfw/bdsm?apikey=${jojoapi}`)
var but = [{buttonId: `${command}`, buttonText: { displayText: 'Next Photo' }, type: 1 }]
					conn.sendMessage(from, { caption: `Sangenya prem ini`, image: { url: data.result }, buttons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
					break
case prefix+'ahegao':
case 'ahegao':
  addCountCmd('ahegao', sender, _cmd)
  if (!isOwner)return reply(`Fitur ${command} Di Non-aktif kan Oleh Owner\nKarena sudah menjelang bulan Ramadhan:)))`)
  /*if (!isPremium)return reply("Perintah Ini Khusus Pengguna Premium, Upgrade Fitur Premium Ke Owner, Ketik !owner")*/
  var data = await fetchJson(`https://docs-jojoapi.herokuapp.com/api/nsfw/ahegao?apikey=${jojoapi}`)
var but = [{buttonId: `${command}`, buttonText: { displayText: 'Next Photo' }, type: 1 }]
					conn.sendMessage(from, { caption: `Sangenya prem ini`, image: { url: data.result }, buttons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
					break
case prefix+'blowjob':
case 'blowjob':
  addCountCmd('blowjob', sender, _cmd)
  if (!isOwner)return reply(`Fitur ${command} Di Non-aktif kan Oleh Owner\nKarena sudah menjelang bulan Ramadhan:)))`)
  /*if (!isPremium)return reply("Perintah Ini Khusus Pengguna Premium, Upgrade Fitur Premium Ke Owner, Ketik !owner")*/
  var data = await fetchJson(`https://docs-jojoapi.herokuapp.com/api/nsfw/blowjob?apikey=${jojoapi}`)
var but = [{buttonId: `${command}`, buttonText: { displayText: 'Next Photo' }, type: 1 }]
					conn.sendMessage(from, { caption: `Sangenya prem ini`, image: { url: data.result }, buttons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
					break
case prefix+'cuckold':
case 'cuckold':
  addCountCmd('cuckold', sender, _cmd)
  if (!isOwner)return reply(`Fitur ${command} Di Non-aktif kan Oleh Owner\nKarena sudah menjelang bulan Ramadhan:)))`)
  /*if (!isPremium)return reply("Perintah Ini Khusus Pengguna Premium, Upgrade Fitur Premium Ke Owner, Ketik !owner")*/
  var data = await fetchJson(`https://docs-jojoapi.herokuapp.com/api/nsfw/cuckold?apikey=${jojoapi}`)
var but = [{buttonId: `${command}`, buttonText: { displayText: 'Next Photo' }, type: 1 }]
					conn.sendMessage(from, { caption: `Sangenya prem ini`, image: { url: data.result }, buttons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
					break
case prefix+'cum':
case 'cum':
  addCountCmd('cum', sender, _cmd)
  if (!isOwner)return reply(`Fitur ${command} Di Non-aktif kan Oleh Owner\nKarena sudah menjelang bulan Ramadhan:)))`)
  /*if (!isPremium)return reply("Perintah Ini Khusus Pengguna Premium, Upgrade Fitur Premium Ke Owner, Ketik !owner")*/
  var data = await fetchJson(`https://docs-jojoapi.herokuapp.com/api/nsfw/cum?apikey=${jojoapi}`)
var but = [{buttonId: `${command}`, buttonText: { displayText: 'Next Photo' }, type: 1 }]
					conn.sendMessage(from, { caption: `Sangenya prem ini`, image: { url: data.result }, buttons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
					break
case prefix+'ero':
case 'ero':
  addCountCmd('ero', sender, _cmd)
  if (!isOwner)return reply(`Fitur ${command} Di Non-aktif kan Oleh Owner\nKarena sudah menjelang bulan Ramadhan:)))`)
  /*if (!isPremium)return reply("Perintah Ini Khusus Pengguna Premium, Upgrade Fitur Premium Ke Owner, Ketik !owner")*/
  var data = await fetchJson(`https://docs-jojoapi.herokuapp.com/api/nsfw/ero?apikey=${jojoapi}`)
var but = [{buttonId: `${command}`, buttonText: { displayText: 'Next Photo' }, type: 1 }]
					conn.sendMessage(from, { caption: `Sangenya prem ini`, image: { url: data.result }, buttons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
					break
case prefix+'femdom':
case 'femdom':
  addCountCmd('femdom', sender, _cmd)
  if (!isOwner)return reply(`Fitur ${command} Di Non-aktif kan Oleh Owner\nKarena sudah menjelang bulan Ramadhan:)))`)
  /*if (!isPremium)return reply("Perintah Ini Khusus Pengguna Premium, Upgrade Fitur Premium Ke Owner, Ketik !owner")*/
  var data = await fetchJson(`https://docs-jojoapi.herokuapp.com/api/nsfw/femdom?apikey=${jojoapi}`)
var but = [{buttonId: `${command}`, buttonText: { displayText: 'Next Photo' }, type: 1 }]
					conn.sendMessage(from, { caption: `Sangenya prem ini`, image: { url: data.result }, buttons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
					break
case prefix+'foot':
case 'foot':
  addCountCmd('foot', sender, _cmd)
  if (!isOwner)return reply(`Fitur ${command} Di Non-aktif kan Oleh Owner\nKarena sudah menjelang bulan Ramadhan:)))`)
  /*if (!isPremium)return reply("Perintah Ini Khusus Pengguna Premium, Upgrade Fitur Premium Ke Owner, Ketik !owner")*/
  var data = await fetchJson(`https://docs-jojoapi.herokuapp.com/api/nsfw/foot?apikey=${jojoapi}`)
var but = [{buttonId: `${command}`, buttonText: { displayText: 'Next Photo' }, type: 1 }]
					conn.sendMessage(from, { caption: `Sangenya prem ini`, image: { url: data.result }, buttons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
					break
case prefix+'gangbang':
case 'gangbang':
  addCountCmd('gangbang', sender, _cmd)
if (!isPremium) return reply(mess.OnlyPrem)
if(!actived) return reply(mess.activeds) 
  /*if (!isPremium)return reply("Perintah Ini Khusus Pengguna Premium, Upgrade Fitur Premium Ke Owner, Ketik !owner")*/
  var data = await fetchJson(`https://docs-jojoapi.herokuapp.com/api/nsfw/gangbang?apikey=${jojoapi}`)
var but = [{buttonId: `${command}`, buttonText: { displayText: 'Next Photo' }, type: 1 }]
					conn.sendMessage(from, { caption: `Sangenya prem ini`, image: { url: data.result }, buttons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
				
					break
case prefix+'glasses':
case 'glasses':
  addCountCmd('glasses', sender, _cmd)
  if (!isOwner)return reply(`Fitur ${command} Di Non-aktif kan Oleh Owner\nKarena sudah menjelang bulan Ramadhan:)))`)
  /*if (!isPremium)return reply("Perintah Ini Khusus Pengguna Premium, Upgrade Fitur Premium Ke Owner, Ketik !owner")*/
  var data = await fetchJson(`https://docs-jojoapi.herokuapp.com/api/nsfw/glasses?apikey=${jojoapi}`)
var but = [{buttonId: `${command}`, buttonText: { displayText: 'Next Photo' }, type: 1 }]
					conn.sendMessage(from, { caption: `Sangenya prem ini`, image: { url: data.result }, buttons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
					break
case prefix+'hentai':
case 'hentai':
  addCountCmd('hentai', sender, _cmd)
  if (!isOwner)return reply(`Fitur ${command} Di Non-aktif kan Oleh Owner\nKarena sudah menjelang bulan Ramadhan:)))`)
  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
   var data = await getBuffer(`https://hardianto.xyz/api/anime/random?nsfw=hentai&apikey=${keyanto}`)
				var but = [{buttonId: `/hentai`, buttonText: { displayText: "Kirim Hentai Lagi" }, type: 1 }]
				conn.sendMessage(from, { caption: "Hentai For Premium", image: { url: `https://hardianto.xyz/api/anime/random?nsfw=hentai&apikey=${keyanto}` }, buttons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
				limitAdd(sender, limit)
				break
///MAKER BY HADII APII!!!!
case prefix+'glitch':
case 'glitch':
  addCountCmd('glitch', sender, _cmd)
  if (args.length < 2) return reply(`Kirim perintah ${command} <Text1> <Text2>`)
  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
  reply("Tunggu Sebentar Sedang Membuat Makernya Sekitar 1 Menit Kurang")
conn.sendMessage(from, {caption: "Oke Done", image: { url: `https://hadi-api.herokuapp.com/api/photoxy/tiktok-effect?text=${args[1]}&text2=${args[2]}`}}, {quoted: msg})
limitAdd(sender, limit)
break
case prefix+'flaming':
case 'flaming':
  addCountCmd('flaming', sender, _cmd)
  if (args.length < 2) return reply(`Kirim perintah ${command} <Text>`)
  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
  reply("Tunggu Sebentar Sedang Membuat Makernya Sekitar 1 Menit Kurang")
conn.sendMessage(from, {caption: "Oke Done", image: { url: `https://hadi-api.herokuapp.com/api/photoxy/flaming-fire?text=${q}`}}, {quoted: msg})
limitAdd(sender, limit)
break
case prefix+'shadow':
case 'shadow':
  addCountCmd('shadow', sender, _cmd)
  if (args.length < 2) return reply(`Kirim perintah ${command} <Text1>`)
  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
  reply("Tunggu Sebentar Sedang Membuat Makernya Sekitar 1 Menit Kurang")
conn.sendMessage(from, {caption: "Oke Done", image: { url: `https://hadi-api.herokuapp.com/api/photoxy/shadow-sky?text=${q}`}}, {quoted: msg})
limitAdd(sender, limit)
break
case prefix+'wolftext':
case 'wolftext':
  addCountCmd('wolftext', sender, _cmd)
  if (args.length < 2) return reply(`Kirim perintah ${command} <Text1>`)
  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
  reply("Tunggu Sebentar Sedang Membuat Makernya Sekitar 1 Menit Kurang")
conn.sendMessage(from, {caption: "Oke Done", image: { url: `https://hadi-api.herokuapp.com/api/photoxy/wolf-metal?text=${q}`}}, {quoted: msg})
limitAdd(sender, limit)
break
case prefix+'cup':
case 'cup':
  addCountCmd('cup', sender, _cmd)
  if (args.length < 2) return reply(`Kirim perintah ${command} <Text1>`)
  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
  reply("Tunggu Sebentar Sedang Membuat Makernya Sekitar 1 Menit Kurang")
conn.sendMessage(from, {caption: "Oke Done", image: { url: `https://hadi-api.herokuapp.com/api/photoxy/teks-cup?text=${q}`}}, {quoted: msg})
limitAdd(sender, limit)
break
case prefix+'romantic':
case 'romantic':
  addCountCmd('romantic', sender, _cmd)
  if (args.length < 2) return reply(`Kirim perintah ${command} <Text1>`)
  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
  reply("Tunggu Sebentar Sedang Membuat Makernya Sekitar 1 Menit Kurang")
conn.sendMessage(from, {caption: "Oke Done", image: { url: `https://hadi-api.herokuapp.com/api/photoxy/romantic-messages?text=${q}`}}, {quoted: msg})
limitAdd(sender, limit)
break
case prefix+'writetext':
case 'writetext':
  addCountCmd('writetext', sender, _cmd)
  if (args.length < 2) return reply(`Kirim perintah ${command} <Text1>`)
  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
  reply("Tunggu Sebentar Sedang Membuat Makernya Sekitar 1 Menit Kurang")
conn.sendMessage(from, {caption: "Oke Done", image: { url: `https://hadi-api.herokuapp.com/api/photoxy/burn-paper?text=${q}`}}, {quoted: msg})
limitAdd(sender, limit)
break
case prefix+'cup2':
case 'cup2':
  addCountCmd('cup2', sender, _cmd)
  if (args.length < 2) return reply(`Kirim perintah ${command} <Text1>`)
  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
  reply("Tunggu Sebentar Sedang Membuat Makernya Sekitar 1 Menit Kurang")
conn.sendMessage(from, {caption: "Oke Done", image: { url: `https://hadi-api.herokuapp.com/api/photoxy/funny-cup?text=${q}`}}, {quoted: msg})
limitAdd(sender, limit)
break
case prefix+'lovetext':
case 'lovetext':
  addCountCmd('lovetext', sender, _cmd)
  if (args.length < 2) return reply(`Kirim perintah ${command} <Text1>`)
  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
  reply("Tunggu Sebentar Sedang Membuat Makernya Sekitar 1 Menit Kurang")
conn.sendMessage(from, {caption: "Oke Done", image: { url: `https://hadi-api.herokuapp.com/api/photoxy/love-messages?text=${q}`}}, {quoted: msg})
limitAdd(sender, limit)
break
case prefix+'lovetext2':
case 'lovetext2':
  addCountCmd('lovetext2', sender,_cmd)
  if (args.length < 2) return reply(`Kirim perintah ${command} <Text1>`)
  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
  reply("Tunggu Sebentar Sedang Membuat Makernya Sekitar 1 Menit Kurang")
conn.sendMessage(from, {caption: "Oke Done", image: { url: `https://hadi-api.herokuapp.com/api/photoxy/romantic-double?text=${q}`}}, {quoted: msg})
limitAdd(sender, limit)
break
case prefix+'undergrass':
case 'undergrass':
  addCountCmd('undergrass', sender, _cmd)
  if (args.length < 2) return reply(`Kirim perintah ${command} <Text1>`)
  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
  reply("Tunggu Sebentar Sedang Membuat Makernya Sekitar 1 Menit Kurang")
conn.sendMessage(from, {caption: "Oke Done", image: { url: `https://hadi-api.herokuapp.com/api/photoxy/under-grass?text=${q}`}}, {quoted: msg})
limitAdd(sender, limit)
break
case prefix+'tahta': case prefix+'hartatahta':
case 'tahta': case 'hartatahta':
  addCountCmd('harta tahta', sender,_cmd)
  if (args.length < 2) return reply(`Kirim perintah ${command} <Text1>`)
  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
  reply("Tunggu Sebentar Sedang Membuat Makernya Sekitar 1 Menit Kurang")
  reply(`Harta Tahta *${q}* Sedang Di Buat`)
conn.sendMessage(from, {caption: `*HARTA*\n*TAHTA*\n*${q}*`, image: { url: `https://hardianto.xyz/api/maker/harta-tahta?apikey=${keyanto}&text=${q}`}}, {quoted: msg})
limitAdd(sender, limit)
break
case prefix+'coffecup':
case 'coffecup':
  addCountCmd('coffecup', sender, _cmd)
  if (args.length < 2) return reply(`Kirim perintah ${command} <Text1>`)
  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
  reply("Tunggu Sebentar Sedang Membuat Makernya Sekitar 1 Menit Kurang")
conn.sendMessage(from, {caption: "Oke Done", image: { url: `https://hadi-api.herokuapp.com/api/photoxy/coffee-cup?text=${q}`}}, {quoted: msg})
limitAdd(sender, limit)
break
case prefix+'woodheart':
case 'woodheart':
  addCountCmd('wood heart', sender, _cmd)
  if (args.length < 2) return reply(`Kirim perintah ${command} <Text1>`)
  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
  
conn.sendMessage(from, {caption: "Oke Done", image: { url: `https://hadi-api.herokuapp.com/api/photoxy/wood-hearth?text=${q}`}}, {quoted: msg})
limitAdd(sender, limit)
break
case prefix+'say': case prefix+'tts':
case 'say': case 'tts':
  
  addCountCmd('tts', sender, _cmd)
  if (args.length < 2) return reply(`Kirim perintah ${command} Text`)
  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
   conn.sendMessage(from, { audio: {url : `https://hadi-api.herokuapp.com/api/tts?text=${q}&language=id`}, mimetype: 'audio/mp4', ptt: true}, {quoted: msg})
limitAdd(sender, limit)
   break
case prefix+'nabi': case prefix+'kisahnabi':
case 'nabi': case 'kisahnabi':
  addCountCmd('kisah nabi', sender, _cmd)
  if (args.length < 2) return reply(`Kirim perintah ${command} Nama Nabi\nContoh : ${command} Muhammad`)
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
				var data = await fetchJson(`https://hardianto.xyz/api/muslim/kisahnabi?nabi=${q}&apikey=${keyanto}`)
				var kisahnya = `*Nama Nabi :* ${data.result.name}\n*Kelahiran :* ${data.result.wafat_usia}\n*Tempat Tinggal :* ${data.result.singgah}\n*Kisah Nabi :* ${data.result.kisah}`
			    reply(kisahnya)
				limitAdd(sender, limit)
				break
case prefix+'quranaudio': case prefix+'quranvn':
case 'quranaudio': case 'quranvn':
  addCountCmd('quran audio', sender, _cmd)
  if (args.length < 2) return reply(`Kirim perintah ${command} surah ayat\nContoh : ${command} 1 2`)
  if (isNaN(args[1])) return reply(`Harus berupa angka`)
  if (isNaN(args[2])) return reply(`Harus berupa angka`)
  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
  var data = await fetchJson(`https://hardianto.xyz/api/muslim/quran?surah=${args[1]}&ayat=${args[2]}&apikey=${keyanto}`)

conn.sendMessage(from, { audio: {url : pickRandom(data.result.data.audio.secondary)}, mimetype: 'audio/mp4', ptt: true})
limirAdd(sender, limit)
break
case prefix+'quran':
case 'quran':
  addCountCmd('quran', sender, _cmd)
  if (args.length < 2) return reply(`Kirim perintah ${command} Nomer`)
  if (isNaN(args[1])) return reply(`Harus berupa angka`)
  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
  var data = await fetchJson(`https://hadi-api.herokuapp.com/api/quran?no=${q}`)
			    reply(`*Surah :* ${data.result.surah}\n*Ayat :* \n${data.result.ayat}\n*Arti :* \n${data.result.terjemahan}`)
			    break
case prefix+'listquran':
case 'listquran':
  addCountCmd('listquran', sender, _cmd)
  var listquran = `*[ LIST QURAN ]*

1. Al Fatihah (Pembuka)
2. Al Baqarah (Sapi Betina)
3. Ali Imran (Keluarga Imran)
4. An Nisa (Wanita)
5. Al Ma'idah (Jamuan)
6. Al An'am (Hewan Ternak)
7. Al-A'raf (Tempat yang Tertinggi)
8. Al-Anfal (Harta Rampasan Perang)
9. At-Taubah(Pengampunan)
10. Yunus (Nabi Yunus)
11. Hud (Nabi Hud)
12. Yusuf (Nabi Yusu)
13. Ar-Ra'd (Guruh)
14. Ibrahim (Nabi Ibrahim)
15. Al-Hijr (Gunung Al Hijr)
16. An-Nahl (Lebah)
17. Al-Isra' (Perjalanan Malam)
18. Al-Kahf (Penghuni-penghuni Gua)
19. Maryam (Maryam)
20. Ta Ha (Ta Ha)
21. Al-Anbiya (Nabi-Nabi)
22. Al-Hajj (Haji)
23. Al-Mu'minun (Orang-orang mukmin)
24. An-Nur (Cahaya)
25. Al-Furqan (Pembeda)
26. Asy-Syu'ara' (Penyair)
27. An-Naml (Semut)
28. Al-Qasas (Kisah-kisah)
29. Al-'Ankabut (Laba-laba)
30. Ar-Rum (Bangsa Romawi)
31. Luqman (Keluarga Luqman)
32. As-Sajdah (Sajdah)
33. Al-Ahzab (Golongan-golongan yang Bersekutu)
34. Saba' (Kaum Saba')
35. Fatir (Pencipta)
36. Ya Sin (Yaasiin)
37. As-Saffat (Barisan-barisan)
38. Sad (Shaad)
39. Az-Zumar (Rombongan-rombongan)
40. Ghafir (Yang Mengampuni)
41. Fussilat (Yang Dijelaskan)
42. Asy-Syura (Musyawarah)
43. Az-Zukhruf (Perhiasan)
44. Ad-Dukhan (Kabut)
45. Al-Jasiyah (Yang Bertekuk Lutut)
46. Al-Ahqaf (Bukit-bukit Pasir)
47. Muhammad (Nabi Muhammad)
48. Al-Fath (Kemenangan)
49. Al-Hujurat (Kamar-kamar)
50. Qaf (Qaaf)
51. Az-Zariyat (Angin yang Menerbangkan)
52. At-Tur (Bukit)
53. An-Najm (Bintang)
54. Al-Qamar (Bulan)
55. Ar-Rahman (Yang Maha Pemurah)
56. Al-Waqi'ah (Hari Kiamat)
57. Al-Hadid (Besi)
58. Al-Mujadilah (Wanita yang Mengajukan Gugatan)
59. Al-Hasyr (Pengusiran)
60. Al-Mumtahanah (Wanita yang Diuji)
61. As-Saff (Satu Barisan)
62. Al-Jumu'ah (Hari Jum'at)
63. Al-Munafiqun (Orang-orang yang Munafik)
64. At-Tagabun (Hari Dinampakkan Kesalahan-kesalahan)
65. At-Talaq (Talak)
67. Al-Mulk (Kerajaan)
68. Al-Qalam (Pena)
69. Al-Haqqah (Hari Kiamat)
70. Al-Ma'arij (Tempat Naik)
71. Nuh (Nabi Nuh)
72. Al-Jinn (Jin)
73. Al-Muzzammil (Orang yang Berselimut)
74. Al-Muddassir (Orang yang Berkemul)
75. Al-Qiyamah (Kiamat)
76. Al-Insan (Manusia)
77. Al-Mursalat (Malaikat-Malaikat Yang Diutus)
78. An-Naba' (Berita Besar)
79. An-Nazi'at (Malaikat-Malaikat Yang Mencabut)
80. 'Abasa (Ia Bermuka Masam)
81. At-Takwir (Menggulung)
82.Al-Infitar (Terbelah)
83. Al-Tatfif (Orang-orang yang Curang)
84. Al-Insyiqaq (Terbelah)
85. Al-Buruj (Gugusan Bintang)
86. At-Tariq (Yang Datang di Malam Hari)
87. Al-A'la (Yang Paling Tinggi)
88. Al-Gasyiyah (Hari Pembalasan)
89. Al-Fajr (Fajar)
90. Al-Balad (Negeri)
91. Asy-Syams (Matahari)
92. Al-Lail (Malam)
93. Ad-Duha (Waktu Matahari Sepenggalahan Naik (Dhuha))
94. Al-Insyirah (Melapangkan)
95. At-Tin (Buah Tin)
96. Al-'Alaq (Segumpal Darah)
97. Al-Qadr (Kemuliaan)
98. Al-Bayyinah (Pembuktian)
99. Az-Zalzalah (Kegoncangan)
100. Al-'Adiyat (Berlari Kencang)
101. Al-Qari'ah (Hari Kiamat)
102. At-Takasur (Bermegah-megahan)
103. Al-'Asr (Masa)
104. Al-Humazah (Pengumpat)
105. Al-Fil (Gajah)
106. Quraisy (Suku Quraisy)
107. Al-Ma'un (Barang-barang yang Berguna)
108. Al-Kausar (Nikmat yang Berlimpah)
109. Al-Kafirun (Orang-orang Kafir)
110. An-Nasr (Pertolongan)
111. Al-Lahab (Gejolak Api)
112. Al-Ikhlas (Ikhlas)
113. Al-Falaq (Waktu Subuh)
100. Al-'Adiyat (Berlari Kencang)
101. Al-Qari'ah (Hari Kiamat)
102. At-Takasur (Bermegah-megahan)
103. Al-'Asr (Masa)
104. Al-Humazah (Pengumpat)
105. Al-Fil (Gajah)
106. Quraisy (Suku Quraisy)
107. Al-Ma'un (Barang-barang yang Berguna)
108. Al-Kausar (Nikmat yang Berlimpah)
109. Al-Kafirun (Orang-orang Kafir)
110. An-Nasr (Pertolongan)
111. Al-Lahab (Gejolak Api)
112. Al-Ikhlas (Ikhlas)
113. Al-Falaq (Waktu Subuh)
114. An-Nas (Umat Manusia)`
  textImg(listquran)
  break
case prefix+'darkjokes': case prefix+'dark': case prefix+'darkjoke':
case 'darkjoke': case 'darkjokes':
  addCountCmd('darkjokes', sender,_cmd)
  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
  var but = [{buttonId: `${command}`, buttonText: { displayText: "Dark Jokes" }, type: 1 }]
  var data = await fetchJson(`https://hadi-api.herokuapp.com/api/darkjokes`)
				conn.sendMessage(from, { caption: "Oke Done", image: { url: data.result }, buttons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
limitAdd(sender, limit)
break
case prefix+'readmore':
  case prefix+'more':
  case 'readmore':
    addCountCmd('readmore', sender,_cmd)
    if (args.length < 2) return reply(`Kirim perintah ${command} Text1|Text2`)
    var read = q.split("|")
    var more2 = q.split("|")
    var retmor = `${read}${readmore}${more}`
    conn.sendMessage(from, { text: retmor}, { quoted: msg })
    break
case prefix+'kyy':
  case prefix+'simi':
  case 'kyy':
  const cimcimi = await fetchJson(`https://api.simsimi.net/v2/?text=${q}&lc=id`)
  conn.sendMessage(from, { text: cimcimi.success})
  break
case prefix+'wiki':
  case prefix+'wikipedia':
  case 'wiki':
  case 'wikipedia':
    addCountCmd('wikipedia', sender, _cmd)
    if (args.length < 2) return reply(`Kirim perintah ${command} Kata\nContoh : ${command} WhatsApp`)
    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
    reply(mess.wait)
     var data = await fetchJson(`https://hadi-api.herokuapp.com/api/wiki?query=${q}`)
    var captionnya = `${data.result}\n\n${readmore} *Ghos - Bid*`
    conn.sendMessage(from, {caption: captionnya, image: {url: `https://telegra.ph/file/b4a72e6438af9770300eb.jpg`}}, {quoted: msg})
    limitAdd(sender, limit)
    break
case prefix+'igstalk':
  case prefix+'stalkig':
  case 'igstalk':
    addCountCmd('igstalk', sender, _cmd)
    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
    if (args.length < 2) return reply(`Kirim perintah ${command} Username\nContoh : ${command} xxyannkyy`)
    var data = await fetchJson(`https://hardianto.xyz/api/igstalk?username=${q}&apikey=hardianto`)
    var caption = `*[ INSTAGRAM STALK ]*\n\n👤Username : ${data.username}\n📛 Full Name : ${data.fullname}\n✔️ Verified : ${data.verified}\n👥 Followers : ${data.followers}\n🫂 Following : ${data.follow}\n🗣️ Kategori ${data.category}\n\n${readmore} *Ghos - Bid*`
    conn.sendMessage(from, {caption: caption, image: {url: data.thumbnail}}, {quoted: msg})
    limitAdd(sender, limit)
    break
case prefix+'guramaker':
case 'guramaker':
  addCountCmd('guramaker', sender, _cmd)
  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
    if (args.length < 2) return reply(`Kirim perintah ${command} Text\nContoh : ${command} Ghoskyy`)
   conn.sendMessage(from, {caption: `Premium Feature For User Free`, image: {url: `https://hardianto.xyz/api/bot/gura?apikey=hardianto&nama=${q}`}}, {quoted: msg})
   limitAdd(sender, limit)
   break
   case prefix+'kanekimaker':
   case 'kanekimaker':
     addCountCmd('kanekimaker', sender,_cmd)
  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
    if (args.length < 2) return reply(`Kirim perintah ${command} Text\nContoh : ${command} Ghoskyy`)
   conn.sendMessage(from, {caption: `Premium Feature For User Free`, image: {url: `https://hardianto.xyz/api/bot/gfx1?apikey=hardianto&nama=${q}`}}, {quoted: msg})
   limitAdd(sender, limit)
   break
case prefix+'lolimaker':
case 'lolimaker':
  addCountCmd('lolimaker', sender,_cmd)
  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
    if (args.length < 2) return reply(`Kirim perintah ${command} Text\nContoh : ${command} Ghoskyy`)
   conn.sendMessage(from, {caption: `Premium Feature For User Free`, image: {url: `https://hardianto.xyz/api/bot/gfx2?apikey=hardianto&nama=${q}`}}, {quoted: msg})
   limitAdd(sender, limit)
   break
case prefix+'waifumaker': case 'waifumaker':
  addCountCmd('waifumaker', sender,_cmd)
  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
    if (args.length < 2) return reply(`Kirim perintah ${command} Text\nContoh : ${command} Ghoskyy Bid`)
   conn.sendMessage(from, {caption: `Premium Feature For User Free`, image: {url: `https://hardianto.xyz/api/bot/gfx4?apikey=hardianto&text1=${args[1]}&text2=${args[2]}`}}, {quoted: msg})
   limitAdd(sender, limit)
   break
case prefix+'qrcode':
  case prefix+'qr':
  case 'qr': case 'qrcode':
    addCountCmd('qrcode', sender,_cmd)
    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
    if (args.length < 2) return reply(`Kirim perintah ${command} Text\nContoh : ${command} Ghosky - Bid`)
    reply(`Membuat Qr Code`)
    conn.sendMessage(from, {caption: `*QR CODE*`, image: {url: `https://docs-jojo.herokuapp.com/api/qrcode?text=${q}`}}, {quoted: msg})
    limitAdd(sender, limit)
    break
case prefix+'cersex':
case 'cersex':
  addCountCmd('cersex', sender,_cmd)
  if (!isPremium)return reply("Perintah Ini Khusus Pengguna Premium, Upgrade Fitur Premium Ke Owner, Ketik !owner")
  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
  var data = await fetchJson(`https://docs-jojo.herokuapp.com/api/cersex`)
  var caption = `*[ CERSEX ]*\n\n*Judul* : ${data.result.judul}\n*Cerita* : ${data.result.cersex}\n${readmore} *JOJOBOT*`
  conn.sendMessage(from, {caption: caption, image: {url: data.result.img}}, {quoted: msg})
  limitAdd(sender, limit)
  break
case prefix+'cerpen':
case 'cerpen':
  addCountCmd('cerpen', sender,_cmd)
  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
  var data = await fetchJson(`https://docs-jojo.herokuapp.com/api/cerpen`)
  var text = `*[ CERPEN ]*\n\n*Judul* : ${data.result.title}\n*Kategori* : ${data.result.kategori}\n*Cerritanya* : ${data.result.cerpen}`
  conn.sendMessage(from, {text: text}, {quoted: msg})
  limitAdd(sender, limit)
  break
case prefix+'faktaunik':
  case prefix+'faktamenarik':
  case 'faktaunik': case 'faktamenarik':
    addCountCmd('faktaunik', sender, _cmd)
    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
     var data = await fetchJson(`https://docs-jojo.herokuapp.com/api/fakta-unik`)
var caption = `Tahukah kamu?
${data.result}`
var but = [{buttonId: `${command}`, buttonText: { displayText: "Fakta Unik" }, type: 1 }]
conn.sendMessage(from, { text: caption, buttons: but, footer: "Ghos - Bid", templateButtons: but }, {quoted: msg})
limitAdd(sender, limit)
break
//maker arasya
case prefix+'leaves':
case 'leaves':
  addCountCmd('leaves', sender,_cmd)
  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
  var data = await fetchJson(`https://jojo-docsapi.herokuapp.com/api/textpro/natural-leaves?apikey=Joo&text=${q}`)
  conn.sendMessage(from, {caption: `Succes!`, image: {url: data.result}}, {quoted: msg})
  limitAdd(sender, limit)
  break
case prefix+'pornhub':
case 'pornhub':
  addCountCmd('pornhub', sender, _cmd)
  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
  reply("Tunggu Sebentar Sedang Membuat Makernya Sekitar 1 Menit Kurang")
  var data = await fetchJson(`https://jojo-docsapi.herokuapp.com/api/textpro/porn-hub?apikey=Joo&text1=${args[1]}&text2=${args[2]}`)
  conn.sendMessage(from, {caption: `Succes!`, image: {url: data.result}}, {quoted: msg})
  limitAdd(sender, limit)
  break
case prefix+'3d':
case '3d':
  addCountCmd('3d', sender, _cmd)
  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
  reply("Tunggu Sebentar Sedang Membuat Makernya Sekitar 1 Menit Kurang")
  var data = await fetchJson(`https://jojo-docsapi.herokuapp.com/api/textpro/3d-gradient?apikey=Joo&text=${q}`)
  conn.sendMessage(from, {caption: `Succes!`, image: {url: data.result}}, {quoted: msg})
  limitAdd(sender, limit)
  break
case prefix+'christmas':
case 'christmas':
  addCountCmd('christmas', sender, _cmd)
if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
reply("Tunggu Sebentar Sedang Membuat Makernya Sekitar 1 Menit Kurang")
  var data = await fetchJson(`https://jojo-docsapi.herokuapp.com/api/textpro/christmas?apikey=Joo&text=${q}`)
  conn.sendMessage(from, {caption: `Succes!`, image: {url: data.result}}, {quoted: msg})
  limitAdd(sender, limit)
  break
case prefix+'thunder':
case 'thunder':
  addCountCmd('thunder', sender, _cmd)
  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
  reply("Tunggu Sebentar Sedang Membuat Makernya Sekitar 1 Menit Kurang")
 var data = await fetchJson(`https://bx-hunter.herokuapp.com/api/textpro/thunder-text?text=${q}&apikey=${ikiapi}`)
conn.sendMessage(from, {caption: `nih Dah jadi`, image: {url: data.result}}, {quoted: msg})
limitAdd(sender, limit)
break
case prefix+'logowolf':
case 'logowolf':
  addCountCmd('logowolf', sender, _cmd)
  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
reply("Tunggu Sebentar Sedang Membuat Makernya Sekitar 1 Menit Kurang")
  var data = await fetchJson(`https://jojo-docsapi.herokuapp.com/api/textpro/logo-wolf2?apikey=Joo&text=${args[1]}&text2=${args[2]}`)

  conn.sendMessage(from, {caption: `Succes!`, image: {url: data.result}}, {quoted: msg})
  limitAdd(sender, limit)
  break
case prefix+'logowolf2':
case 'logowolf2':
  addCountCmd('logowolf2', sender, _cmd)
  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
  reply("Tunggu Sebentar Sedang Membuat Makernya Sekitar 1 Menit Kurang")
  var data = await fetchJson(`https://jojo-docsapi.herokuapp.com/api/textpro/logo-wolf ?apikey=Joo&text=${args[1]}&text2=${args[2]}`)
  conn.sendMessage(from, {caption: `Succes!`, image: {url: data.result}}, {quoted: msg})
  limitAdd(sender, limit)
  break
//Amel
case prefix+'ppcouple':
  case prefix+'ppcp':
    case prefix+'couple':
    case 'ppcp': case 'ppcouple':
      addCountCmd('ppcouple', sender, _cmd)
      if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
    var data = await fetchJson(`https://melcanz.com/ppcouple?&apikey=${apikey}`)
    reply("Couplean sama aku yuk")
conn.sendMessage(from, {caption: `Cowo`, image: {url: data.cowo}}, {quoted: msg})
conn.sendMessage(from, {caption: `Cewe`, image: {url: data.cewe}}, {quoted: msg})
limitAdd(sender, limit)
break
case prefix+'xnxx':
  case prefix+'xnxxdownload':
  case 'xnxx': case 'xnxxdownload':
    addCountCmd('xnxxdownload', sender, _cmd)
if (args.length < 2) return reply(`Kirim perintah ${command} link`)
if (!args[1].includes('xnxx')) return reply(mess.error.Iv)
			    if (!isUrl(args[1])) return reply(mess.error.Iv)
/*if (!isPremium)return reply("Perintah Ini Khusus Pengguna Premium, Upgrade Fitur Premium Ke Owner, Ketik !owKetik*/
var data = await fetchJson(`https://melcanz.com/xnxxdl?url=${q}&apikey=${apikey}`)
reply(mess.wait)
conn.sendMessage(from, {video: {url: data.result.files.high}}, {quoted: msg})
break
//Punya Iki
case prefix+'kalkulator':
  case prefix+'k':
  case 'kalkulator':
    addCountCmd('kalkulator', sender, _cmd)
    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
    var data = await fetchJson(`https://bx-hunter.herokuapp.com/api/calculator?angka=${q}&apikey=${ikiapi}`)
    reply(data.result)
    limitAdd(sender, limit)
    break
case prefix+'maker1':
case 'maker1':
  addCountCmd('maker1', sender, _cmd)
  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
  var data = await getBuffer(`https://bx-hunter.herokuapp.com/api/flamingtext/text3d?text=${q}&apikey=${ikiapi}`)
reply("Tunggu Sebentar Sedang Membuat Makernya Sekitar 1 Menit Kurang")
conn.sendMessage(from, {caption: `*${q}*`, image: data}, {quoted: msg})
limitAdd(sender, limit)
break
case prefix+'maker2':
case 'maker2':
  addCountCmd('maker2', sender, _cmd)
  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
  var data = await getBuffer(`https://bx-hunter.herokuapp.com/api/flamingtext/blackbird?text=${q}&apikey=${ikiapi}`)
reply("Tunggu Sebentar Sedang Membuat Makernya Sekitar 1 Menit Kurang")
conn.sendMessage(from, {caption: `*${q}*`, image: data}, {quoted: msg})
limitAdd(sender, limit)
case prefix+'maker3':
case 'maker3':
  addCountCmd('maker3', sender, _cmd)
  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
  var data = await getBuffer(`https://bx-hunter.herokuapp.com/api/flamingtext/express?text=${q}&apikey=${ikiapi}`)
reply("Tunggu Sebentar Sedang Membuat Makernya Sekitar 1 Menit Kurang")
conn.sendMessage(from, {caption: `*${q}*`, image: data}, {quoted: msg})
limitAdd(sender, limit)
break
case prefix+'maker4':
case 'maker4':
  addCountCmd('maker4', sender, _cmd)
  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
  var data = await getBuffer(`https://bx-hunter.herokuapp.com/api/flamingtext/hbd?text=${q}&apikey=${ikiapi}`)
reply("Tunggu Sebentar Sedang Membuat Makernya Sekitar 1 Menit Kurang")
conn.sendMessage(from, {caption: `*${q}*`, image: data}, {quoted: msg})
limitAdd(sender, limit)
break
case prefix+'maker5':
case 'maker5':
  addCountCmd('maker5', sender, _cmd)
  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
  var data = await getBuffer(`https://bx-hunter.herokuapp.com/api/flamingtext/glow?text=${q}&apikey=${ikiapi}`)
reply("Tunggu Sebentar Sedang Membuat Makernya Sekitar 1 Menit Kurang")
conn.sendMessage(from, {caption: `*${q}*`, image: data}, {quoted: msg})
limitAdd(sender, limit)
break
case prefix+'maker6':
case 'maker6':
  addCountCmd('maker6', sender, _cmd)
  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
  var data = await getBuffer(`https://bx-hunter.herokuapp.com/api/flamingtext/neon?text=${q}&apikey=${ikiapi}`)
reply("Tunggu Sebentar Sedang Membuat Makernya Sekitar 1 Menit Kurang")
conn.sendMessage(from, {caption: `*${q}*`, image: data}, {quoted: msg})
limitAdd(sender, limit)
break
case prefix+'maker7':
case 'maker7':
  addCountCmd('maker7', sender, _cmd)
  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
  var data = await getBuffer(`https://bx-hunter.herokuapp.com/api/flamingtext/sound?text=${q}&apikey=${ikiapi}`)
reply("Tunggu Sebentar Sedang Membuat Makernya Sekitar 1 Menit Kurang")
conn.sendMessage(from, {caption: `*${q}*`, image: data}, {quoted: msg})
limitAdd(sender, limit)
break
case prefix+'maker8':
case 'maker8':
  addCountCmd('maker8', sender, _cmd)
  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
  var data = await getBuffer(`https://bx-hunter.herokuapp.com/api/flamingtext/cereal?text=${q}&apikey=${ikiapi}`)
reply("Tunggu Sebentar Sedang Membuat Makernya Sekitar 1 Menit Kurang")
conn.sendMessage(from, {caption: `*${q}*`, image: data}, {quoted: msg})
limitAdd(sender, limit)
break
case prefix+'maker9':
case 'maker9':
  addCountCmd('maker9', sender, _cmd)
  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
  var data = await getBuffer(`https://bx-hunter.herokuapp.com/api/flamingtext/fun?text=${q}&apikey=${ikiapi}`)
  reply("Tunggu Sebentar Sedang Membuat Makernya Sekitar 1 Menit Kurang")
conn.sendMessage(from, {caption: `*${q}*`, image: data}, {quoted: msg})
limitAdd(sender, limit)
break
case prefix+'maker10':
case 'maker10':
  addCountCmd('maker10', sender, _cmd)
  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
  var data = await getBuffer(`https://bx-hunter.herokuapp.com/api/flamingtext/harry?text=${q}&apikey=${ikiapi}`)
  reply("Tunggu Sebentar Sedang Membuat Makernya Sekitar 1 Menit Kurang")
conn.sendMessage(from, {caption: `*${q}*`, image: data}, {quoted: msg})
limitAdd(sender, limit)
break
case prefix+'react':
case 'react': case 'reaction':
  case prefix+'reaction':
    addCountCmd('react', sender, _cmd)
  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
 conn.sendMessage(from, { react: { text: `${q}`, key: msg.key }})
 limitAdd(sender, limit)
 break
			default:
			if (isGroup && isCmd) {
				var but = [
				{ urlButton: { displayText:`Instagram`, url:'https://instagram.com/xxyannkyy' }},
				{ quickReplyButton: { displayText:`back to menu`, id: '.menu' }}, ]
conn.sendMessage(from, { text: "Maaf Commandnya Belum Ada Ya kak_^", templateButtons: but }, {quoted: msg})
			}
			if (!isGroup && isCmd) {
			var buts = [
			{ urlButton: { displayText:'instagram', url:'https://instagram.com/xxyannkyy' }},]
				conn.sendMessage(from, { text:"Maaf Commandnya Belum Ada Ya Kak_^", templateButtons: buts}, { quoted: msg})
			}
		}
	} catch (err) {
		console.log(color('[ERROR]', 'red'), err)
	}
}
