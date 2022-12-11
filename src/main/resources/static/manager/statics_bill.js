// 定义数据集

function static(dataset){/*本来是想画个折线图，但是需求变了*/

// 定义图表画布参数
    let width = 800
    let height = 400
    let padding = 30
    let svg = d3.select('svg')
        .attr('width', width)
        .attr('height', height)

// 定义坐标轴
    let xScale = d3.scaleLinear()
        .domain([0, dataset.length-1])
        .range([0, width-padding*2])
    let xAxis = d3.axisBottom(xScale).ticks(dataset.length)

    let yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset)])
        .range([height-padding*2, 0])
    let yAxis = d3.axisLeft(yScale)

// 绘制坐标轴
    svg.append('g').call(xAxis)
        .attr('transform', 'translate(40, '+(height-padding)+')')
    svg.append('g').call(yAxis)
        .attr('transform', 'translate(40, '+padding+')')

// 绘制折线
    let line = svg.append('g')
        .attr('transform', 'translate(40, '+padding+')')

    line.append('path')
        .datum(dataset)
        .attr('fill', 'none')
        .attr('stroke', 'blue')
        .attr('stroke-width', 1)
        .attr('d', d3.line().x((v, i) => {
            return xScale(i)
        }).y((v, i) => {
            return yScale(v)
        }))

// 绘制数据坐标圆点
    line.selectAll('circle').data(dataset).enter()
        .append('circle')
        .attr('cx', (v, i) => { return xScale(i)})
        .attr('cy', (v, i) => { return yScale(v)})
        .attr('r', 5)
        .attr('fill', 'gold')
        .attr('stroke', 'blue')

        // 定义鼠标移入事件
        .on('mouseover', function (e, v) {
            // 放大坐标圆点
            d3.select(this).attr('r', 7)

            // 在光标上方显示坐标值
            let pos = d3.pointer(e)
            svg.append('text')
                .text(v)
                .attr('class', 'tooltip')
                .attr('x', pos[0]+50)
                .attr('y', pos[1]+20)
                .attr('text-anchor', 'end')
        })

        // 定义鼠标移出事件
        .on('mouseout', function () {
            // 还原坐标圆点
            d3.select(this).attr('r', 5)
            // 移除坐标值提示标签
            d3.select('.tooltip').remove()
        })
    alert("aaaa")
}
