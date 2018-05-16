app.directive('barChart', function($window) {
    return {
        restrict: 'EA',
        scope: {
            openMap1: '=openData',
            closedMap1: '=closedData'
        },

        link: function(scope, elem, attrs) {

            var dates = [];

            /*
             * Watching the data to build the function
             */
            scope.$watchGroup(['openMap1', 'closedMap1'], function(newValue, oldValue) {
                var openMap = newValue[0];
                var closedMap = newValue[1];


                /*
                 * Date array for ticks
                 */
                for (var i = 0; i < openMap.length; i++) {
                    dates.push(openMap[i].Date);
                }

                /*
                 * Push all data in one map
                 */

                var allMap = [];
                if (openMap.length !== 0) {
                    for (var i = 0; i < openMap.length; i++) {
                        allMap.push({
                            'Date': openMap[i].Date,
                            'Open': openMap[i].Count,
                            'Closed': addClosed(openMap[i].Date, closedMap)
                        });
                        if (allMap[i].Closed === undefined) {
                            //console.log("Inside checking closed");
                            allMap[i].Closed = 0;
                        }
                    }
                } else if (closedMap.length !== 0) {
                    for (var i = 0; i < closedMap.length; i++) {
                        allMap.push({
                            'Date': closedMap[i].Date,
                            'Open': 0,
                            'Closed': closedMap[i].Count
                        });
                    }
                }

                if (allMap.length !== 0) {
                    var maxYValue = findMax(allMap);
                    // console.log("~~Chart Data~~");
                    // console.log(allMap);
                    //console.log(maxYValue);
                    d3.select('#incidentgroups').remove();
                    d3.select('#xAxis').remove();
                    d3.select('#yAxis').remove();
                    d3.select('#xAxisTitle').remove();
                    d3.select('#yAxisTitle').remove();
                    d3.select('#title').remove();
                    d3.select('#RTbars').remove();
                    buildChart(allMap, maxYValue);
                } else {
                    window.alert("No data available with those filters");
                    d3.select('#incidentgroups').remove();
                    d3.select('#RTbars').remove();
                }
            });

            /*
             *  function to match the closed data to the date
             */
            function addClosed(date, closedMap) {
                //console.log("Adding Closed data for " + date);
                for (var j = 0; j < closedMap.length; j++) {
                    //console.log("Inside closed loop: " + closedMap[j].Date);
                    if (closedMap[j].Date === date) {
                        //console.log("Inside if");
                        return closedMap[j].Count;
                    }
                }
            }

            /*
             * Helper function to get the max value for the height of the y axis
             */
            function findMax(allMap) {
                var numArray = [];
                for (var i = 0; i < allMap.length; i++) {
                    numArray.push(allMap[i].Open);
                    numArray.push(allMap[i].Closed);
                }

                var max = Math.max.apply(Math, numArray);

                return max;
            }

            /* 
             * Build Chart function
             */
            function buildChart(allMap, maxYValue) {;

                //console.log("Building Chart");
                var data = d3.nest()
                    .key(function(d) {
                        return d.Date;
                    })
                    .entries(allMap);

                var margin = { top: 20, right: 20, bottom: 30, left: 40 },
                    width = 960 - margin.left - margin.right,
                    height = 500 - margin.top;

                // uses the dates for tickmarks for x axis
                var ticks = dates;

                // scale the axes of the chart
                var xScale = d3.scale.ordinal()
                    .domain(ticks)
                    .rangeRoundBands([0, width], 0.1);

                var xScale1 = d3.scale.ordinal();

                var yScale = d3.scale.linear()
                    .range([height, 0]);

                var color = d3.scale.ordinal()
                    .range(['#ACDCF2', '#1B7EAD']);

                var xAxis = d3.svg.axis()
                    .orient('bottom')
                    .scale(xScale);

                var yAxis = d3.svg.axis()
                    .orient('left')
                    .scale(yScale);

                // scale for each date
                xScale.domain(allMap.map(function(d) {
                    return d.Date;
                }));

                // scale for each bar
                xScale1.domain(['Open', 'Closed']).rangeRoundBands([0, xScale.rangeBand()]);

                // y axis scale 
                yScale.domain([0, maxYValue + 8]);
                /*
                 * Restructuring the data array
                 */
                // gets the name of the two types of incidents
                var incidentNames = d3.keys(allMap[0]).filter(function(key) {
                    return key !== 'Date';
                });

                // attaches the incident name to its value for each date
                allMap.forEach(function(d) {
                    d.incidents = incidentNames.map(function(name) {
                        return { name: name, value: +d[name] }
                    });
                });


                // creates the chart area
                var svg = d3.select('#RTbarchart')
                    .append("div")
                    .classed("svg-container", true)
                    .append("svg")
                    // .attr('width', width + margin.left + margin.right)
                    // .attr('height', height + margin.top + margin.bottom)
                    .attr("preserveAspectRatio", "xMinYMin meet")
                    .attr("viewBox", "0 0 1000 800")
                    .classed("svg-content-responsive", true)
                    .attr('id', 'RTbars')
                    .append('g')
                    .attr('transform', 'translate(' + (margin.left + 60) + ',' + margin.top + ')');

                // x-axis
                svg.append('g')
                    .attr('class', 'x axis')
                    .attr('id', 'xAxis')
                    .attr('transform', 'translate(0,' + height + ')')
                    .call(xAxis);

                svg.append('text')
                    .attr('class', 'axistitle')
                    .attr('x', width / 2 + 10)
                    .attr('y', 510)
                    .attr('id', 'xAxisTitle')
                    .text('Dates');

                // y-axis
                svg.append('g')
                    .attr('class', 'y axis')
                    .attr('id', 'yAxis')
                    .call(yAxis);

                svg.append('text')
                    .attr('class', 'axistitle')
                    .attr('transform', 'rotate(-90)')
                    .attr('x', -(height / 2))
                    .attr('y', -50)
                    .attr('dy', '.71em')
                    .attr('id', 'yAxisTitle')
                    .style('text-anchor', 'end')
                    .text('Incidents');

                // chart title
                svg.append('text')
                    .attr('fill', 'black')
                    .attr('id', 'title')
                    .attr('class', 'title')
                    .attr('x', width / 4 + 80)
                    .attr('y', 5)
                    .text("Remedy Ticket Incident Data");

                // creates a tool tip for the bars
                var tip = d3.tip()
                    .attr('class', 'd3-tip')
                    .offset([-10, 0])
                    .html(function(d) {
                        if (d === null) {
                            return "";
                        } else {
                            return "<strong>Incidents:</strong> <span style='color:white'>" + d.value + '</span>';
                        }
                    });

                // this creates the groups of bars
                var groups = svg.selectAll('.Date')
                    .data(allMap)
                    .enter()
                    .append('g')
                    .call(tip)
                    .attr('class', 'g')
                    .attr('transform', function(d) {
                        return 'translate(' + xScale(d.Date) + ',0)';
                    });

                // this creates the bars for each group
                var bars = groups.selectAll('rect')
                    .data(function(d) {
                        return d.incidents;
                    })
                    .enter()
                    .append('rect')
                    .on('mouseover', tip.show)
                    .on('mouseout', tip.hide)
                    .attr('width', xScale1.rangeBand())
                    .attr('x', function(d) {
                        return xScale1(d.name);
                    })
                    .attr('y', function(d) {
                        return yScale(d.value);
                    })
                    .attr('height', 0)
                    .attr('height', function(d, i) {
                        return (height - yScale(d.value));
                    })
                    .attr('id', 'icidentgroups')
                    .style('fill', function(d) {
                        return color(d.name);
                    });

                // creates the legend
                var legend = svg.selectAll('.legend')
                    .data(incidentNames.slice().reverse())
                    .enter()
                    .append('g')
                    .attr('class', 'legend')
                    .attr('transform', function(d, i) { return 'translate(0,' + i * 20 + ')'; });

                legend.append('rect')
                    .attr('x', width - 18)
                    .attr('width', 18)
                    .attr('height', 18)
                    .style('fill', color);

                legend.append('text')
                    .attr('x', width - 24)
                    .attr('y', 9)
                    .attr('dy', '.35em')
                    .style('text-anchor', 'end')
                    .text(function(d) { return d; });
            }
        }
    }
})