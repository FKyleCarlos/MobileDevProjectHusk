// src/data/dummyData.js

export const dummySchedules = [
  {
    id: 1,
    className: "Web Development",
    classCode: "CPRG-306",
    semesterStart: "01/08/2025",
    semesterEnd: "04/28/2025",
    classDays: ["Tue", "Thu"],
    startTime: "08:00",
    endTime: "09:50",
  },
  {
    id: 2,
    className: "Mobile Development",
    classCode: "CPRG-303",
    semesterStart: "01/08/2025",
    semesterEnd: "04/28/2025",
    classDays: ["Tue"],
    startTime: "10:00",
    endTime: "11:30",
  },
  {
    id: 3,
    className: "Database Programming",
    classCode: "CPRG-304",
    semesterStart: "01/08/2025",
    semesterEnd: "04/28/2025",
    classDays: ["Mon", "Wed"],
    startTime: "14:00",
    endTime: "15:30",
  }
];

export const dummyAssignments = [
  {
    id: 1,
    title: "Assignment 1",
    course: "Mobile Development",
    dueDate: "2025-02-11",
  },
  {
    id: 2,
    title: "Lab 4",
    course: "Database Programming",
    dueDate: "2025-02-11",
  },
  {
    id: 3,
    title: "Quiz 2",
    course: "Web Development",
    dueDate: "2025-02-12",
  }
];
