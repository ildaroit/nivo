/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { ResponsiveScatterPlotCanvas, ScatterPlotDefaultProps } from '@nivo/scatterplot'
import nivoTheme from '../../../nivoTheme'
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import Stories from '../../Stories'
import generateCode from '../../../lib/generateChartCode'
import Settings from '../../Settings'
import { groupsByScope } from './ScatterPlotControls'
import propsMapper from './propsMapper'
import { generateHeavyDataSet as generateData } from './generators'
import { scatterPlotCanvasStories } from './stories'

export default class ScatterPlotCanvas extends Component {
    state = {
        data: generateData(),
        settings: {
            margin: {
                top: 60,
                right: 140,
                bottom: 70,
                left: 90,
            },

            xScale: {
                type: 'linear',
                min: 0,
                max: 'auto',
            },
            yScale: {
                type: 'linear',
                min: 0,
                max: 'auto',
            },

            pixelRatio: window && window.devicePixelRatio ? window.devicePixelRatio : 1,

            colors: 'nivo',
            colorBy: 'serie.id',

            symbolSize: 4,
            symbolShape: 'circle',

            axisTop: {
                enable: false,
                orient: 'top',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: '',
                legendOffset: 36,
            },
            axisRight: {
                enable: false,
                orient: 'right',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: '',
                legendOffset: 0,
            },
            axisBottom: {
                enable: true,
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'weight',
                legendPosition: 'middle',
                legendOffset: 36,
                format: d => `${d} kg`,
            },
            axisLeft: {
                enable: true,
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'size',
                legendPosition: 'middle',
                legendOffset: -40,
                format: d => `${d} cm`,
            },

            enableGridX: true,
            enableGridY: true,

            animate: true,
            motionStiffness: 90,
            motionDamping: 15,

            isInteractive: true,
            useMesh: true,
            debugMesh: false,

            legends: [
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    translateX: 130,
                    itemWidth: 100,
                    itemHeight: 12,
                    itemsSpacing: 5,
                    symbolSize: 12,
                    symbolShape: 'circle',
                },
            ],
        },
    }

    diceRoll = () => {
        this.setState({ data: generateData() })
    }

    handleSettingsUpdate = settings => {
        this.setState({ settings })
    }

    handleNodeClick = (node, event) => {
        alert(
            `serie: ${node.serie.id}, x: ${node.x}, y: ${node.y}\nclicked at x: ${
                event.clientX
            }, y: ${event.clientY}`
        )
    }

    render() {
        const { data, settings } = this.state

        const mappedSettings = propsMapper(settings)

        const code = generateCode(
            'ResponsiveScatterPlotCanvas',
            {
                ...mappedSettings,
            },
            { pkg: '@nivo/scatterplot', defaults: ScatterPlotDefaultProps }
        )

        return (
            <div className="chart_page">
                <ChartHeader
                    chartClass="ScatterPlotCanvas"
                    tags={['@nivo/scatterplot', 'canvas']}
                />
                <div className="chart-description">
                    <p className="description">
                        A variation around the <Link to="/scatterplot">ScatterPlot</Link> component.
                        Well suited for large data sets as it does not impact DOM tree depth and does
                        not involve React diffing stuff for children (not that useful when using
                        canvas), however you'll lose the isomorphic ability and transitions.
                    </p>
                    <p className="description">
                        The responsive alternative of this component is{' '}
                        <code>ResponsiveScatterPlotCanvas</code>, it also offers another implementation,
                        see <Link to="/scatterplot">ScatterPlot</Link>.
                    </p>
                </div>
                <ChartTabs
                    chartClass="scatterplot"
                    code={code}
                    data={data}
                    diceRoll={this.diceRoll}
                    nodeCount={data.length * data[0].data.length}
                >
                    <ResponsiveScatterPlotCanvas
                        data={data}
                        {...mappedSettings}
                        theme={nivoTheme}
                        onClick={this.handleNodeClick}
                    />
                </ChartTabs>
                <Settings
                    component="ScatterPlotCanvas"
                    settings={settings}
                    onChange={this.handleSettingsUpdate}
                    groups={groupsByScope.ScatterPlotCanvas}
                />
                <Stories stories={scatterPlotCanvasStories} />
            </div>
        )
    }
}
