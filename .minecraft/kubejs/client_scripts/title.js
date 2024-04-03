const version = '4.4.0'
const titles = [
    'Made by youyihj',
    'Powered by Minecraft 1.18.2',
    '你正在打开的是假的整合包',
    '我准备好了！',
    '圆石数量：2147483647 个',
    '来一瓶氰化钾压压惊',
    '多喝岩浆',
    '滑稽',
    '作弊什么的，不被发现就可以哦',
    '系统检测到有人正在暗恋你',
    '宇 宙 大 爆 炸',
    '以下图样仅供参考，实际以游戏为主',
    '拉出去枪毙五分钟',
    '怠惰 ing...',
    '你渴望力量吗？',
    'El psy kongroo',
    '生气了吗？没有哦',
    'niconiconi~',
    'duang~',
    'poi~',
    '蝉在叫 人坏掉',
    '二向箔打击',
    'Nice Boat',
    'Bug 什么的，自行解决',
    '和我签订契约，成为魔法少女吧',
    '少女祈祷中',
    '↑↑↓↓←←→→BABA',
    '大家好我系渣渣辉，是兄弟就来砍我',
    '404 NOT FOUND',
    '刀片批发',
    '你为什么不去问问神奇海螺呢',
    'Deal late no more',
    '爆炸就是艺术',
    '你为什么只是在一旁看着',
    '大吉大利，今晚吃鸡',
    '1 EU = 4 RF',
    '可爱即是正义',
    '然而是用纸板制成的赝品',
    '一切工具都是个锤子',
    '一首凉凉送给你',
    '雪花飘飘，北风萧萧',
    '因为这是量子物理啊',
    '不过如此',
    '一切都是时辰的错',
    '前方高能反应',
    '哇，金色传说',
    '一切事物都是相互勾连的',
    '真相永远只有一个',
    '新人请说出常用模组',
    '我们未能击穿敌方装甲',
    'The modpack is a lie',
    '请使用 Java 6 打开本整合',
    '我们中 出了个叛徒',
    '我的内心毫无波动，甚至还想笑',
    '来自东方的神秘力量',
    '我曾经迷信科学',
    '现在是幻想时间',
    '万物皆有其价值所在',
    '大本钟下送快递，上面摆下面寄',
    '一大波苦力怕正在接近',
    '鱼 好大的鱼 虎纹鲨鱼',
    '为什么会变成这样呢',
    '今天也要元气满满~',
    '你被强化了，快上！',
    '在地狱里到处洒满了熵',
    '2A848F9',
    'To be continued',
    '你 打 字 带 空 格',
    '人与人之间的体质不能一概而论',
    '是心肌梗塞的感觉',
    '香草方式',
    '暴徒不能在这个街区上产卵',
    '嘤嘤嘤',
    '这个食谱需要内国防部',
    '喵内噶？',
    '绝对会流行起来的',
    '犹豫就会败北，果断就会白给',
    '这使你充满了决心',
    '狗吸收了神器',
    '不要停下来啊',
    '人类的本质就是复读机',
    '有内鬼，停止交易',
    'Also try EnigTech 2!',
    'Also try Sky Factory 4!',
    'Also try All the Mods 3 Expert!',
    'Also try Enigmatica 2 Expert Extended!',
    'On MCBBS',
    '认真看书了吗',
    '鸡你太美',
    '我想起高兴的事情',
    'Creeper?',
    '这是禁止事项',
    '小心二刺猿',
    '希 望 の 花',
    '今天的风儿甚是喧嚣',
    '不得了了，隔壁超市薯片半价了',
    '一入 AE 深似海，从此手动是路人',
    '真是 HIGH 到不行',
    '人被杀就会死',
    '检测到在途的聚变打击',
    '奇怪的知识增加了',
    '-99% off',
    '阿卡林',
    'ko~ ko~ da~ yo~',
    '接下来就交给你们了',
    '锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷',
    '单走一张 6',
    '十七张牌你能秒我',
    '大脑在颤抖',
    'Never gonna give you up',
    '我试过了，是假的',
    'hypo meaning low',
    '-emia meaning presenting in blood',
    'Don\'t ask to ask',
    '生物质燃料批发',
    '地铁 老人 手机',
    '这也在你的计划之中了',
    '大家就当无事发生过',
    '两面包夹芝士',
    '这种事情绝对很奇怪啊',
    '奇迹和魔法都不是免费的',
    '你这瓜保熟吗',
    '犯大吴疆土者，盛必击而破之',
    '这句话一定不是谎言',
    '爱的力量是无限的',
    '我们每天所经历的每个平凡的日常，也许就是连续发生的奇迹',
    '那我呢',
    '你相信重力吗',
    '为什么要演奏《春日影》',
    '你这个人满脑子想着都是自己呢',
    '八号打假赛的提前倒下',
    '会赢的',
    '还是 PVP 大佬'
]

let randomTitleIndex = -1
let run = false

onEvent('client.tick', event => {
    if (!run) {
        if (randomTitleIndex == -1) {
            randomTitleIndex = Math.floor(Math.random() * titles.length)
        }
        let title = titles[randomTitleIndex]
        Client.title = `飞翔之路 v${version} | ${title}`
        run = true
    }
})