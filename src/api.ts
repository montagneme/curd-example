import Mock from 'mockjs';
const mockData = Mock.mock({
  'list|10000': [
    {
      clientName: '@word(2, 6)',
      boardName: '@word(2, 6)',
      requestor: '@first()',
      tags: ['@word(2, 4)', '@word(2, 4)', '@word(2, 4)', '@word(2, 4)'],
      sdk: ''
    }
  ]
});

export const getTableData = (): Promise<{
  Data: any[];
  Code: number;
  Msg: string;
}> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        Data: mockData.list,
        Code: 200,
        Msg: ''
      });
    }, 1000);
  });
};
