import { Data, Task } from 'types/mock'

const tasks: Task[] = [
  {
    id: 1,
    title: 'Build UI for on boarding!',
    status: 'Todo',
    description: '0 of 1 subtasks',
    subtasks: [
      {
        id: 1,
        title: 'Sign up page',
        isCompleted: false,
      },
    ],
  },
]

const data: Data = {
  boards: [
    {
      id: 1,
      name: 'Platform Launch',
      columns: [
        {
          id: 1,
          name: 'Todo',
          tasks,
        },
      ],
    },
  ],
  selectedBoard: 1,
}

export default data
