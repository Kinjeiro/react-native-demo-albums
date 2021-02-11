const FAQ_DATA = [
  {
    id: '1',
    block: 'Block 1',
    faq: [
      { id: '11', question: 'question11', answer: 'answer 11' },
      { id: '12', question: 'question12', answer: 'answer 12' },
      { id: '13', question: 'question13', answer: 'answer 13' },
    ],
  },
  {
    id: '2',
    block: 'Block 2',
    faq: [
      { id: '21', question: 'question21', answer: 'answer 21' },
      { id: '22', question: 'question22', answer: 'answer 22' },
      { id: '23', question: 'question23', answer: 'answer 23' },
    ],
  },
  {
    id: '3',
    block: 'Block 3',
    faq: [
      { id: '31', question: 'question31', answer: 'answer 31' },
      { id: '32', question: 'question32', answer: 'answer 32' },
      { id: '33', question: 'question33', answer: 'answer 33' },
    ],
  },
];

export function getBlockById(blockId: number | string) {
  // eslint-disable-next-line eqeqeq
  return FAQ_DATA.find(({ id }) => blockId == id);
}

export function getBlockName(blockId: number | string): string {
  const block = getBlockById(blockId);
  return block ? block.block : '';
}

export default FAQ_DATA;
