import * as React from 'react';
import { Text, Heading } from 'native-base';
import { ScrollView, Dimensions } from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
} from 'react-native-chart-kit';
import { t } from '../utils';
import Screen from '../components/common/Screen';
import Button from '../components/common/Button';

import {
  data,
  contributionData,
  pieChartData,
  progressChartData,
} from '../fakeData';

const width = Dimensions.get('window').width
const height = 220
const chartConfigs = [
  {
    backgroundColor: '#000000',
    backgroundGradientFrom: '#1E2923',
    backgroundGradientTo: '#08130D',
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  },
  {
    backgroundColor: '#022173',
    backgroundGradientFrom: '#022173',
    backgroundGradientTo: '#1b3fa0',
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  },
  {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  },
  {
    backgroundColor: '#26872a',
    backgroundGradientFrom: '#43a047',
    backgroundGradientTo: '#66bb6a',
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  },
  {
    backgroundColor: '#000000',
    backgroundGradientFrom: '#000000',
    backgroundGradientTo: '#000000',
    color: (opacity = 1) => `rgba(${255}, ${255}, ${255}, ${opacity})`,
  },
  {
    backgroundColor: '#0091EA',
    backgroundGradientFrom: '#0091EA',
    backgroundGradientTo: '#0091EA',
    color: (opacity = 1) => `rgba(${255}, ${255}, ${255}, ${opacity})`,
  },
  {
    backgroundColor: '#e26a00',
    backgroundGradientFrom: '#fb8c00',
    backgroundGradientTo: '#ffa726',
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  },
  {
    backgroundColor: '#b90602',
    backgroundGradientFrom: '#e53935',
    backgroundGradientTo: '#ef5350',
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  },
  {
    backgroundColor: '#ff3e03',
    backgroundGradientFrom: '#ff3e03',
    backgroundGradientTo: '#ff3e03',
    color: (opacity = 1) => `rgba(${0}, ${0}, ${0}, ${opacity})`,
  },
];

export default function BudgetScreen() {
  return (
    <>
      <Screen title="Budget">
        <Heading size="lg">Existing Budgets</Heading>
        <ScrollView>

          <Text> Budget 1 </Text>
          {/* <LineChart
            data={data}
            width={width}
            height={height}
            chartConfig={chartConfigs}
            style={graphStyle}
          />

          <Text> Budget 2 </Text>
          <BarChart
            width={width}
            height={height}
            data={data}
            chartConfig={chartConfigs}
            style={graphStyle}
          />

          <Text> Budget 3 </Text>
          <ProgressChart
            data={progressChartData}
            width={width}
            height={height}
            chartConfig={chartConfigs}
            style={graphStyle}
          /> */}
        </ScrollView>
        <Button label="Add a Budget" />
      </Screen>
    </>
  );
}
