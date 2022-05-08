import React, { useState } from 'react';
import { Text, Heading, Card } from 'native-base';
import { ScrollView, Dimensions, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { t } from '../utils';
import Screen from '../components/common/Screen';
import Button from '../components/common/Button';

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
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 20,
    margin: 20,
    backgroundColor: '#FFF',
  },
});

const SpendingChart = () => {
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
        yAxisLabel="$"
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

export default function BudgetScreen({ navigation }) {
  const [goal, setGoal] = useState(10);
  return (
    <>
      <Screen title="Budget">
        <Heading size="lg">Existing Budgets</Heading>
        <ScrollView>
          <SpendingChart />
          <Card style={styles.card}>
            <AnimatedCircularProgress
              size={100}
              width={8}
              fill={goal}
              tintColor="#00e0ff"
              backgroundColor="#3d5875"
            >
              {goal => (
                <>
                  <Text>Budget 1</Text>
                  <Text>{goal}%</Text>
                </>
              )}
            </AnimatedCircularProgress>
            <Text>     </Text>
            <Text>     </Text>
            <AnimatedCircularProgress
              size={100}
              width={8}
              fill={goal}
              tintColor="#00e0ff"
              backgroundColor="#3d5875"
            >
              {goal => (
                <>
                  <Text>Budget 2</Text>
                  <Text>{goal}%</Text>
                </>
              )}
            </AnimatedCircularProgress>
          </Card>
        </ScrollView>
        <Button
          label="Create New Budget"
          onPress={() => navigation.navigate('BudgetBuilder')}
        />
      </Screen>
    </>
  );
}
