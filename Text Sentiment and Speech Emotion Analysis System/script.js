/* =========================================
   SENTIO AI
   JAVASCRIPT
========================================= */


/* =========================================
   SCROLL TO ANALYZER
========================================= */

function scrollToAnalyzer() {

    document
        .getElementById("analyzer")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =========================================
   CHARACTER COUNT
========================================= */

const textInput = document.getElementById("textInput");
const characterCount = document.getElementById("characterCount");

textInput.addEventListener("input", function () {

    const count = textInput.value.length;

    characterCount.textContent =
        `${count} characters`;

});


/* =========================================
   TEXT SENTIMENT ANALYSIS
========================================= */

function analyzeText() {

    const text = textInput.value.trim();

    if (text === "") {

        alert("Please enter some text first.");

        return;
    }


    const positiveWords = [
        "happy",
        "good",
        "great",
        "excellent",
        "amazing",
        "love",
        "wonderful",
        "awesome",
        "fantastic",
        "best",
        "success",
        "beautiful",
        "enjoy",
        "thank",
        "thanks"
    ];


    const negativeWords = [
        "bad",
        "sad",
        "hate",
        "angry",
        "terrible",
        "worst",
        "poor",
        "horrible",
        "failure",
        "disappointed",
        "problem",
        "pain",
        "upset",
        "boring"
    ];


    const words = text
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .split(/\s+/);


    let positiveScore = 0;
    let negativeScore = 0;


    words.forEach(word => {

        if (positiveWords.includes(word)) {
            positiveScore++;
        }

        if (negativeWords.includes(word)) {
            negativeScore++;
        }

    });


    let sentiment;
    let emoji;
    let confidence;


    if (positiveScore > negativeScore) {

        sentiment = "Positive";
        emoji = "😊";

        confidence =
            Math.min(
                95,
                70 + positiveScore * 5
            );

    }

    else if (negativeScore > positiveScore) {

        sentiment = "Negative";
        emoji = "😔";

        confidence =
            Math.min(
                95,
                70 + negativeScore * 5
            );

    }

    else {

        sentiment = "Neutral";
        emoji = "😐";

        confidence = 76;

    }


    document.getElementById("sentimentText")
        .textContent = sentiment;

    document.getElementById("textEmoji")
        .textContent = emoji;

    document.getElementById("textConfidence")
        .textContent = confidence + "%";


    setTimeout(() => {

        document.getElementById("textProgress")
            .style.width = confidence + "%";

    }, 100);

}


/* =========================================
   AUDIO FILE UPLOAD
========================================= */

const audioFile =
    document.getElementById("audioFile");

audioFile.addEventListener("change", function () {

    if (audioFile.files.length > 0) {

        const file =
            audioFile.files[0];

        document.getElementById("fileName")
            .textContent =
            file.name;


        simulateSpeechAnalysis();

    }

});


/* =========================================
   SPEECH ANALYSIS DEMO
========================================= */

function simulateSpeechAnalysis() {

    const emotions = [

        {
            name: "Happy",
            emoji: "😊",
            confidence: 88
        },

        {
            name: "Calm",
            emoji: "😌",
            confidence: 82
        },

        {
            name: "Excited",
            emoji: "🤩",
            confidence: 91
        },

        {
            name: "Neutral",
            emoji: "😐",
            confidence: 76
        }

    ];


    const result =
        emotions[
            Math.floor(
                Math.random() * emotions.length
            )
        ];


    document.getElementById("emotionText")
        .textContent = result.name;

    document.getElementById("speechEmoji")
        .textContent = result.emoji;

    document.getElementById("speechConfidence")
        .textContent =
        result.confidence + "%";


    setTimeout(() => {

        document.getElementById("speechProgress")
            .style.width =
            result.confidence + "%";

    }, 100);

}


/* =========================================
   MICROPHONE RECORDING
========================================= */

let isRecording = false;

let mediaRecorder;

let audioChunks = [];


async function toggleRecording() {

    const button =
        document.getElementById("recordButton");


    if (!isRecording) {

        try {

            const stream =
                await navigator.mediaDevices
                    .getUserMedia({
                        audio: true
                    });


            mediaRecorder =
                new MediaRecorder(stream);


            audioChunks = [];


            mediaRecorder.ondataavailable =
                function (event) {

                    audioChunks.push(
                        event.data
                    );

                };


            mediaRecorder.onstop =
                function () {

                    stream
                        .getTracks()
                        .forEach(
                            track =>
                                track.stop()
                        );

                    simulateSpeechAnalysis();

                };


            mediaRecorder.start();

            isRecording = true;

            button.innerHTML =
                "<span>■</span> Stop Recording";


            button.style.borderColor =
                "#ef4444";

        }

        catch (error) {

            alert(
                "Microphone permission is required."
            );

        }

    }

    else {

        mediaRecorder.stop();

        isRecording = false;

        button.innerHTML =
            "<span>●</span> Start Voice Recording";

        button.style.borderColor = "";

    }

}


/* =========================================
   DEMO BUTTON
========================================= */

function showDemo() {

    alert(
        "SentioAI analyzes written text for sentiment and audio for emotional patterns. In a production version, machine-learning models can be connected to this interface."
    );

}