import * as React from 'react';
import { Text, Heading } from 'native-base';
import { ScrollView, Dimensions, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { t } from '../utils';
import Screen from '../components/common/Screen';
import Button from '../components/common/Button';

const { screenWidth } = Dimensions.get('window');
const height = 220;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 10,
  },
  header: {
    textAlign: 'center',
    fontSize: 18,
    padding: 16,
    marginTop: 16,
  },
});

const MyBezierLineChart = () => {
  return (
    <>
      <Text style={styles.header}>YTD</Text>
      <LineChart
        data={{
          labels: ['January', 'February', 'March', 'April'],
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
              ],
            },
          ],
        }}
        width={Dimensions.get('window').width - 16} // from react-native
        height={220}
        yAxisLabel={'$'}
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </>
  );
};

export default function BudgetScreen() {
  return (
    <>
      <Screen title="Budget">
        <Heading size="lg">Existing Budgets</Heading>
        <ScrollView>
          <MyBezierLineChart />
        </ScrollView>
        <Button label="Add a Budget" />
      </Screen>
    </>
  );
}
