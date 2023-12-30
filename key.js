const keywords = [
   {name: '風邪',
    before:'b001.png',
    after: 'a001.png',
    brick:[
      [{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1}],
      [{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1}],
      [{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1}],
      [{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:1,type:1},{status:1,type:1},{status:1,type:1},{status:1,type:1},{status:1,type:2},{status:1,type:2},{status:1,type:2},{status:1,type:1},{status:1,type:1},{status:1,type:1},{status:1,type:1}],
      [{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:1,type:1},{status:1,type:1},{status:1,type:1},{status:1,type:1},{status:1,type:2},{status:1,type:2},{status:1,type:2},{status:1,type:1},{status:1,type:1},{status:1,type:1},{status:1,type:1}],
      [{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:1,type:1},{status:1,type:1},{status:1,type:1},{status:1,type:1},{status:1,type:2},{status:1,type:2},{status:1,type:2},{status:1,type:1},{status:1,type:1},{status:1,type:1},{status:1,type:1}],
      [{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:1,type:1},{status:1,type:1},{status:1,type:1},{status:1,type:1},{status:1,type:1},{status:1,type:1},{status:1,type:1},{status:1,type:1},{status:1,type:1},{status:1,type:1},{status:1,type:1}],
      [{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:1,type:1},{status:1,type:1},{status:1,type:1},{status:1,type:1},{status:1,type:1},{status:1,type:1},{status:1,type:1},{status:1,type:1},{status:1,type:1},{status:1,type:1},{status:1,type:1}],
      [{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:1,type:1},{status:1,type:1},{status:1,type:1},{status:1,type:1},{status:1,type:1},{status:1,type:1}],
      [{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:0,type:1},{status:1,type:1},{status:1,type:1},{status:1,type:1},{status:1,type:1},{status:1,type:1},{status:1,type:1}]
       ],
    item: [new Item(0,0,2,2),new Item(9,0,3,2),new Item(0,4,2,1),new Item(9,4,3,1),new Item(3,12,4,2),new Item(6,12,4,2),new Item(4,13,1,1)],
    nazo: 13*25 - 7 + 110
   }
   ];

