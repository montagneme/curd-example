const mockData = [
  {
    clientName: '111',
    boardName: '222',
    tags: ['2323', '5sfs', '2fdsad'],
    requestor: '444',
    sdk: '555'
  },
  {
    clientName: '111',
    boardName: '222',
    tags: ['2323', '5sfs'],
    requestor: '444',
    sdk: '555'
  },
  {
    clientName: '111',
    boardName: '222',
    tags: ['2323', '5sfs', '2fdsad'],
    requestor: '444',
    sdk: '555'
  },
  {
    clientName: '111',
    boardName: '222',
    tags: ['2323', '5sfs'],
    requestor: '444',
    sdk: '555'
  },
  {
    clientName: '111',
    boardName: '222',
    tags: ['2323', '5sfs', '2fdsad'],
    requestor: '444',
    sdk: '555'
  },
  {
    clientName: '111',
    boardName: '222',
    tags: ['2323', '5sfs'],
    requestor: '444',
    sdk: '555'
  },
  {
    clientName: '111',
    boardName: '222',
    tags: ['2323', '5sfs', '2fdsad'],
    requestor: '444',
    sdk: '555'
  },
  {
    clientName: '111',
    boardName: '222',
    tags: ['2323', '5sfs'],
    requestor: '444',
    sdk: '555'
  },
  {
    clientName: '111',
    boardName: '222',
    tags: ['2323', '5sfs', '2fdsad'],
    requestor: '444',
    sdk: '555'
  },
  {
    clientName: '111',
    boardName: '222',
    tags: ['2323', '5sfs'],
    requestor: '444',
    sdk: '555'
  },
  {
    clientName: '111',
    boardName: '222',
    tags: ['2323', '5sfs'],
    requestor: '444',
    sdk: '555'
  },
  {
    clientName: '111',
    boardName: '222',
    tags: ['2323', '5sfs', '2fdsad'],
    requestor: '444',
    sdk: '555'
  },
  {
    clientName: '111',
    boardName: '222',
    tags: ['2323', '5sfs'],
    requestor: '444',
    sdk: '555'
  },
  {
    clientName: '111',
    boardName: '222',
    tags: ['2323', '5sfs'],
    requestor: '444',
    sdk: '555'
  },
  {
    clientName: '111',
    boardName: '222',
    tags: ['2323', '5sfs', '2fdsad'],
    requestor: '444',
    sdk: '555'
  },
  {
    clientName: '111',
    boardName: '222',
    tags: ['2323', '5sfs'],
    requestor: '444',
    sdk: '555'
  },
  {
    clientName: '111',
    boardName: '222',
    tags: ['2323', '5sfs'],
    requestor: '444',
    sdk: '555'
  },
  {
    clientName: '111',
    boardName: '222',
    tags: ['2323', '5sfs', '2fdsad'],
    requestor: '444',
    sdk: '555'
  },
  {
    clientName: '111',
    boardName: '222',
    tags: ['2323', '5sfs'],
    requestor: '444',
    sdk: '555'
  }
];

export const getTableData = (): Promise<{
  Data: any[];
  Code: number;
  Msg: string;
}> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        Data: mockData,
        Code: 200,
        Msg: ''
      });
    }, 1000);
  });
};
