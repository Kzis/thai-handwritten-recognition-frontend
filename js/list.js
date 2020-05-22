

(function()
{
	
	var config = {
		apiKey: "AIzaSyAjMm4_TFeXCGlYCjcZwGKcdQ479EpI2Dw",
		authDomain: "thw-project.firebaseapp.com",
		databaseURL: "https://thw-project.firebaseio.com",
		storageBucket: "thw-project.appspot.com"
	};
	firebase.initializeApp(config);

    var database = firebase.database();
    var storageRef = firebase.storage().ref();

    var url = []
    var dataObj = []
    var keyList = []

	async function getUrlList(){
		
        await  database.ref('/thw/').once('value').then(function(snapshot) {
            dataObj.push(snapshot.val())
			snapshot.forEach(obj => {
                // key.push(obj.val());
                url.push(obj.val().downloadURL);
            });
            // console.log(url)
        });


        ul = document.createElement('ul');
        
        text = "<ul>";
        url.forEach(obj => {
            text += "<li>" + obj + "</li>";
        })
        text += "</ul>";
    
        document.getElementById("myItemList").innerHTML = text;

        document.getElementById("show").innerHTML = "<p>" + "Data amount : " + url.length + "</p>";
		
    }

    var deleteButton = $( "#deleteButton" );
    deleteButton.on( "click", function(){
        var databasePath = '/thw/'

        console.log("==========")
        console.log("push key")
    
        dataObj.forEach(obj => {
            Object.keys(obj).forEach(function(key) {
                keyList.push(key)
            });
        })
        // console.log(keyList)
    
        console.log("==========")
        console.log("loop")
    
        keyList.forEach( key => {
    
            console.log("==========")
            console.log(key)
    
            //Delete data
            let databaseRef = database.ref(databasePath+key);
            databaseRef.remove().then(function() {
                console.log("Delete data : " + key)
            });
    
            //Delete storage
            storageRef.child(databasePath+key).delete().then(function() {
                console.log("Delete file : " + key)
            })
        })
    });
    
    
    getUrlList()


}());