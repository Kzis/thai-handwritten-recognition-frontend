

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

	async function getUrlList(){
		var url = []
        await  database.ref('/thw/').once('value').then(function(snapshot) {
			snapshot.forEach(obj => {
				url.push(obj.val().downloadURL);
            });
            console.log(url)
        });


        ul = document.createElement('ul');
        
        text = "<ul>";
        url.forEach(obj => {
            text += "<li>" + obj + "</li>";
        })
        text += "</ul>";
    
        document.getElementById("myItemList").innerHTML = text;
		
    }
    
    
    getUrlList()


}());