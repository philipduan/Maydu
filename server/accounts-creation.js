import { Meteor } from 'meteor/meteor';


Meteor.startup(() => {
    console.log("HELLO");
    if(Meteor.isServer) {
     
        Accounts.onCreateUser(function(options, user) {
            console.log("OPTS: ", options);
          
            return user;
        });
    }
});
