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
import merge from 'lodash/merge'
import {
    ResponsiveParallelCoordinates,
    commonDefaultProps as defaultProps,
} from '@nivo/parallel-coordinates'
import { generateParallelCoordinatesData } from '@nivo/generators'
import nivoTheme from '../../../nivoTheme'
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import Settings from '../../Settings'
import { groupsByScope } from './ParallelCoordinatesControls'
import generateCode from '../../../lib/generateChartCode'
import propsMapper from './propsMapper'
import variables from './variables'

export default class ParallelCoordinates extends Component {
    state = {
        data: generateParallelCoordinatesData({ size: 32 }),
        settings: {
            variables,
            margin: {
                top: 50,
                right: 60,
                bottom: 50,
                left: 60,
            },
            layout: defaultProps.layout,
            curve: defaultProps.curve,
            colors: defaultProps.colors,
            colorBy: defaultProps.colorBy,
            strokeWidth: defaultProps.strokeWidth,
            lineOpacity: defaultProps.lineOpacity,
            axesPlan: defaultProps.axesPlan,
            axesTicksPosition: defaultProps.axesTicksPosition,
            animate: true,
            motionStiffness: 90,
            motionDamping: 12,
            theme: merge({}, nivoTheme, {
                axis: {
                    ticks: {
                        line: {
                            strokeWidth: 2,
                            strokeLinecap: 'square',
                        },
                    },
                    domain: {
                        line: {
                            strokeWidth: 2,
                            strokeLinecap: 'square',
                        },
                    },
                },
            }),
        },
    }

    diceRoll = () => {
        this.setState({ data: generateParallelCoordinatesData({ size: 32 }) })
    }

    handleSettingsUpdate = settings => {
        this.setState({ settings })
    }

    render() {
        const { data, settings } = this.state

        const mappedSettings = propsMapper(settings)

        const code = generateCode('ResponsiveParallelCoordinates', mappedSettings, {
            pkg: '@nivo/parallel-coordinates',
            defaults: defaultProps,
        })

        return (
            <div className="chart_page">
                <ChartHeader
                    chartClass="ParallelCoordinates"
                    tags={['@nivo/parallel-coordinates', 'svg', 'isomorphic']}
                />
                <div className="chart-description">
                    <p className="description">
                        Parallel coordinates chart, supports continuous numerical variables and discrete
                        values.
                    </p>
                    <p className="description">
                        The responsive alternative of this component is{' '}
                        <code>ResponsiveParallelCoordinates</code>, it also offers another
                        implementation, see{' '}
                        <Link to="/parallel-coordinates/canvas">ParallelCoordinatesCanvas</Link>.
                    </p>
                    <p className="description">
                        The <code>@nivo/parallel-coordinates</code> package also exposes a{' '}
                        <code>ParallelCoordinatesLayout</code> component which can be used to build your
                        very own chart. You can see how it's used to build the{' '}
                        <code>ParallelCoordinates</code> component{' '}
                        <a
                            href="https://github.com/plouc/nivo/blob/master/packages/parallel-coordinates/src/ParallelCoordinates.js"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            here
                        </a>
                        .
                    </p>
                </div>
                <ChartTabs
                    chartClass="parallel-coordinates"
                    code={code}
                    data={data}
                    diceRoll={this.diceRoll}
                >
                    <ResponsiveParallelCoordinates data={data} {...mappedSettings} />
                </ChartTabs>
                <Settings
                    component="ParallelCoordinates"
                    settings={settings}
                    onChange={this.handleSettingsUpdate}
                    groups={groupsByScope.ParallelCoordinates}
                />
            </div>
        )
    }
}
