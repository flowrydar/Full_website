
import { Comment } from './types';

export const sampleComments: Comment[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    message: 'Congratulations! So happy for you both! Can\'t wait to celebrate your special day with you.',
    date: new Date('2023-12-25'),
    likes: 5,
    replies: [
      {
        id: '1-1',
        name: 'Michael Chen',
        message: 'Looking forward to seeing you at the wedding, Sarah!',
        date: new Date('2023-12-26'),
        likes: 2
      }
    ]
  },
  {
    id: '2',
    name: 'Michael and Lisa Chen',
    message: 'We are so excited to witness this beautiful union. Looking forward to dancing the night away!',
    date: new Date('2023-12-20'),
    likes: 7,
    replies: []
  },
  {
    id: '3',
    name: 'David Williams',
    message: 'Wishing you both a lifetime of love and happiness. See you on the big day!',
    date: new Date('2023-12-18'),
    likes: 3,
    replies: [
      {
        id: '3-1',
        name: 'Emma Thompson',
        message: 'Beautifully said, David!',
        date: new Date('2023-12-19'),
        likes: 1
      },
      {
        id: '3-2',
        name: 'Jake Roberts',
        message: 'Can\'t wait to celebrate with everyone!',
        date: new Date('2023-12-19'),
        likes: 0
      }
    ]
  }
];
