import { Data, Task } from 'types/mock'

const tasks: Task[] = [
  {
    title: 'Build UI for on boarding!',
    status: 'Todo',
    description: '0 of 3 subtasks',
    subtasks: [
      {
        title: 'Sign up page',
        isCompleted: false,
      },
      {
        title: 'Sign in page',
        isCompleted: false,
      },
      {
        title: 'Welcome page',
        isCompleted: false,
      },
    ],
  },
  {
    title: 'Build UI for on boarding!',
    status: 'Todo',
    description: '0 of 3 subtasks',
    subtasks: [
      {
        title: 'Sign up page',
        isCompleted: false,
      },
      {
        title: 'Sign in page',
        isCompleted: false,
      },
      {
        title: 'Welcome page',
        isCompleted: false,
      },
    ],
  },
  {
    title: 'Build UI for on boarding!',
    status: 'Todo',
    description: '0 of 3 subtasks',
    subtasks: [
      {
        title: 'Sign up page',
        isCompleted: false,
      },
      {
        title: 'Sign in page',
        isCompleted: false,
      },
      {
        title: 'Welcome page',
        isCompleted: false,
      },
    ],
  },
  {
    title: 'Build UI for on boarding!',
    status: 'Todo',
    description: '0 of 3 subtasks',
    subtasks: [
      {
        title: 'Sign up page',
        isCompleted: false,
      },
      {
        title: 'Sign in page',
        isCompleted: false,
      },
      {
        title: 'Welcome page',
        isCompleted: false,
      },
    ],
  },
  {
    title: 'Build UI for on boarding!',
    status: 'Todo',
    description: '0 of 3 subtasks',
    subtasks: [
      {
        title: 'Sign up page',
        isCompleted: false,
      },
      {
        title: 'Sign in page',
        isCompleted: false,
      },
      {
        title: 'Welcome page',
        isCompleted: false,
      },
    ],
  },
]

const data: Data = {
  boards: [
    {
      name: 'Platform Launch',
      columns: [
        {
          name: 'Todo',
          tasks: tasks,
        },
        {
          name: 'Doing',
          tasks: tasks,
        },
        {
          name: 'Doing',
          tasks: tasks,
        },
        {
          name: 'Doing',
          tasks: tasks,
        },
        {
          name: 'Doing',
          tasks: tasks,
        },
      ],
    },
  ],
  currentBoard: 'Platform Launch',
}

export default data
