var summaryArray = [
    { position: "QB", count: 0, fpTotal2017: 0, pfpTotal2018: 0, starter: 0, passYardsTotal: 0, passTdsTotal: 0, rushYardsTotal: 0, rushTdsTotal: 0, recTotal: 0, recYardsTotal: 0, recTdsTotal: 0, turnTotal: 0, avgAge: 0, avgDyRank: 0},
    { position: "RB", count: 0, fpTotal2017: 0, pfpTotal2018: 0, starter: 0, passYardsTotal: 0, passTdsTotal: 0, rushYardsTotal: 0, rushTdsTotal: 0, recTotal: 0, recYardsTotal: 0, recTdsTotal: 0, turnTotal: 0, avgAge: 0, avgDyRank: 0},
    { position: "WR", count: 0, fpTotal2017: 0, pfpTotal2018: 0, starter: 0, passYardsTotal: 0, passTdsTotal: 0, rushYardsTotal: 0, rushTdsTotal: 0, recTotal: 0, recYardsTotal: 0, recTdsTotal: 0, turnTotal: 0, avgAge: 0, avgDyRank: 0},
    { position: "TE", count: 0, fpTotal2017: 0, pfpTotal2018: 0, starter: 0, passYardsTotal: 0, passTdsTotal: 0, rushYardsTotal: 0, rushTdsTotal: 0, recTotal: 0, recYardsTotal: 0, recTdsTotal: 0, turnTotal: 0, avgAge: 0, avgDyRank: 0},
    { position: "DST", count: 0, fpTotal2017: 0, pfpTotal2018: 0, starter: 0, passYardsTotal: 0, passTdsTotal: 0, rushYardsTotal: 0, rushTdsTotal: 0, recTotal: 0, recYardsTotal: 0, recTdsTotal: 0, turnTotal: 0, avgAge: 0, avgDyRank: 0},
    { position: "All", count: 0, fpTotal2017: 0, pfpTotal2018: 0, starter: 0, passYardsTotal: 0, passTdsTotal: 0, rushYardsTotal: 0, rushTdsTotal: 0, recTotal: 0, recYardsTotal: 0, recTdsTotal: 0, turnTotal: 0, avgAge: 0, avgDyRank: 0, projFppg: 0}
];

