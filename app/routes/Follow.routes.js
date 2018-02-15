module.exports = function(app) {

    var controller = require('../controllers/Follow.controller.js');


    app.post('/API/Follow/FollowUser', controller.FollowUser);

    app.delete('/API/Follow/UnFollowUser/:FollowUserDBid', controller.UnFollowUser);

    app.post('/API/Follow/FollowTopic', controller.FollowTopic);

    app.delete('/API/Follow/UnFollowTopic/:FollowTopicDBid', controller.UnFollowTopic);

    app.get('/API/Follow/FollowingUsers/:UserId', controller.FollowingUsers);

    app.get('/API/Follow/UnFollowingUsers/:UserId/:UserCategoryId', controller.UnFollowingUsers);

    app.get('/API/Follow/UserFollowingUsers/:UserId', controller.UserFollowingUsers);
    
    app.get('/API/Follow/FollowingTopics/:UserId', controller.FollowingTopics);

    app.get('/API/Follow/AllFollowingTopics/:UserId', controller.AllFollowingTopics);

    app.get('/API/Follow/UnFollowingTopics/:UserId', controller.UnFollowingTopics);

    app.get('/API/Follow/DiscoverTopics/:UserId', controller.DiscoverTopics);
}