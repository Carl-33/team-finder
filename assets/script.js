

$(document).ready(function () {
    function getTeams() {
        console.log("hi")
        const queryURL = "https://statsapi.web.nhl.com/api/v1/teams/";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(displayTeams);
    }
    const buttonsHere = $("#teamButtonBox")
    getTeams();
    function displayTeams (teamsData) {
        
        for (let i = 0; i < 31; i++) {
            // team logo images
            // let teamsList = $("<img />", {  
            //     src: `./assets/logos/${teamInfoData.teams[i].abbreviation}.png`,
            //     id: teamInfoData.teams[i].id,
            //     alt: `${teamInfoData.teams[i].name} Logo`,
            //     class: "team-button"
            // });
            let teamsList = $("<button>")
            teamsList.text(teamsData.teams[i].franchise.teamName)
            teamsList.addClass("btn btn-outline-light team-button ")
            teamsList.attr("id", teamsData.teams[i].id).addClass("team-button")
            buttonsHere.append(teamsList)
        }

    }
    function getTeamInfo (teamId) {
        let teamQuery = "https://statsapi.web.nhl.com/api/v1/teams/" + teamId;
        $.ajax({
            url: teamQuery,
            method: "GET"
        }).then(displayTeamInfo)
    }
    function displayTeamInfo (teamInfoData) {
        $("#teamInfoBox").empty();
        console.log("copyright: " + teamInfoData.copyright)
        console.log("team info data " + teamInfoData.teams[0].name)
        let teamName = $("<h1>").text(teamInfoData.teams[0].name)
        $("#teamInfoBox").append(teamName)
        let teamLogo = $("<img />", {
            src: `./assets/logos/${teamInfoData.teams[0].abbreviation}.png`,
            id: teamInfoData.teams[0].id,
            alt: `${teamInfoData.teams[0].name} Logo`,
            class: 'team-logo'
        });
        $("#teamInfoBox").append(teamLogo)
        let teamWebsite = $("<a>").text(teamInfoData.teams[0].officialSiteUrl).attr({
            href: teamInfoData.teams[0].officialSiteUrl, 
            target: "_blank"
        })
        $("#teamInfoBox").append(teamWebsite)
        let foundedYear = $("<p>").text("Founded: " + teamInfoData.teams[0].firstYearOfPlay)
        $("#teamInfoBox").append(foundedYear)
        let conferenceAndDivision = $("<p>").text(teamInfoData.teams[0].conference.name + " Conference - " + teamInfoData.teams[0].division.name + " Division ")
        $("#teamInfoBox").append(conferenceAndDivision)
    }
    function getTeamPlayers (teamId) {
        let playerQuery = "https://statsapi.web.nhl.com/api/v1/teams/" + teamId + "/roster";
        $.ajax({
            url: playerQuery,
            method: "GET"
        }).then(displayPlayerInfo)  
    }
    function displayPlayerInfo (playerInfo) {

        let rosterHeader = $("<h5>").text("Team Roster")
        $('#teamInfoBox').append(rosterHeader)
        // Table is not working yet
        // let tableSpot = $("#tableHere")
        // let rosterTable = $("<table>").attr("id", "rosterTable")
        // let rosterTableRow = $("<tr>")
        // let rosterHeaderName = $("<th>").text("Name")
        // let rosterHeaderNumber = $("<th>").text("Number")
        // let rosterHeaderPosition = $("<th>").text("Position")
        // let rosterTableRowEnd = $("</tr>")
        // tableSpot.append(rosterTable)
        // tableSpot.append(rosterTableRow)
        // tableSpot.append(rosterHeaderName)
        // tableSpot.append(rosterHeaderNumber)
        // tableSpot.append(rosterHeaderPosition)
        // tableSpot.append(rosterTableRowEnd)
        for (let i = 0; i < playerInfo.roster.length; i++) {
            console.log(playerInfo.roster[i].person.fullName)
            let playerStuff = $('<p>').text("Name: " + playerInfo.roster[i].person.fullName + 
                " Number: " + playerInfo.roster[i].jerseyNumber + 
                " Position: " +  playerInfo.roster[i].position.name).attr({
                    id: playerInfo.roster[i].person.id
                }).addClass("PlayerCard")
            $('#teamInfoBox').append(playerStuff)
            // Table is not working yet
            // let playerName = $("<td>").text(playerInfo.roster[i].person.fullName)
            // let playerNumber = $("<td>").text(playerInfo.roster[i].person.jerseyNumber)
            // let playerPosition = $("<td>").text(playerInfo.roster[i].position.name)
            // tableSpot.append(rosterTableRow);
            // tableSpot.append(playerName);
            // tableSpot.append(playerNumber);
            // tableSpot.append(playerPosition); 
            // tableSpot.append(rosterTableRow);
        }
        // $("#tableHere").append(rosterTable)
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