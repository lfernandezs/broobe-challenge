import React, { PureComponent } from 'react';
import { View } from "react-native";
import { ProgressChart } from 'react-native-chart-kit';
import { Text } from "react-native-paper";
import styles from './ScoreChart.styles';

interface IScoreChartProps {
    title: string;
    score: number;
}

const ScoreChart = ({ title, score }: IScoreChartProps) => {

    const data = {
        data: [score]
    }

    const colorRange = (score: number, opacity: number) => {
        if (score < 0.5) {
            return 'rgba(255, 0, 0, ' + opacity + ')';
        } else if (score < 0.9) {
            return 'rgba(250, 156, 28, ' + opacity + ')';
        } else {
            return 'rgba(0, 255, 0, ' + opacity + ')';
        }
    }

    return (
        <>
            {score && <View style={styles.container}>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.chartContainer}>
                    <ProgressChart data={data} width={150} height={150}
                        strokeWidth={16} radius={32}
                        chartConfig={{
                            decimalPlaces: 2,
                            color: (opacity = 1) => colorRange(score, opacity),
                        }}
                        hideLegend={true}
                    />
                    <Text style={styles.score}>{score * 100}%</Text>
                </View>
            </View>
            }
        </>
    )
}

export default ScoreChart;