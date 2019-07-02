const PouchDBStore = require('../pouchDB/PouchDBStore');
const {createCollection} = require('../pouchDB/pouchdb');
const inversify = require('inversify');
require('reflect-metadata');
const {Airgram, AuthDialog, TYPES} = require('airgram');
const {prompt, getCalleeName} = require('airgram/helpers');
const {DebugLogger} = require('airgram-debug');
let firstRequest = true;
const channels = require('../channels/Channels');
let channelData = null;

// process.env.phone_code = req.params.code;
// setInterval(()=> {
//     if (process.env.phone_code) {
//
//     }
// }, 1000)
module.exports.getTelegram = async (req, res) => {
    try {
    const link = req.query.link;
    const airgram = new Airgram({id: process.env.APP_ID, hash: process.env.APP_HASH});

// Logger
    airgram.bind(TYPES.Logger).to(DebugLogger).onActivation((context, logger) => {
        logger.namespace = [getCalleeName(context)];
        logger.level = 'verbose';
        return logger
    });
// Mount PouchDB store
    const collection = createCollection('airgramdbss');

    function mountCollection(context, store) {
        store.collection = collection;
        return store
    }

    function airgramBind() {
        airgram.bind(TYPES.AuthStore).to(PouchDBStore).onActivation(mountCollection);
        airgram.bind(TYPES.MtpStateStore).to(PouchDBStore).onActivation(mountCollection);
    }

    if (firstRequest) {
        inversify.decorate(inversify.injectable(), PouchDBStore);
        airgramBind()
    } else {
        airgramBind()
    }

// Authorization
        /*
        * let interval = null;
        *
        * inside code callback
        * interval = setInterval(()=>{
        *   here checking DB
        *
        * },3000)
        * */

    // airgram.use(airgram.auth);
    airgram.auth.use(
        // {
        //     phoneNumber: '+1234567890',
        //     firstName: 'John',
        //     lastName: 'Smith',
        //     code: ''
        // }
        new AuthDialog({
        samePhoneNumber: () => false,
        phoneNumber: () => process.env.PHONE_NUMBER || prompt(`Please enter your phone number:\n`),
        code: () => process.env.phone_code
    })
    );

// Updates
    airgram.use(airgram.updates);
    airgram.updates.use(({update}, next) => {
        // console.log(`"${update._}" ${JSON.stringify(update)}`);
        return next();
    });


//parse data from channels
    airgram.auth.login().then(async () => {

        let messageArray = [];
// Start long polling
        await airgram.updates.startPolling();

// Get dialogs history
        let arr = [];

        arr.push(channels);
        arr.forEach((i) => {
            i.forEach((i) => {
                if (i.username === link) {
                    channelData = {
                        access_hash: i.access_hash,
                        id: i.id
                    };
                }
            });
        });
        if (channelData !== null) {
            const dialogs = await airgram.client.messages.getHistory({
                peer: {_: 'inputPeerChannel', channel_id: channelData.id, access_hash: channelData.access_hash},
                // peer: {_: 'inputPeerChannel', channel_id: 1234108910, access_hash: '1239079337980888612'},
                offset: 0,
                limit: 200,
                max_id: 10000000000,
                min_id: 0
            })
                .catch((e) => {
                    if (e.message === 'CODE#400 CHANNEL_INVALID') {
                        res.send(e.message)
                    }
                });

// push messages and authors
            dialogs.messages.forEach((item) => {
                let message = {};
                dialogs.users.forEach((i) => {
                    if (i.id === item.from_id) {
                        message.user = {
                            id: i.id,
                            access_hash: i.access_hash,
                            first_name: i.first_name,
                            last_name: i.last_name,
                            username: i.username,
                            photo: i.photo,
                        };
                    }
                });

                message.item = {
                    id: item.id,
                    message: item.message,
                    from_id: item.from_id,
                    reply_to_msg_id: item.reply_to_msg_id,
                    date: item.date,
                    // media: item.media
                };

                messageArray.push(message)
            });
            res.send(messageArray);
            firstRequest = false;
        }
        })
    }catch(err){
        res.status(500).send(err);
    }
};
