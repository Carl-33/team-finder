
$(document).ready(function () {
    function getTeams() {
        const queryURL = "https://statsapi.web.nhl.com/api/v1/teams/";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(displayTeams).then(displayPlaceHolder);
    }
    const buttonsOne = $("#teamButtonBoxOne")
    const buttonsTwo = $("#teamButtonBoxTwo")
    const buttonsThree = $("#teamButtonBoxThree")
    const buttonsFour = $("#teamButtonBoxFour")
    getTeams();
    function displayPlaceHolder(teamsData) {
        $("#teamInfoBox").empty();
        $("#tableHere").empty();
        let NHLLogo = $("<img />", {
            src: `./assets/logos/NHL.png`,
            id: "NHL-Logo",
            alt: `NHL Logo`,
            class: 'team-logo'
        });

        $("#teamInfoBox").append(NHLLogo)
        let placeHolderText = $("<h5>").text("Welcome to the Internet Hockey Database, click on a teams logo to see team and roster information.")
        $("#tableHere").append(placeHolderText)
    }
    function displayTeams(teamsData) {
        // logo buttons on the header
        console.log(teamsData.copyright)
        for (let i = 0; i < teamsData.teams.length; i++) {
            if (teamsData.teams[i].division.name === "Metropolitan") {
                let eastList = $("<img />", {
                    src: `./assets/logos/${teamsData.teams[i].abbreviation}.png`,
                    id: teamsData.teams[i].id,
                    alt: `${teamsData.teams[i].name} Logo`,
                    class: "team-button"
                });
                buttonsOne.append(eastList)
            } else if (teamsData.teams[i].division.name === "Atlantic") {
                let northList = $("<img />", {
                    src: `./assets/logos/${teamsData.teams[i].abbreviation}.png`,
                    id: teamsData.teams[i].id,
                    alt: `${teamsData.teams[i].name} Logo`,
                    class: "team-button"
                });
                buttonsTwo.append(northList)
            } else if (teamsData.teams[i].division.name === "Central") {
                let centralList = $("<img />", {
                    src: `./assets/logos/${teamsData.teams[i].abbreviation}.png`,
                    id: teamsData.teams[i].id,
                    alt: `${teamsData.teams[i].name} Logo`,
                    class: "team-button"
                });
                buttonsThree.append(centralList)
            } else if (teamsData.teams[i].division.name === "Pacific") {
                let westList = $("<img />", {
                    src: `./assets/logos/${teamsData.teams[i].abbreviation}.png`,
                    id: teamsData.teams[i].id,
                    alt: `${teamsData.teams[i].name} Logo`,
                    class: "team-button"
                });
                buttonsFour.append(westList)
            }
        }
    }
    function getTeamInfo(teamId) {
        let teamQuery = "https://statsapi.web.nhl.com/api/v1/teams/" + teamId;
        $.ajax({
            url: teamQuery,
            method: "GET"
        }).then(displayTeamInfo)
    }
    function displayTeamInfo(teamInfoData) {
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
    function getTeamPlayers(teamId) {
        let playerQuery = "https://statsapi.web.nhl.com/api/v1/teams/" + teamId + "/roster";
        $.ajax({
            url: playerQuery,
            method: "GET"
        }).then(displayPlayerInfo)
    }
    function displayPlayerInfo(playerInfo) {
        $("#playerInfoBox").empty();
        $("#tableHere").empty();
        let rosterHeader = $("<h5>").text("Team Roster")
        $('#tableHere').append(rosterHeader)
        // Creating a season dropdown menu
        let seasonLabel = $("<label>", {
            text: "Choose a season: ",
            for: "seasonMenu"
        });
        let seasonDropdown = $("<select>", {
            name: "seasonMenu",
            id: "seasonMenu",
            onChange: "seasonChange()"
        });
        let option1 = $("<option>", {
            value: "20212022",
            text: "2021/2022"
        });
        let option2 = $("<option>", {
            value: "20202021",
            text: "2020/2021"
        });
        let option3 = $("<option>", {
            value: "20192020",
            text: "2019/2020"
        });
        let option4 = $("<option>", {
            value: "20182019",
            text: "2018/2019"
        });
        let tableSpot = $("#tableHere")
        tableSpot.append(seasonLabel)
        tableSpot.append(seasonDropdown)
        seasonDropdown.append(option1)
        seasonDropdown.append(option2)
        seasonDropdown.append(option3)
        seasonDropdown.append(option4)

        let season = seasonDropdown.val()

        console.log("season: " + season);
        // Creating the Roster Table
        let rosterTable = $("<table>", {
            id: "rosterTable",
            class: "table table-striped table-hover table-responsive"
        });
        let rosterTableHeader = $("<thead>")
        let rosterTableBody = $("<tbody>")
        let rosterHeaderName = $("<th>", {
            id: "nameHeader",
            class: "TableHeader",
            text: "Name"
        });
        let rosterHeaderNumber = $("<th>", {
            id: "numberHeader",
            class: "TableHeader",
            text: "Number"
        });
        let rosterHeaderPosition = $("<th>", {
            id: "positionHeader",
            class: "TableHeader",
            text: "Position"
        });
        let rosterHeaderGames = $("<th>", {
            id: "gamesHeader",
            class: "TableHeader",
            text: "Games"
        });
        let rosterHeaderGoals = $("<th>", {
            id: "goalsHeader",
            class: "TableHeader",
            text: "Goals"
        });
        let rosterHeaderAssists = $("<th>", {
            id: "assistsHeader",
            class: "TableHeader",
            text: "Assists"
        });
        rosterTable.append(rosterTableHeader)
        rosterTableHeader.append(rosterHeaderName)
        rosterTableHeader.append(rosterHeaderNumber)
        rosterTableHeader.append(rosterHeaderPosition)
        rosterTableHeader.append(rosterHeaderGames)
        rosterTableHeader.append(rosterHeaderGoals)
        rosterTableHeader.append(rosterHeaderAssists)
        rosterTable.append(rosterTableBody)
        for (let i = 0; i < playerInfo.roster.length; i++) {
            let playerId = playerInfo.roster[i].person.id
            function getPlayerStats(playerId) {
                let statsQuery = "https://statsapi.web.nhl.com/api/v1/people/" + playerId + "/stats?stats=statsSingleSeason&season=" + season
                // console.log(`url: ${statsQuery}` )
                $.ajax({
                    url: statsQuery,
                    method: "GET"
                }).then(displayStats)
            }

            let rosterTableRow = $("<tr>").attr("id", playerInfo.roster[i].person.fullName + " info")
            let playerName = $("<td>", {
                class: "nameCell",
                text: playerInfo.roster[i].person.fullName
            });
            let playerNumber = $("<td>", {
                class: "numberCell",
                text: playerInfo.roster[i].jerseyNumber
            });
            let playerPosition = $("<td>", {
                class: "positionCell",
                text: playerInfo.roster[i].position.name
            });
            rosterTableBody.append(rosterTableRow);
            rosterTableRow.append(playerName);
            rosterTableRow.append(playerNumber);
            rosterTableRow.append(playerPosition);
            getPlayerStats(playerId);
            function displayStats(playerStats) {
                let gamesText = (playerStats.stats[0].splits.length == 0) ? "0" : (playerStats.stats[0].splits[0].stat.games == undefined) ? "0" : playerStats.stats[0].splits[0].stat.games
                let goalsText = (playerStats.stats[0].splits.length == 0) ? "0" : (playerStats.stats[0].splits[0].stat.goals == undefined) ? "0" : playerStats.stats[0].splits[0].stat.goals
                let assistsText = (playerStats.stats[0].splits.length == 0) ? "0" : (playerStats.stats[0].splits[0].stat.assists == undefined) ? "0" : playerStats.stats[0].splits[0].stat.assists
                let playerGames = $("<td>", {
                    class: "gamesCell",
                    text: gamesText
                });
                let playerGoals = $("<td>", {
                    class: "goalsCell",
                    text: goalsText
                })
                let playerAssists = $("<td>", {
                    class: "assistsCell",
                    text: assistsText
                })
                rosterTableRow.append(playerGames);
                rosterTableRow.append(playerGoals);
                rosterTableRow.append(playerAssists);

            }
            rosterTableBody.append(rosterTableRow)


            tableSpot.append(rosterTable)
        };
    };
    $(document).on("click", ".team-button", function () {
        let teamId = $(this).attr('id');
        let teamName = $(this).text()
        console.log(teamId);
        console.log(teamName);
        getTeamInfo(teamId);
        getTeamPlayers(teamId);
    })
    $(document).on("click", ".header-text", function () {
        displayPlaceHolder();
    })
})


// function for changing the season... doesn't quite work yet.
function seasonChange() {
    console.log("season change ran")
    // season = seasonDropdown.val();
    // console.log("new season: " + season)
}