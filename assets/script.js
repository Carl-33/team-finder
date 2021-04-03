

$(document).ready(function () {
    function getTeams() {
        console.log("hi")
        const queryURL = "https://statsapi.web.nhl.com/api/v1/teams/";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(displayTeams);
    }
    const buttonsOne = $("#teamButtonBoxOne")
    const buttonsTwo = $("#teamButtonBoxTwo")
    const buttonsThree = $("#teamButtonBoxThree")
    const buttonsFour = $("#teamButtonBoxFour")
    getTeams();
    function displayTeams (teamsData) {
        // logo buttons on the header
        for (let i = 0; i < teamsData.teams.length; i++) {
        if (teamsData.teams[i].division.name === "MassMutual East") {
            let eastList = $("<img />", {  
                src: `./assets/logos/${teamsData.teams[i].abbreviation}.png`,
                id: teamsData.teams[i].id,
                alt: `${teamsData.teams[i].name} Logo`,
                class: "team-button"
            });
            buttonsOne.append(eastList)
        } else if (teamsData.teams[i].division.name === "Scotia North") {
            let northList = $("<img />", {  
                src: `./assets/logos/${teamsData.teams[i].abbreviation}.png`,
                id: teamsData.teams[i].id,
                alt: `${teamsData.teams[i].name} Logo`,
                class: "team-button"
            });
            buttonsTwo.append(northList)
        } else if (teamsData.teams[i].division.name === "Discover Central") {
            let centralList = $("<img />", {  
                src: `./assets/logos/${teamsData.teams[i].abbreviation}.png`,
                id: teamsData.teams[i].id,
                alt: `${teamsData.teams[i].name} Logo`,
                class: "team-button"
            });
            buttonsThree.append(centralList)
        } else if (teamsData.teams[i].division.name === "Honda West") {
            let westList = $("<img />", {  
                src: `./assets/logos/${teamsData.teams[i].abbreviation}.png`,
                id: teamsData.teams[i].id,
                alt: `${teamsData.teams[i].name} Logo`,
                class: "team-button"
            });
            buttonsFour.append(westList)
        }
    }
        // for (let i = 0; i < 31; i++) {
        //     // team logo images
        //     let teamsList = $("<img />", {  
        //         src: `./assets/logos/${teamsData.teams[i].abbreviation}.png`,
        //         id: teamsData.teams[i].id,
        //         alt: `${teamsData.teams[i].name} Logo`,
        //         class: "team-button"
        //     });
        //     buttonsHere.append(teamsList)
        // }
    }
    function getTeamInfo (teamId) {
        let teamQuery = "https://statsapi.web.nhl.com/api/v1/teams/" + teamId;
        $.ajax({
            url: teamQuery,
            method: "GET"
        }).then(displayTeamInfo)
    }
    function displayTeamInfo (teamInfoData) {
        let teamName = $("<h1>").text(teamInfoData.teams[0].name)
        let teamLogo = $("<img />", {
            src: `./assets/logos/${teamInfoData.teams[0].abbreviation}.png`,
            id: teamInfoData.teams[0].id,
            alt: `${teamInfoData.teams[0].name} Logo`,
            class: 'team-logo'
        });
        let teamWebsite = $("<a>").text(teamInfoData.teams[0].officialSiteUrl).attr({
            href: teamInfoData.teams[0].officialSiteUrl, 
            target: "_blank"
        })
        let foundedYear = $("<p>").text("Founded: " + teamInfoData.teams[0].firstYearOfPlay)
        let conferenceAndDivision = $("<p>").text(teamInfoData.teams[0].division.name + " Division ")
        let venue = $("<p>").text("Home Venue: " + teamInfoData.teams[0].venue.name)
        $("#teamInfoBox").empty();
        $("#teamInfoBox").append(teamLogo)
        $("#teamInfoBox").append(teamName)
        $("#teamInfoBox").append(teamWebsite)
        $("#teamInfoBox").append(foundedYear)
        $("#teamInfoBox").append(conferenceAndDivision)
        $("#teamInfoBox").append(venue)
    }
    function getTeamPlayers (teamId) {
        let playerQuery = "https://statsapi.web.nhl.com/api/v1/teams/" + teamId + "/roster";
        $.ajax({
            url: playerQuery,
            method: "GET"
        }).then(displayPlayerInfo)  
    }
    function displayPlayerInfo (playerInfo) {
        $("#playerInfoBox").empty();
        let rosterHeader = $("<h5>").text("Team Roster")
        $('#playerInfoBox').append(rosterHeader)
        // // Table is not working yet
        // let tableSpot = $("#tableHere")
        // let rosterTable = $("<table>").attr("id", "rosterTable")
        // let rosterTableRow = $("<tr>")
        // let rosterHeaderName = $("<th>").text("Name")
        // let rosterHeaderNumber = $("<th>").text("Number")
        // let rosterHeaderPosition = $("<th>").text("Position")
        // let rosterTableRowEnd = $("</tr>")

        // rosterTable.append(rosterTableRow)
        // rosterTable.append(rosterHeaderName)
        // rosterTable.append(rosterHeaderNumber)
        // rosterTable.append(rosterHeaderPosition)
        // rosterTable.append(rosterTableRowEnd)
        for (let i = 0; i < playerInfo.roster.length; i++) {
            console.log(playerInfo.roster[i].person.fullName)
            let playerStuff = $('<p>').text("Name: " + playerInfo.roster[i].person.fullName + 
                " Number: " + playerInfo.roster[i].jerseyNumber + 
                " Position: " +  playerInfo.roster[i].position.name).attr({
                    id: playerInfo.roster[i].person.id
                }).addClass("PlayerCard")
            $('#playerInfoBox').append(playerStuff)
            // Table is not working yet
            // let playerName = $("<td>").text(playerInfo.roster[i].person.fullName)
            // let playerNumber = $("<td>").text(playerInfo.roster[i].person.jerseyNumber)
            // let playerPosition = $("<td>").text(playerInfo.roster[i].position.name)
            // rosterTable.append(rosterTableRow);
            // rosterTable.append(playerName);
            // rosterTable.append(playerNumber);
            // rosterTable.append(playerPosition); 
        }
        tableSpot.append(rosterTable)
    }
    $(document).on("click", ".team-button", function() { 
        let teamId = $(this).attr('id');
        let teamName = $(this).text()
        console.log(teamId);
        console.log(teamName);
        getTeamInfo(teamId);
        getTeamPlayers(teamId);
    })
})