app.controller('dataCtrl', function($scope, FaaDataFactory) {
    // d3.select("body")
    // .append("svg")
    //     .attr("width", 100)
    //     .attr("height", 100)
    // .append("circle")
    //     .attr("cx", 50)
    //     .attr("cy", 50)
    //     .attr("r", 50)
    //     .style("fill","purple");
    $scope.holders = [];

    // $scope.dataHasLoaded = false;
    // /***************************/
    // /*   Service Types         */
    // /***************************/
    // $scope.serviceTypes = {
    //     model: null,
    //     availableOptions: [{
    //             id: '1',
    //             name: 'All Service Types'
    //         },
    //         {
    //             id: '2',
    //             name: 'User Service Request'
    //         },
    //         {
    //             id: '3',
    //             name: 'User Service Restoration'
    //         }
    //     ]
    // };
    // /***************************/
    // /*         Groups          */
    // /***************************/
    // $scope.groups = {
    //     model: null,
    //     availableOptions: [{
    //             name: 'All Groups',
    //             id: 'All'
    //         },
    //         {
    //             name: 'Procurement',
    //             id: 'EBS-APPL2PROC'
    //         },
    //         {
    //             name: 'Order Fulfillment',
    //             id: 'EBS-APPL2ORDF'
    //         },
    //         {
    //             name: 'Planning',
    //             id: 'EBS-APPL2PLN'
    //         },
    //         {
    //             name: 'Finance',
    //             id: 'EBS-APPL2FIN'
    //         },
    //         {
    //             name: 'Tech Quality',
    //             id: 'EBS-APPL2QLT'
    //         }
    //     ]
    // };
    // /*************************************/
    // /*         Incident Objects          */
    // /*************************************/
    // /* Open Incident */
    function Holder(ownerID, owner, rosterID, player, team, position, age, dynastyRank, passYards, passTds, rushYards, rushTds, receptions, recYards, recTds, turnovers, fp2017, pfp2018) {//idoc, category, assigned, region, regionalRS, hqrs, contractNum, lineItem, shipDate, trackNum, shipPlant, quantity, material, uom, penaltyDays, payTerms, invoiceDate, invoiceNum) {
        
        this.ownerID = ownerID;
        this.owner = owner;
        this.rosterID = rosterID;
        this.player = player;
        this.team = team;
        this.position = position;
        this.age = age;
        this.dynastyRank = dynastyRank;
        this.passYards = passYards;
        this.passTds = passTds;
        this.rushYards = rushYards;
        this.rushTds = rushTds;
        this.receptions = receptions;
        this.recYards = recYards;
        this.recTds = recTds;
        this.turnovers = turnovers;
        this.fp2017 = fp2017;
        this.pfp2018 = pfp2018;
    }

    // /******************************************/
    // /*          DATA FACTORIES                */
    // /******************************************/

    FaaDataFactory.then(function(data) {
        for (var i=1; i < data.length - 1; i++) {
            var ownerID = data[i][0];
            var owner = data[i][1];
            var rosterID = data[i][2];
            var player = data[i][3];
            var team = data[i][4];
            var position = data[i][5];
            var age = data[i][6];
            var dynastyRank = data[i][7];
            var passYards = data[i][8];
            var passTds = data[i][9];
            var rushYards = data[i][10];
            var rushTds = data[i][11];
            var receptions = data[i][12];
            var recYards = data[i][13];
            var recTds = data[i][14];
            var turnovers = data[i][15];
            var fp2017 = data[i][16];
            var pfp2018 = data[i][17];
            // { position: "QB", count: 0, fpTotal2017: 0, pfpTotal2018: 0, starter: 0, passYardsTotal: 0, passTdsTotal: 0, rushYardsTotal: 0, rushTdsTotal: 0, recTotal: 0, recYardsTotal: 0, recTdsTotal: 0, turnTotal: 0, avgAge: 0, avgDyRank: 0},

            // var qbCount = 
            $scope.holders.push(new Holder(ownerID, owner, rosterID, player, team, position, age, dynastyRank, passYards, passTds, rushYards, rushTds, receptions, recYards, recTds, turnovers, fp2017, pfp2018));
        }
        console.log($scope.holders);
    });
        
    // });
    // /******************************************/
    // /*          OPEN INCIDENTS                */
    // /******************************************/
    // RTOpenDataFactory.then(function(data) {

    //     for (var i = 1; i < data.length - 1; i++) {
    //         var incident = data[i];

    //         var id = incident[Incident_ID];
    //         var summary = incident[Summary];
    //         var status = incident[Status];
    //         var priority = incident[Priority];
    //         var serviceType = incident[Service_Type];
    //         var assignedGroup = incident[Assigned_Group];
    //         var assignee = incident[Assignee];
    //         var reportedDate = incident[Reported_Date];
    //         var createDate = incident[Create_Date];
    //         var lastResolvedDate = incident[Last_Resolved_Date];
    //         var closedDate = incident[Closed_Date];

    //         var entry = new openIncident(id, summary, status, priority, serviceType, assignedGroup, assignee, reportedDate, createDate, lastResolvedDate, closedDate);

    //         $scope.openIncidents.push(entry);
    //     }

    //     //console.log($scope.openIncidents);
    //     $scope.serviceTypeModel = "All Service Types";
    //     $scope.groupModel = "All Groups";
    //     /* creating open incidents storage */
    //     $scope.refreshOpen = $scope.openIncidents;


    //     /*
    //      *   Watch for the filters
    //      */
    //     $scope.$watchGroup(['serviceTypeModel', 'groupModel'], function(newValue, oldValue) {
    //         //console.log("<<OPEN>>");
    //         /* sets variable for filters from view */
    //         var servicetype = newValue[0];
    //         var assignedgroup = newValue[1];

    //         //console.log(servicetype + ":::" + assignedgroup);
    //         /* sets filtered data to the openIncidents array initially or from previous filter */
    //         var filteredData = $scope.openIncidents;

    //         /* Servie Type Filter */
    //         filteredData = serviceTypeFilter.servicetypefilter(servicetype, $scope.openIncidents, $scope.refreshOpen);
    //         // sets the openIncidents array to the filtered data
    //         $scope.openIncidents = filteredData;

    //         /* Group Filter */
    //         filteredData = groupFilter.groupfilter(assignedgroup, $scope.openIncidents, $scope.refreshOpen);
    //         // sets the openIncidents array to the filtered data
    //         $scope.openIncidents = filteredData;

    //         //console.log(filteredData);

    //         /* Setting the openMap array for the directive/chart */
    //         $scope.openMap = [];

    //         for (var i = 0; i < $scope.openIncidents.length; i++) {
    //             var item = $scope.openIncidents[i];
    //             var tempStr = item.reportedDate.split(" ");
    //             if ((new Date(tempStr[0]) >= new Date("11 / 15 / 2016")) && (new Date(tempStr[0]) <= new Date("11 / 21 / 2016"))) {

    //                 dataCalculator.incrementCount(tempStr[0], $scope.openMap);
    //             }
    //         }
    //     });
    // });


    // /******************************************/
    // /*          CLOSED INCIDENTS              */
    // /******************************************/
    // RTClosedDataFactory.then(function(data) {

    //     for (var i = 0; i < data.length - 1; i++) {
    //         var incident = data[i];

    //         var id = incident[Incident_ID];
    //         var summary = incident[Summary];
    //         var status = incident[Status];
    //         var priority = incident[Priority];
    //         var serviceType = incident[Service_Type];
    //         var assignedGroup = incident[Assigned_Group];
    //         var assignee = incident[Assignee];
    //         var reportedDate = incident[Reported_Date];
    //         var createDate = incident[Create_Date];
    //         var lastResolvedDate = incident[Last_Resolved_Date];
    //         var closedDate = incident[Closed_Date];

    //         var entry = new closedIncident(id, summary, status, priority, serviceType, assignedGroup, assignee, reportedDate, createDate, lastResolvedDate, closedDate);

    //         $scope.closedIncidents.push(entry);
    //     }
    //     //console.log($scope.closedIncidents);

    //     /* creating closed incidents storage */
    //     $scope.refreshClosed = $scope.closedIncidents;

    //     /*
    //      *   Watch for the filters
    //      */
    //     $scope.$watchGroup(['serviceTypeModel', 'groupModel'], function(newValue, oldValue) {
    //         //console.log("<<CLOSED>>");
    //         /* sets variable for filters from view */
    //         var servicetype = newValue[0];
    //         var assignedgroup = newValue[1];

    //         //console.log(servicetype + ":::" + assignedgroup);
    //         /* sets filtered data to the openIncidents array initially or from previous filter */
    //         var filteredData = $scope.closedIncidents;

    //         /* Servie Type Filter */
    //         filteredData = serviceTypeFilter.servicetypefilter(servicetype, $scope.closedIncidents, $scope.refreshClosed);
    //         // sets the closedIncidents array to the filtered data
    //         $scope.closedIncidents = filteredData;

    //         /* Group Filter */
    //         filteredData = groupFilter.groupfilter(assignedgroup, $scope.closedIncidents, $scope.refreshClosed);
    //         // sets the closedIncidents array to the filtered data
    //         $scope.closedIncidents = filteredData;

    //         //console.log(filteredData);

    //         /* Setting the openMap array for the directive/chart */
    //         $scope.closedMap = [];

    //         for (var i = 0; i < $scope.closedIncidents.length; i++) {
    //             var item = $scope.closedIncidents[i];
    //             var tempStr = item.lastResolvedDate.split(" ");
    //             if ((new Date(tempStr[0]) >= new Date("11 / 15 / 2016")) && (new Date(tempStr[0]) <= new Date("11 / 21 / 2016"))) {

    //                 dataCalculator.incrementCount(tempStr[0], $scope.closedMap);
    //             }
    //         }

    //         $scope.dataHasLoaded = true;


    //     });

    // });


});