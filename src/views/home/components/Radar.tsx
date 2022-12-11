import { useEffect } from 'react';
import * as echarts from 'echarts';

const dataBJ = [
    [98, 80, 99, 70, 79, 80],
];

const ChartLine = (props: any) => {
    const { optionsData = null, id = 'default-id', width = '100%', height = '100%' } = props;
    useEffect(() => {
        const option = {
            tooltip: {
                trigger: 'axis',
                show: true
            },
            legend: {
                data: ['Influence', 'Campaign', 'Creation', 'Curation', 'Collection', 'Engagement'],
                textStyle: {
                    color: '#FEFFFE',
                    fontSize: 20
                }
            },
            radar: {
                axisName: {
                    color: 'rgba(255,255,255,.5)',
                    fontSize: 14
                },
                indicator: [
                    { name: 'Influence', max: 100 },
                    { name: 'Campaign', max: 100 },
                    { name: 'Creation', max: 100 },
                    { name: 'Curation', max: 100 },
                    { name: 'Collection', max: 100 },
                    { name: 'Engagement', max: 100 },

                ],
                shape: 'circle',
                splitNumber: 4,
                name: {
                    textStyle: {
                        color: '#ffffff',
                        fontSize: 16
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: [
                            'rgba(238,238,238, 0.3)', 'rgba(238,238,238, 0.2)',
                            'rgba(238,238,238, 0.2)', 'rgba(238,238,238, 0.2)',
                            'rgba(238,238,238, 0.2)', 'rgba(238,238,238, 0.2)'
                        ].reverse(),
                        width: 1
                    }
                },
                splitArea: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(238,238,238, 0.2)'
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#B5EA22',
                    }
                },
            },
            series: [{
                type: 'radar',
                tooltip: {
                    trigger: 'item'
                },
                data: dataBJ,
                symbol: 'circle',
                symbolSize: 5,
                itemStyle: {
                    normal: {
                        color: '#B5EA22',
                        borderColor: 'rgba(181, 234, 34,0.2)',
                        borderWidth: 10,
                    }
                },
                lineStyle: {
                    color: '#B5EA22',
                    width: 1
                },
            }],


        };
        const HTMLElement = document.getElementById(id) as HTMLElement;
        const chart = echarts.init(HTMLElement);
        chart.setOption(option);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [optionsData]);
    return (
        <div id={id} style={{ width: width, height: height }}>222</div>
    );
};

export default ChartLine;
