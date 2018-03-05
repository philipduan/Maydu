

// let upload = file => {
//     const uploader = new Slingshot.Upload("uploadToAmazonS3");
//     uploader.send(file, (error, url) => {
//         if(error) {
//             console.log("Error uploading to S3: ", error);
//         } else {
//             Meteor.users.update(Meteor.userId(), {imageURL: url});
//         }
//     })
// }




// Modules.client.uploadToAmazonS3 = upload;