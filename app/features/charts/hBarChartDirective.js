angular.module("app.Directives")
    .directive("horizontalBarChart", function () {
        function link(scope, element) {
            /**
             * chart based on http://bl.ocks.org/juan-cb/faf62e91e3c70a99a306
             */
            var data = [
                {letter: "A", count: 19},
                {letter: "E", count: 5},
                {letter: "I", count: 13},
                {letter: "O", count: 17},
                {letter: "U", count: 19}
            ];


            var axisMargin  = 20;
            var margin      = 40;
            var valueMargin = 4;
            var width       = parseInt(d3.select('body').style('width'), 10);
            var height      = parseInt(d3.select('body').style('height'), 10);
            var barHeight   = (height - axisMargin - margin * 2) * 0.4 / data.length;
            var barPadding  = (height - axisMargin - margin * 2) * 0.6 / data.length;
            var labelWidth  = 100;


            /* =============== UTILITY =============== */
            // Calculate the max count from the data set, used for creating axis
            var max = d3.max(data, function (d) {
                return d.count;
            });

            // D3 function that allow for  continuous quantitative data because they
            // preserve proportional differences.
            var scale = d3.scale.linear()
                .domain([0, max])
                .range([0, width - margin * 3 - labelWidth]);

            // D3 axis component
            var xAxis = d3.svg.axis()
                .scale(scale)
                .tickSize(-height + 2 * margin + axisMargin)
                .orient("bottom");


            var totalCount = data.reduce(function (accumulator, current) {
                return  accumulator + current.count;
            }, 0);

            var percentFormat = d3.format(".2%");

            function calculateFrequncy(count, total) {
               return count / total;
            }

            /* =============== BAR CHART =============== */
            // Create SVG view
            var svg = d3.select(element[0])
                .append("svg")
                .attr("width", width)
                .attr("height", height);

            // Add <g>, each g will contain a bar chart (data)
            var bar = svg.selectAll("g")
                .data(data, function (entry) {
                    return entry.letter;
                })
                .enter().append("g")
                .attr("class", "bar")
                .attr("cx", 0)
                .attr("transform", function (d, i) {
                    return "translate(" + margin + "," + (i * (barHeight + barPadding) + barPadding) + ")";
                });

            // Add Y-AXIS text to the bar chart
            bar.append("text")
                .attr("class", "label")
                .attr("y", barHeight / 2)
                //vertical align middle
                .attr("dy", ".35em")
                .text(function (d) {
                    return "LETTER: " + d.letter;
                });

            // Add a Rectangle shape (SVG) to the bar's container(<g>)
            bar.append("rect")
                .attr("transform", "translate(" + labelWidth + ", 0)")
                .attr("height", barHeight)
                .attr("width", function (d) {
                    return scale(d.count);
                });


            // Add bar data count text onto the bar chart
            bar.append("text")
                .attr("class", "value")
                .attr("y", barHeight / 2)
                .attr("dx", -valueMargin + labelWidth) //margin right
                .attr("dy", ".35em") //vertical align middle
                .attr("text-anchor", "end")
                .text(function (d) {
                    return percentFormat(calculateFrequncy(d.count, totalCount));
                })
                .attr("x", function (d) {
                    var width = this.getBBox().width;
                    return Math.max(width + valueMargin, scale(d.count));
                });


            // Add grid to the chart
            svg.insert("g", ":first-child")
                .attr("class", "axisHorizontal")
                .attr("transform", "translate(" + (margin + labelWidth) + "," + (height - axisMargin - margin) + ")")
                .call(xAxis);


            /* =============== TOOLTIP ===============*/

            var cursor = {x: 0, y: 0};
            var div    = d3.select(element[0]).append("div").attr("class", "toolTip");

            svg.on("mousemove", updateCursor);
            bar.on("mousemove", showTooltip);
            bar.on("mouseout", hideTooltip);

            function updateCursor() {
                cursor.x = d3.mouse(this)[0];
                cursor.y = d3.mouse(this)[1];
            }

            function showTooltip(d) {
                div.style("left", cursor.x + 50 + "px");
                div.style("top", cursor.y + "px");
                div.style("display", "inline-block");
                div.html((d.letter) + "<br>" + "count:" + (d.count) + "<br>" + "total:" + totalCount );
            }

            function hideTooltip() {
                div.style("display", "none");

            }
        }

        return {
            restrict: "E",
            link    : link
        }
    });
