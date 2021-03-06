var mongoose = require('mongoose')  
    , Schema = mongoose.Schema  
    , ObjectId = Schema.ObjectId;
var autoinc  = require('mongoose-id-autoinc');
var ReplySchema = new Schema({  
    email: { type: String },
    nick: { type: String },
    website: { type: String },
    content: { type: String },
    articleID: { type: Number },
    replyWhoID: { type: Number },
    replyWhoNick: { type: String },
    replyWhoWebsite: { type: String },
    replyFloor: { type: Number },
    isPass: { type: Number, default: 1 },
    userID: { type: String, default: '' },
    replyTime: { type: Date, default: Date.now }
});

ReplySchema.plugin(autoinc.plugin, {
    model: 'Reply',
    field: 'replyID',
    start: 1,
    step: 1
});
ReplySchema.statics.findRecentExecptAdmin = function (admin, callback) {
    return this.model('Reply')
        .find({ articleID: { '$nin': [ admin ] } })
        .sort({ replyTime: -1 })
        .exec(function (error, doc) {
            if (error) {
                console.log(error);
                callback([]);
            } else {
                callback(doc);
            }
        });
}
ReplySchema.statics.findByArticleID = function(id, callback) {
    return this.model('Reply')
        .find({ articleID: id })
        .sort({ replyID: 1})
        .exec(function (error, doc) {
            if (error) {
                console.log(error);
                callback(null);
            } else {
                callback(doc);
            }
        });
}
module.exports = mongoose.model('Reply', ReplySchema); 