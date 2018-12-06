import moment from 'moment';

const redFlags = [
  {
    id: 1,
    subject: 'Need for Urgent Road Repair',
    type: 'intervention',
    location: '(6.593404442689329, 3.364960622142803)',
    status: 'under investigation',
    comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque quisquam repellat recusandae quasi accusamus perferendis, maiores blanditiis assumenda!',
    createdBy: 1,
    createdOn: moment().format('LLLL'),
  },
];

export default redFlags;
