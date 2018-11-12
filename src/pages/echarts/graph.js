import echarts from 'echarts'
var option = {
    title: {
        text: '电站上下游关系图',
    },
    // tooltip: {
    //     trigger: 'item'
    // },
    series: [
        {
            type: 'graph',
            nodes: [
                // {name: '电站1', x:10, y:10},
                // {name: '电站2', x:20, y:20},
                // {name: '电站3', x:30, y:30},
                // {name: '电站4', x:40, y:40}
                {name: '电站1'},
                {name: '电站2'},
                {name: '电站3'},
                {name: '电站4'}
            ],
            links: [
                {source: '电站1', target: '电站2'},
                {source: '电站1', target: '电站3'},
                {source: '电站2', target: '电站4'},
                {source: '电站3', target: '电站4'},
            ],
            layout: 'force',
            force: {
                repulsion: 100,//节点之间的斥力因子。支持数组表达斥力范围，值越大斥力越大。
                gravity: 0.03,//节点受到的向中心的引力因子。该值越大节点越往中心点靠拢。
                edgeLength: 200,//边的两个节点之间的距离，这个距离也会受 repulsion。[10, 50] 。值越小则长度越长
                layoutAnimation: true,
            },
            draggable: true,
            symbolSize: 45,
            label: {
                normal: {
                    show: true,
                    position: 'inside'
                },
                emphasis: {
                    fontWeight: 'bold'
                }
            },
            // edgeSymbol: 'arrow',
            edgeSymbol: ['circle', 'arrow'],
            // edgeLabel: {
            //     normal: {
            //         show: true,
            //     },
            // },
            // lineStyle: {
            //     normal: {
            //         opacity: 0.9,
            //         width: 1,
            //         curveness: 0,
            //         shadowColor: 'rgba(0, 0, 0, 0.8)',
            //         shadowBlur: 5,
            //         shadowOffsetX: 3,
            //         shadowOffsetY: 3,
            //     },
            //     emphasis: {
            //         width: 30
            //     }
            // },
            focusNodeAdjacency: false
        }
    ]
}

var myChart = echarts.init(document.getElementById("graphDiv"));
myChart.setOption(option);