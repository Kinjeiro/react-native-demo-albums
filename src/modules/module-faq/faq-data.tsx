/* eslint-disable */
const FAQ_DATA = [
  {
    id: '1',
    blockTitle: 'Authorization Issues',
    faq: [
      {
        id: '11',
        question: 'What moderation means?',
        answer: 'If you don’t have a social profile, make sure that your profile section is filled out with your best work. Not having a social profile will limit your campaign offers, but it’s still possible to get projects on Insense without an active social presence.\n'
          + 'If you don’t have a social profile, make sure that your.',
      },
      {
        id: '12',
        question: 'How to register and start working with the app?',
        answer: 'If you don’t have a social profile, make sure that your profile section is filled out with your best work. Not having a social profile will limit your campaign offers, but it’s still possible to get projects on Insense without an active social presence.\n'
          + 'If you don’t have a social profile, make sure that your.',
      },
      {
        id: '13',
        question: 'Will receive offers from brands?',
        answer: 'If you don’t have a social profile, make sure that your profile section is filled out with your best work. Not having a social profile will limit your campaign offers, but it’s still possible to get projects on Insense without an active social presence.\n'
          + 'If you don’t have a social profile, make sure that your.',
      },
    ],
  },
  {
    id: '2',
    blockTitle: 'The first steps',
    faq: [
      { id: '21', question: 'What moderation means?', answer: 'is ideal for Instagram or YouTube creators. If you do not have an account on these platforms, you are still welcome to join Insense - the main thing we’re after is the ability to create high quality content. is ideal for Instagram or YouTube creators. If you do not have an accountnt.' },
      { id: '22', question: 'How to register and start working with the app?', answer: 'is ideal for Instagram or YouTube creators. If you do not have an account on these platforms, you are still welcome to join Insense - the main thing we’re after is the ability to create high quality content. is ideal for Instagram or YouTube creators. If you do not have an accountnt.' },
      { id: '23', question: 'Who can become an Insense user?', answer: 'is ideal for Instagram or YouTube creators. If you do not have an account on these platforms, you are still welcome to join Insense - the main thing we’re after is the ability to create high quality content. is ideal for Instagram or YouTube creators. If you do not have an accountnt.' },
    ],
  },
  {
    id: '3',
    blockTitle: 'Payment',
    faq: [
      { id: '31', question: 'How can I be sure that I will be paid?', answer: 'All brands working on Insense have pre-paid for creator content. When a brand approves you for working on a campaign, the agreed-upon payment amount is immediately frozen on the brand’s account. As soon as you complete your project with the brand, your payment ' },
      { id: '32', question: 'What’s the payment process?', answer: 'All brands working on Insense have pre-paid for creator content. When a brand approves you for working on a campaign, the agreed-upon payment amount is immediately frozen on the brand’s account. As soon as you complete your project with the brand, your payment ' },
      { id: '33', question: 'Is my income at Insense being taxed?', answer: 'All brands working on Insense have pre-paid for creator content. When a brand approves you for working on a campaign, the agreed-upon payment amount is immediately frozen on the brand’s account. As soon as you complete your project with the brand, your payment ' },
    ],
  },
];

export function getBlockById(blockId: number | string) {
  // eslint-disable-next-line eqeqeq
  return FAQ_DATA.find(({ id }) => blockId == id);
}

export default FAQ_DATA;
