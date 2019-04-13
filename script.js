$(function () {

    // Initialize rivescript
    var bot = new RiveScript();

    // Load rivescript file and check for errors
    bot.loadFile("brain.rive").then(brainReady).catch(brainError);

    // Display on the console if bot is ready
    function brainReady() {
        console.log("The supreme chat intelligence is ready to talk");
        bot.sortReplies();
        var num = Math.floor((Math.random() * 100) + 1);
        console.log(num);
        var reply = bot.reply("local-user", "set " + num);
        defaultDino();
    }

    // Display on console if bot has errors
    function brainError() {
        console.log("The supreme chat intelligence has encountered an error");
    }

    var userInput;
    var replyBot;
    var currentBot = "dinobot";

    function defaultSettings() {
        var creature;
        if (currentBot == "octobot") {
            creature = "octoPunos";
        } else if (currentBot == "octoLumino") {
            creature = "octoLuminoPunos";
        } else if (currentBot == "octoElectrico") {
            creature = "octoElectricoPunos";
        } else if (currentBot == "dinobot") {
            creature = "buenaGente";
        } else if (currentBot == "dinoRojo") {
            creature = "dinoRojoAndando";
        } else if (currentBot == "dinoFuego") {
            creature = "dinoFuegoAndando";
        } else if (currentBot == "sharkbot") {
            creature = "sharkSwim";
        } else if (currentBot == "sharkMad") {
            creature = "sharkMadSwim";
        } else if (currentBot == "sharkAngry") {
            creature = "sharkAngryTeeth";
        }

        var dinoCard = '<img src="art/' + creature + '.gif" class="card-img-top" alt="...">';
        $("#dinoCard").html("");
        $("#dinoCard").append(dinoCard);
    }

    $(".create-form").on("submit", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();

        var inputName = $("#ca").val().trim();
        userInput = inputName;
        $("#ca").val("");
        // Send what the user said to the bot
        var reply = bot.reply("local-user", userInput);

        // Use the .then function to access the value inside the promise
        // If u dont use .then, reply will equal a promise object, instead of the bot's actual response
        reply.then(function (result) {
            console.log(result);
            replyBot = result;
            appendUserInput();
        });
    });

    $("#feed").click(function () {
        event.preventDefault();
        var haveFood;
        switch (currentBot) {
            case "octobot":
                haveFood = "+1 Garlic bread ball"
                break;
            case "dinobot":
                haveFood = "+1 Bacon cheese-steak burger"
                break;
            case "sharkbot":
                haveFood = "1+ Samurai sushi roll"
                break;
        }

        userInput = haveFood;
        var command = "feed " + currentBot;
        var reply = bot.reply("local-user", command);

        var creature;
        if (currentBot == "octobot") {
            creature = "octoComiendo";
        } else if (currentBot == "octoLumino") {
            creature = "octoLuminoComiendo";
        } else if (currentBot == "octoElectrico") {
            creature = "octoElectricoComiendo";
        } else if (currentBot == "dinobot") {
            creature = "comiendo";
        } else if (currentBot == "dinoRojo") {
            creature = "dinoRojoComiendo";
        } else if (currentBot == "dinoFuego") {
            creature = "dinoFuegoComiendo";
        } else if (currentBot == "sharkbot") {
            creature = "sharkEat";
        } else if (currentBot == "sharkMad") {
            creature = "sharkMadEat";
        } else if (currentBot == "sharkAngry") {
            creature = "sharkAngryEat";
        }
        var dinoCard = '<img src="art/' + creature + '.gif" class="card-img-top" alt="...">';
        $("#dinoCard").html("");
        $("#dinoCard").append(dinoCard);

        reply.then(function (result) {
            console.log(result);
            replyBot = result;

            setTimeout(appendUserInput, 1250);

        });

    });

    $("#blood").click(function () {
        event.preventDefault();

        var creature;
        if (currentBot == "octobot") {
            creature = "octoLuminoComiendo";
            currentBot = "octoLumino";
            setTimeout(initShark, 50);
        } else if (currentBot == "octoLumino") {
            creature = "octoLuminoComiendo";
            currentBot = "octoElectrico";
            setTimeout(initShark, 50);
        } else if (currentBot == "dinobot") {
            creature = "comiendo";
            currentBot = "dinoRojo";
            setTimeout(initShark, 50);
        } else if (currentBot == "dinoRojo") {
            creature = "dinoRojoComiendo";
            currentBot = "dinoFuego";
            setTimeout(initShark, 50);
        } else if (currentBot == "dinoFuego") {
            creature = "dinoFuegoComiendo";
            currentBot = "dinoRojo";
        } else if (currentBot == "sharkbot") {
            creature = "sharkMadSwim";
            currentBot = "sharkMad";
            setTimeout(initShark, 50);
        } else if (currentBot == "sharkMad") {
            creature = "sharkMadEat";
            currentBot = "sharkAngry";
            setTimeout(initShark, 100);
        } else if (currentBot == "sharkAngry") {
            creature = "sharkAngryEat";
        }


        var dinoCard = '<img src="art/' + creature + '.gif" class="card-img-top" alt="...">';
        $("#dinoCard").html("");
        $("#dinoCard").append(dinoCard);
        setTimeout(defaultSettings, 1250);
    });

    function initShark() {
        var command = currentBot + " init";
        var reply = bot.reply("local-user", command);
        console.log(command);
    }

    $("#pet").click(function () {
        event.preventDefault();
        var petDino = "'You pet dinobot'";
        userInput = petDino;
        var command = "pet dinobot"
        var reply = bot.reply("local-user", command);

        reply.then(function (result) {
            console.log(result);
            replyBot = result;
            appendUserInput();
        });

    });

    $("#octobot").click(function () {
        $("#dinobot").attr('class', 'nav-link');
        $("#sharkbot").attr('class', 'nav-link');
        $("#octobot").addClass('bg-warning text-white');
        var command = "octobot init";
        var reply = bot.reply("local-user", command);
        reply.then(function (result) {
            console.log(command);
        });

        currentBot = "octobot";
        event.preventDefault();
        var dinoCard = '<img src="art/octoPunos.gif" class="card-img-top" alt="...">';
        $("#dinoCard").html("");
        $("#dinoCard").append(dinoCard);
        eraseChatBox();
    });


    $("#dinobot").click(function () {
        $("#octobot").attr('class', 'nav-link');
        $("#sharkbot").attr('class', 'nav-link');
        $("#dinobot").addClass('bg-primary text-white');

        var command = "dinobot init";
        var reply = bot.reply("local-user", command);
        reply.then(function (result) {
            console.log(command);
        });

        currentBot = "dinobot";
        eraseChatBox();
    });

    $("#sharkbot").click(function () {
        $("#dinobot").attr('class', 'nav-link');
        $("#octobot").attr('class', 'nav-link');
        $("#sharkbot").addClass('bg-success text-white');

        var command = "sharkbot init";
        var reply = bot.reply("local-user", command);
        reply.then(function (result) {
            console.log(command);
        });

        currentBot = "sharkbot";
        eraseChatBox();
    });

    function eraseChatBox() {
        $("#chatBox").html("");
        defaultSettings();
    }

    function defaultDino() {
        currentBot = "dinobot";
        defaultSettings();

        var command = "dinobot init";
        var reply = bot.reply("local-user", command);
    }



    function appendUserInput() {
        var uiCard = '<div class="alert alert-primary" role="alert">' + userInput + '</div>';
        // var dinoCard = '<img src="art/buenaGente.gif" class="card-img-top" alt="...">';
        $("#chatBox").append(uiCard);
        // $("#dinoCard").html("");
        // $("#dinoCard").append(dinoCard);
        setTimeout(appendBotRes, 1500);
        var creature;
        if (currentBot == "octobot") {
            creature = "octoHablando";
        } else if (currentBot == "octoLumino") {
            creature = "octoLuminoHablando";
        } else if (currentBot == "octoLumino") {
            creature = "octoLuminoHablando";
        } else if (currentBot == "octoElectrico") {
            creature = "octoElectricoHablando";
        } else if (currentBot == "dinobot") {
            creature = "hablando";
        } else if (currentBot == "dinoRojo") {
            creature = "dinoRojoHablando";
        } else if (currentBot == "dinoFuego") {
            creature = "dinoFuegoHablando";
        } else if (currentBot == "sharkbot") {
            creature = "sharkTalking";
        } else if (currentBot == "sharkMad") {
            creature = "sharkMadTeeth";
        } else if (currentBot == "sharkAngry") {
            creature = "sharkAngrySwim";
        }


        var talkDino = '<img src="art/' + creature + '.gif" class="card-img-top" alt="...">';

        $("#dinoCard").html("");
        $("#dinoCard").append(talkDino)

        // this is just so the robot's chat always scrolls down with any new messages
        var chatBox = $('#chatBox');
        var height = chatBox[0].scrollHeight;
        chatBox.scrollTop(height);
    }

    function appendBotRes() {
        var rbCard = '<div class="alert alert-success" role="alert">' + replyBot + '</div>';
        $("#chatBox").append(rbCard);


        // this is just so the robot's chat always scrolls down with any new messages
        var chatBox = $('#chatBox');
        var height = chatBox[0].scrollHeight;
        chatBox.scrollTop(height);
        setTimeout(defaultSettings, 2000);
    }
})