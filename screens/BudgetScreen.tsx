/* eslint-disable no-console */
import React, { useState, useContext, useEffect } from 'react';
import { Text, Heading } from 'native-base';
import { Card } from 'react-native-elements';
import {
  SafeAreaView,
  ScrollView,
  Dimensions,
  StyleSheet,
  FlatList,
  Alert,
  View,
  ActivityIndicator,
} from 'react-native';
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
  card2: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  item: {
    padding: 20,
    fontSize: 15,
    marginTop: 5,
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
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState([]);
  const [goal, setGoal] = useState(0);
  const db = firebase.firestore();
  const screenWidth = Math.round(Dimensions.get('window').width);

  function BudgetRender() {
    return (
      <FlatList
        horizontal
        data={saved}
        renderItem={({ item: budgets, index }) => {
          return (
            <Card
              // title={budget.name}
              // image={{ uri: budget.imageUrl }}
              containerStyle={{
                padding: 20,
                alignItems: 'center',
                justifyContent: 'center',
                maxWidth: screenWidth / 2,
              }}
            >
              <AnimatedCircularProgress
                size={100}
                width={8}
                fill={0}
                tintColor="#00e0ff"
                backgroundColor="#3d5875"
              >
                {() => (
                  <Text>
                    {budgets.name} {budgets.budget} {budgets.currency}
                  </Text>
                )}
              </AnimatedCircularProgress>
              <Text style={{ marginBottom: 10 }}>
                Description: {budgets.description}
              </Text>
              <Text style={{ marginBottom: 0 }}>
                Creators: {budgets.creators}
              </Text>
            </Card>
          );
        }}
        keyExtractor={(item, index) => index}
      />
    );
  }

  useEffect(() => {
    function fetchData() {
      setLoading(true);
      const data = [];
      const Budgetdatas = db
        .collection(`Budgets`)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, ' => ', doc.data().creators);
            const creatorsData = doc.data().creators;
            creatorsData.forEach(item => {
              if (item === user?.uid) {
                // console.log('Creator ID Matched', doc.data());
                data.push({
                  name: doc.data().name,
                  description: doc.data().description,
                  currency: doc.data().currency,
                  budget: doc.data().budget,
                  creators: doc.data().creators,
                });
              }
            });
            // setGoal(100 / saved.budget);
          });
          console.log('DATA is', ...data);
          setSaved([...data]);
        });
    }
    fetchData();
    setLoading(false);
  }, [db, user]);

  return (
    <>
      <Screen title="Budget">
        <View>
          {loading && <ActivityIndicator size="large" />}
          {!loading && (
            <>
              <Heading size="lg">Assets</Heading>
              <Card style={styles.card2}>
                <Text>Number of Accounts:</Text>
                <Text>Total Amount($):</Text>
                <Text>Total Debt($):</Text>
                <Text>Total Assets($): </Text>
              </Card>
              <ScrollView>
                {saved && goal !== 0 && (
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
                            <Text>{JSON.stringify(goal)}%</Text>
                          </>
                        )}
                      </AnimatedCircularProgress>
                    </Card>
                  </>
                )}
              </ScrollView>
              {BudgetRender()}
              <Button
                label="Reload Budgets"
                onPress={() =>
                  useEffect(() => {
                    fetchData();
                  })
                }
              />
              <Button
                label="Create New Budget"
                onPress={() => navigation.navigate('BudgetBuilder')}
              />
            </>
          )}
        </View>
      </Screen>
    </>
  );
}
