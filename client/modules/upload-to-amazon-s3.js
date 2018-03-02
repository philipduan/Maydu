

let upload = file => {
    console.log("UPLOADING: ", file);
    console.log("SeTTINGS" , Meteor.settings);
    const uploader = new Slingshot.Upload("uploadToAmazonS3");
    uploader.send(file, (error, url) => {
        if(error) {
            console.log("Error uploading to S3: ", error);
        } else {
            console.log("Uploader.send: no error");
            Meteor.users.update(Meteor.userId(), {imageURL: url});
        }
    })
}




Modules.client.uploadToAmazonS3 = upload;