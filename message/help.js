const moment = require("moment-timezone");
const fs = require("fs");

moment.tz.setDefault("Asia/Jakarta").locale("id");

let dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
const ucapanWaktu = "Selamat "+dt.charAt(0).toUpperCase() + dt.slice(1)
let setting = JSON.parse(fs.readFileSync('./config.json'))
const { getLimit, getBalance, cekGLimit } = require("../lib/limit")

const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)

function toCommas(x) {
	x = x.toString()
	var pattern = /(-?\d+)(\d{3})/;
     while (pattern.test(x))
	   x = x.replace(pattern, "$1,$2");
	return x;
}

exports.allmenu = (sender, prefix, pushname, isOwner, isPremium, balance, limit, limitCount, glimit, gcount) => {
	return `*${setting.botName} - MD Beta*
	
  _*${ucapanWaktu} ${pushname !== undefined ? pushname : 'Kak'}*_

    Library : *Baileys-MD*.
    Prefix : ( ${prefix} )
    Tanggal Server : ${moment.tz('Asia/Jakarta').format('DD/MM/YY')}
    Waktu Server : ${moment.tz('Asia/Jakarta').format('HH:mm:ss')}

	Status : ${isOwner ? 'Owner' : isPremium ? 'Premium' : 'Free'}
	Limit Harian : ${isOwner ? '-' : isPremium ? 'Unlimited' : getLimit(sender, limitCount, limit)}
	Limit Game : ${isOwner ? '-' : cekGLimit(sender, gcount, glimit)}
	Balance : $${toCommas(getBalance(sender, balance))}
  Note : Anggap _<>_ *Tidak Ada*
  
  _Ada Bug? Ketik ${prefix}report Bug mu_
  ${readmore}
  *Main Menu*
   ≻ ${prefix}menu
   ≻ ${prefix}tqto
   ≻ ${prefix}groupghoskyy
   ≻ ${prefix}owner
   ≻ ${prefix}donasi
   ≻ ${prefix}speed
   ≻ ${prefix}runtime
   ≻ ${prefix}cekprem
   ≻ ${prefix}listprem
   > ${prefix}listban
   ≻ ${prefix}simi _text_
  
  *Converter/Tools*
   ≻ ${prefix}stiker _ReplyGambar/Caption_
   ≻ ${prefix}toimg _ReplyStiker_
   ≻ ${prefix}tovid _ReplyStiker_

  *Downloader*
   ≻ ${prefix}play _query_
   ≻ ${prefix}tiktok _link_
   ≻ ${prefix}tiktokaudio _link_
   ≻ ${prefix}ytmp4 _link_
   ≻ ${prefix}ytmp3 _link_
   ≻ ${prefix}getvideo
   ≻ ${prefix}getmusic
   ≻ ${prefix}instagram _link_
   ≻ ${prefix}facebook _link_
  
  *Random Menu*
   ≻ ${prefix}quote
   ≻ ${prefix}cecan
   ≻ ${prefix}cogan
   ≻ ${prefix}naruto
   ≻ ${prefix}loli
   ≻ ${prefix}waifu
   ≻ ${prefix}husbu
   ≻ ${prefix}yaoi
   
  *Nsfw User Free*
   ≻ ${prefix}hentai
  
  *Premium User*
   ≻ ${prefix}ass
   ≻ ${prefix}bdsm
   ≻ ${prefix}ahegao
   ≻ ${prefix}cuckold
   ≻ ${prefix}blowjob
   ≻ ${prefix}cum
   ≻ ${prefix}ero
   ≻ ${prefix}femdom
   ≻ ${prefix}foot
   ≻ ${prefix}gangbang
   ≻ ${prefix}xnxx _link_
  
  *Menu Maker*
   ≻ ${prefix}glitch _text_ _text_
   ≻ ${prefix}flaming _text_
   ≻ ${prefix}shadow _text_
   ≻ ${prefix}wolftext _text_
   ≻ ${prefix}cup _text_
   ≻ ${prefix}cup2 _text_
   ≻ ${prefix}romantic _text_
   ≻ ${prefix}writetext _text_
   ≻ ${prefix}lovetext _text_
   ≻ ${prefix}lovetext2 _text_
   ≻ ${prefix}undergrass _text_
   ≻ ${prefix}coffecup _text_
   ≻ ${prefix}woodheart _text_
   ≻ ${prefix}tahta _text_
   ≻ ${prefix}waifumaker _text_
   ≻ ${prefix}lolimaker _text_
   ≻ ${prefix}kanekimaker _text_
   ≻ ${prefix}guramaker _text_
   ≻ ${prefix}leaves _text_
   ≻ ${prefix}pornhub _text_
   ≻ ${prefix}3d _text_
   ≻ ${prefix}christmas _text_
   ≻ ${prefix}logowolf _text_
   ≻ ${prefix}logowolf2 _text_
   ≻ ${prefix}thunder _text_
  
  *Maker From Image*
   ≻ ${prefix}maker1 _text_
   ≻ ${prefix}maker2 _text_
   ≻ ${prefix}maker3 _text_
   ≻ ${prefix}maker4 _text_
   ≻ ${prefix}maker5 _text_
   ≻ ${prefix}maker6 _text_
   ≻ ${prefix}maker7 _text_
   ≻ ${prefix}maker8 _text_
   ≻ ${prefix}maker9 _text_
   ≻ ${prefix}maker10 _text_
  
  *Menu Lain Nya*
   ≻ ${prefix}shortlink _link_
   ≻ ${prefix}ssweb _link_
   ≻ ${prefix}ssdesktop _link_
   ≻ ${prefix}sshpfull _link_
   ≻ ${prefix}kbbi <Kata>
   ≻ ${prefix}faktaunik
   ≻ ${prefix}ppcp
   ≻ ${prefix}kalkulator
   ≻ ${prefix}darkjokes
   ≻ ${prefix}covid19
   ≻ ${prefix}cerpen
   ≻ ${prefix}cersex
   ≻ ${prefix}wiki _query_
   ≻ ${prefix}igstalk _username_
   ≻ ${prefix}say _text_
   ≻ ${prefix}qr _text_
   ≻ ${prefix}readmore _text_|_text_
   ≻ ${prefix}hitungmundur 12 10 2022
 
  *Islamic Menu*
   ≻ ${prefix}quran _nomer_
   ≻ ${prefix}quranaudio _surah ayat_
   ≻ ${prefix}listquran _nomer_
   ≻ ${prefix}kisahnabi <Nama Nabi>

  *Menu Tulis*
   ≻ ${prefix}nuliskanan _text_
   ≻ ${prefix}nuliskiri _text_
   ≻ ${prefix}foliokanan _text_
   ≻ ${prefix}foliokiri _text_
  
  *Search Menu*
   ≻ ${prefix}lirik _judul_
   ≻ ${prefix}grupwa _text_
   ≻ ${prefix}ytsearch _text_
   ≻ ${prefix}pinterest _query_
   
  *Game & Fun Menu*
   ≻ ${prefix}tictactoe @tag
   ≻ ${prefix}delttc
   ≻ ${prefix}suit
   ≻ ${prefix}slot
   ≻ ${prefix}tebakgambar
   ≻ ${prefix}apakah _query_
   ≻ ${prefix}kapankah _query_
   ≻ ${prefix}rate _query_
   ≻ ${prefix}gantecek <Nama>
   ≻ ${prefix}cantikcek <Nama>
   ≻ ${prefix}sangecek <Nama>
   ≻ ${prefix}gaycek <Nama>
   ≻ ${prefix}lesbicek <Nama>
   ≻ ${prefix}gimana _query_
   ≻ ${prefix}bisakah _query_
   ≻ ${prefix}cekme
   ≻ ${prefix}react <Emoji>
   
  *Payment & Bank*
   ≻ ${prefix}buylimit <Jumlah>
   ≻ ${prefix}buyglimit <Jumlah>
   ≻ ${prefix}transfer @tag <jumlah>
   ≻ ${prefix}limit
   ≻ ${prefix}balance
   ≻ ${prefix}topbalance
 
  *Group Menu*
   ≻ ${prefix}setppgrup
   ≻ ${prefix}linkgrup
   ≻ ${prefix}setnamegc
   ≻ ${prefix}setdesc
   ≻ ${prefix}group <Open/Close>
   ≻ ${prefix}revoke
   ≻ ${prefix}hidetag _text_
   ≻ ${prefix}kick <@tag>
   ≻ ${prefix}add <@tag>
  
  *Moderator Menu*
   > evalcode
   x evalcode-2
   $ executor
   > ${prefix}bcm
   > ${prefix}ban
   > ${prefix}unban
  
  *Owner Menu*
   x evalcode-2
   > evalcode
   $ executor
   ≻ ${prefix}setppbot
   ≻ ${prefix}exif
   ≻ ${prefix}leave
   ≻ ${prefix}addprem
   ≻ ${prefix}delprem
   ≻ ${prefix}broadcast
   > ${prefix}Ban
   > ${prefix}unban
`
}
