// Slingshot.fileRestrictions( "uploadToAmazonS3", {
//     allowedFileTypes: /^image\//,
//     maxSize: 0.2 * 1024 * 1024 // 200kb
//   });

//   Slingshot.createDirective( "uploadToAmazonS3", Slingshot.S3Storage, {
//     acl: "public-read",
//     AWSAccessKeyId: Meteor.settings.AWSAccessKeyId,
//     AWSSecretAccessKey: Meteor.settings.AWSSecretAccessKey,
//     bucket: Meteor.settings.bucket,
//     region: Meteor.settings.region,
//     authorize: function () {
//         if (!this.userId) {    //Deny uploads if user is not logged in.
//           var message = "Please login before posting files";
//           throw new Meteor.Error("Login Required", message);
//         }
//         return true;
//       },
//     key: function ( file ) {
//       console.log(file);
//       let fileExtension = file.name.split(".")[1];
//       return this.userId + "." + fileExtension;
//     }

//   });
