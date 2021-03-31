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
            console.log("team id " + i + ": " + teamsData.teams[i].id)
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
        console.log(teamInfoData.teams.abbreviation)
        let teamDisplay = $("<h1>")
        teamDisplay.text(teamInfoData.teams.name)
        $("#teamInfoBox").append(teamDisplay)
    }


    $(document).on("click", ".team-button", function() {

        
        let teamId = $(this).attr('id');
        let teamName = $(this).text()
        console.log(teamId);
        console.log(teamName);
        getTeamInfo(teamId);
        // getTeamPlayers(teamId);
    })
})