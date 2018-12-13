const botkit = require('botkit');
const keys = require('./keys');
const cron = require('node-cron');

const apiaiBotkit = require('api-ai-botkit');
const apiai = apiaiBotkit(keys.apiaiToken);


const controller = botkit.slackbot({
    debug: false,
    log: true
});

// bot hear 할때 option
const botOption = [
    'direct_message',
    'direct_mention',
    'mention'
];

// 확인 변수
let isSoup;
let isNoodles;

// 메뉴
let menu = {
    'okSoup': {
        'okNoodles': [
            '쌀국수',
            '라면',
            '짬뽕',
            '기타'
        ],
        'noNoodles': [
            '김치찌개',
            '부대찌개',
            '알곤이탕',
            '순대국',
            '만두국',
            '기타'
        ]
    },
    'noSoup': [
        '분식집',
        '햄버거',
        '돈까스',
        '큐브 스테이크',
        '보쌈',
        '일반 음식점',
        '기타'
    ]
}
// 점심 먹을지 말해주는 함수
function startLunch(hour) {
    controller.spawn({
        token: keys.botAPIToken
    }, (bot) => {
        bot.say({
            text: hour + '시 입니다. 점심 드실꺼죠 ?',
            channel: 'DEQQKP42U'
        });
    });
}
// 응이라 들으면 대답하는 컨트롤러
controller.hears('응', botOption, (bot, message) => {
    bot.createConversation(message, (err, convo) => {
        /*convo.addMessage({
            text: '111',
        }, 'korea_thred');*/

        convo.addQuestion('국물 있는걸로 먹을래요 ?', [{
                pattern: '응',
                callback: function (response, convo) {
                    isSoup = true;
                    askNoodles();
                    convo.stop();
                }
            },
            {
                pattern: '아니',
                callback: function (response, convo) {
                    isSoup = false;
                    askSpace();
                    convo.stop();
                }
            }
        ]);
        convo.activate();
    });
    // 면 먹을지 대답여부 함수
    function askNoodles() {
        let answer = '';
        bot.createConversation(message, (err, convo) => {
            convo.addQuestion('면 먹을래요 ?', [{
                    pattern: '그래',
                    callback: function (response, convo) {
                        console.log('yes');
                        isNoodles = true;
                        for (let i = 0; i < menu.okSoup.okNoodles.length; i++) {
                            answer = answer + menu.okSoup.okNoodles[i] + ' ';
                        }
                        console.log(answer);
                        bot.reply(message, answer + ' 있는데 뭐드실래요 ?');
                    }
                },
                {
                    pattern: '아니',
                    callback: function (response, convo) {
                        isNoodles = false;
                        for (let i = 0; i < menu.okSoup.noNoodles.length; i++) {
                            answer = answer + menu.okSoup.noNoodles[i] + ' ';
                        }
                        console.log(answer);
                        bot.reply(message, answer + ' 있는데 뭐드실래요 ?');
                    }
                }
            ]);
            convo.activate();
        });
    };
});





controller.hears('.*', botOption, (bot, message) => {
    apiai.process(message, bot);
});
apiai.all((message, resp, bot) => {
    console.log('res', resp);
});

const actionsDefault = [
    'input.unknown',
    'input.welcome'
];

actionsDefault.forEach((action) => {
    apiai.action(action, (message, resp, bot) => {
        const respnseText = resp.result.fulfillment.speech;
        bot.reply(message, respnseText);
    });
});

apiai.action('plus', (message, resp, bot) => {
    const x = Number(resp.result.parameters.x);
    const y = Number(resp.result.parameters.y);
    const sum = x + y;

    bot.reply(message, `${sum} 입니당.`);
});

cron.schedule('0 0 12 * * *', () => {
    console.log('schedule');
    let hour = new Date().getHours();

    startLunch(hour);
}, {
    scheduled: true
});


controller.spawn({
    token: keys.botAPIToken
}).startRTM();