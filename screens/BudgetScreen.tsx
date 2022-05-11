import React, { useState, useContext } from 'react';
import { Text, Heading, Card } from 'native-base';
import { ScrollView, Dimensions, StyleSheet, Alert } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import 'firebase/firestore';
import Screen from '../components/common/Screen';
import Button from '../components/common/Button';
import { AuthContext } from '../providers/AuthProvider';
import firebase from '../services/firebase';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 0,
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
    backgroundColor: '#FFF',
  },
});

const SpendingChart = () => {
  return (
    <>
      <Text style={styles.header}>YTD</Text>
      <LineChart
        data={{
          labels: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'June',
            'July',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ],
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
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
        // horizontalLabelRotation={20}
        verticalLabelRotation={-90}
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          strokeWidth: 2, // optional
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
  const { user } = useContext(AuthContext);
  const [goal, setGoal] = useState(10);
  const [saved, setSaved] = useState();
  const db = firebase.firestore();

  async function getBudget() {
    const datas = await db.collection('budgets').doc(user.uid).get();
    console.log('DATAS: ', datas.data());
    await setSaved(datas.data());
    setGoal(10 / saved.budget);
  }

  return (
    <>
      <Screen title="Budget">
        <Heading size="lg">Existing Budgets</Heading>
        <Button label="Reload data" onPress={() => getBudget()} />
        <Text>Total Amount($):</Text>
        <Text>Total Debt($):</Text>
        <Text>Total Assets($): </Text>

        <ScrollView>
          {/* <Card style={styles.card}> */}
          {saved && (
            <>
              <Card>
                <SpendingChart />
              </Card>
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
                      <Text>{saved?.name}</Text>
                      <Text>{(10 / saved.budget) * 100}%</Text>
                    </>
                  )}
                </AnimatedCircularProgress>
              </Card>
            </>
          )}
          {/* </Card> */}
        </ScrollView>
        <Button
          label="Create New Budget"
          onPress={() => navigation.navigate('BudgetBuilder')}
        />
      </Screen>
    </>
  );
}
