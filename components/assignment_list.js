import React from 'react';
import { View, FlatList } from 'react-native';
import AssignmentCard from './assignment_card';
import assignments from '../constant_values/assignments.json';

export default function AssignmentList({ selectedDate }) {
  const filteredAssignments = assignments.filter(
    (item) => item.date === selectedDate
  );

  return (
    <View>
      <FlatList
        data={filteredAssignments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <AssignmentCard
            subject={item.subject}
            task={item.task}
            dueTime={item.dueTime}
          />
        )}
      />
    </View>
  );
}
