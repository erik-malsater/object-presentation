$(document).ready(function() {

    //Rensar nuvarande sökresultaten från sidan
    function clearResults(){
        $(".dialogBox").dialog("destroy");
        $(".outerContainer").empty();
    }

    function getData(tag){
        $.getJSON("http://www.flickr.com/services/feeds/photos_public.gne?tags=" + tag + "&format=json&jsoncallback=?",
        function(data){
            clearResults();
            var fetchedListOfObjects = data.items;

            //Skapar en loop som efter var tredje resultat skapar en ny "row"

            var i = 0;
            while(i < fetchedListOfObjects.length){
                var objectRow = $("<div>").addClass("objectRow");
                $(".outerContainer").append(objectRow);
    
                for(var j = 0; j < 3; j++){
                    if(i < fetchedListOfObjects.length){

                        var imageId = "image" + i;
                        var imageFrameId = "imageFrame" + i;
                        var dialogBoxId = "dialog" + i;

                        //Skapar element för dialogruta
                        var dialogBox = $("<div>").attr("id", dialogBoxId);
                        $(dialogBox).addClass("dialogBox");

                        //Lägger till bild för dialogruta
                        var dialogImage = $("<img>").attr("src", fetchedListOfObjects[i].media.m);
                        $(dialogImage).addClass("dialogImage");
                        $(dialogBox).append(dialogImage);

                        //Skapar bildelement för resultat och en ram till denna
                        var objectImage = $("<img>").attr("id", imageId);
                        $(objectImage).addClass("objectImage");
                        var objectImageFrame = $("<div>").attr("id", imageFrameId);
                        $(objectImageFrame).addClass("objectImageFrame");
                        $(objectImage).attr("src", fetchedListOfObjects[i].media.m);
                        $(objectImageFrame).append(objectImage);
                        $(objectRow).append(objectImageFrame);
                        $(objectImageFrame).append(dialogBox);

                        //Titeltext för dialogruta
                        $("<p/>",{
                            text: "Title: " + fetchedListOfObjects[i].title,
                            class: "dialogText"
                          }).appendTo(dialogBox);

                        //Inställningar för dialogruta
                        $(dialogBox).dialog({
                            autoOpen: false,
                            height: 500,
                            width: 600
                        });

                        //Klick-function för varje resultat som öppnar upp dialogruta

                        $(objectImageFrame).on("click", {id: i}, function(e){
                            $("#dialog" + e.data.id).dialog("open");
                        });
                        i++;
                    }
                }
    
            }
        }
    )};

    //Default-sökning när man öppnar sidan
    getData("coffee");

    //Sökfuntion för sök-knapp
    $("#searchButton").click(function(){
        var searchText = $("#searchText").val();
        getData(searchText);
    });

    //Toggle för alla element som har float-styling, som ändrar denna till flexbox
    $("#styleSwitch").change(function(){
        if($("input[name='styleSwitch']:checked").val() === "on"){
            $(".searchContainer").addClass("searchContainerFlexbox");
            $(".searchButton").addClass("searchButtonFlexbox");
            $(".styleSwitchContainer").addClass("styleSwitchContainerFlexbox");
            $(".styleSwitchContainerParagraph").addClass("styleSwitchContainerParagraphFlexbox");
            $(".switch").addClass("switchFlexbox");
            $(".objectRow").addClass("objectRowFlexbox");
            $(".objectImageFrame").addClass("objectImageFrameFlexbox");
        } else{
            $(".searchContainer").toggleClass("searchContainerFlexbox")
            $(".searchButton").toggleClass("searchButtonFlexbox");
            $(".styleSwitchContainer").toggleClass("styleSwitchContainerFlexbox");
            $(".styleSwitchContainerParagraph").toggleClass("styleSwitchContainerParagraphFlexbox");
            $(".switch").toggleClass("switchFlexbox");
            $(".objectRow").toggleClass("objectRowFlexbox");
            $(".objectImageFrame").toggleClass("objectImageFrameFlexbox");
        }
    });


});


