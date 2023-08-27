

    function capture()
    {
        Webcam.snap(function(data_uri) {
            document.getElementById("captured").innerHTML = '<img id = "captured_image" src = "'+data_uri+'"/>';
        })
    }

    console.log("ml5 version:", ml5.version);

    classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/zC25_0iYC/model.json", modelLoaded);

    function modelLoaded()
    {
        console.log("model loaded");
    }

   

    function speak()
    {
        var synth = window.speechSynthesis;
        speak_data_1 = "The first prediction is " + prediction1;
        speak_data_2 = "And the second prediction is " + prediction2;
        var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
        synth.speak(utterThis);
    }

    function identify()
    {
        img = document.getElementById("captured")
        classifier.classify(img, gotResult);
    }

    function gotResult(error, results)
    {
        if (error) {
            console.error(error);
        } else {
            console.log(results);
            document.getElementById("gesture1").innerHTML = results[0].label;
            document.getElementById("gesture2").innerHTML = results[1].label;
            prediction1 = results[0].label;
            prediction2 = results[0].label;
            speak()
            if(results[0].label == "good")
            {
                document.getElementById("gesture1_emoji").innerHTML = "&#128077";
            }
            if(results[0].label == "bad")
            {
                document.getElementById("gesture1_emoji").innerHTML = "&#128078";
            }
            if(results[0].label == "ok")
            {
                document.getElementById("gesture1_emoji").innerHTML = "&#128076";
            }

            if(results[1].label == "good")
            {
                document.getElementById("gesture2_emoji").innerHTML = "&#128077";
            }
            if(results[1].label == "bad")
            {
                document.getElementById("gesture2_emoji").innerHTML = "&#128078";
            }
            if(results[1].label == "ok")
            {
                document.getElementById("gesture2_emoji").innerHTML = "&#128078";
            }
        }
    }