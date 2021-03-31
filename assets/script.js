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
            let teamsList = $("<button>")
            teamsList.text(teamsData.teams[i].name)
            teamsList.addClass("team-button")
            teamsList.attr("id", teamsData.teams[i].id)
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
        let teamDisplay = $("<h1>")
        teamDisplay.text(teamInfoData.teams[0].name)
        $("#teamInfoBox").append(teamDisplay)
    }
    function getTeamPlayers (teamId) {
        let playerQuery = "https://statsapi.web.nhl.com/api/v1/teams/" + teamId + "/roster";
        $.ajax({
            url: playerQuery,
            method: "GET"
        // }).then(displayPlayerInfo)
        }).then(function (res) {
            console.log(playerQuery)
            console.log(res)
            console.log(res.roster[0].person.fullName)
        })  
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