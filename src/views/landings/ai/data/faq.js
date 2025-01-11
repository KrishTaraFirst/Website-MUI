// @project
import branding from '@/branding.json';
import { ListBadgeColors } from '@/enum';

export const faq = {
  heading: 'Frequently Asked Questions',
  caption: 'Answers to some of the common questions that will tell you why Tara stands out from the rest.',
  defaultExpanded: 'panel3',
  faqList: [
    {
      question: 'How do I get in touch with Tara?',
      answer: `Easy! You can reach us via phone, email, or chat. Just head to our Contact page, and pick the way that’s most convenient for you.`
    },
    {
      question: 'Can I get a free consultation?',
      answer: `Absolutely! We offer a free initial consultation to understand your needs and discuss how we can help. Just drop us a message to set it up.`
    },
    {
      question: 'How can Tara make my life easier?',
      answer: `From tax filings to payroll, we turn complex tasks into smooth, worry-free services so you can focus on what matters.`
    },
    {
      question: 'Does this really work for beginners?',
      answer: `100%! Tara is built to support everyone, especially if you're new to finance and need guidance minus the technical lingo.`
    }
  ],
  // faqList: [
  //   {
  //     question: 'How do I get in touch with Tara?',
  //     answer: `Easy! You can reach us via phone, email, or chat. Just head to our Contact page, and pick the way that’s most convenient for you.`
  //   },
  //   {
  //     question: 'How do developer AI tools work?',
  //     answer: {
  //       content:
  //         'Developer AI tools offer several benefits, including improved productivity, faster development cycles, better code quality, reduced manual effort, and enhanced collaboration.',
  //       type: 'list',
  //       data: [
  //         { primary: `They help automate repetitive coding tasks, allowing developers to focus on solving complex problems.` },
  //         {
  //           primary: 'Provide real-time guidance and suggestions to help developers avoid common mistakes and improve their skills.'
  //         },
  //         { primary: 'Enable teams to leverage data insights for better decision-making and business outcomes.' }
  //       ],
  //       color: ListBadgeColors.WHITE
  //     }
  //   },
  //   {
  //     question: 'How does AI benefit sales teams?',
  //     answer: `AI tools help sales teams by providing predictive analytics, personalized recommendations, and automated outreach strategies. This helps teams focus on high-priority leads and optimize customer interactions, resulting in better sales performance.`
  //   },
  //   {
  //     question: 'What are the benefits of using developer AI tools?',
  //     answer: {
  //       content: 'The benefits of using developer AI tools include increased productivity, faster development ',
  //       type: 'list',
  //       data: [
  //         { primary: `Cycles, improved code quality, reduced manual effort, enhanced collaboration` },
  //         {
  //           primary:
  //             'It acts as a virtual guide, offering insights, tips, and solutions to common challenges faced during the development journey.'
  //         },
  //         { primary: 'Take action based on the data to enhance relationships, sales, and business success.' }
  //       ],
  //       color: ListBadgeColors.WHITE
  //     }
  //   },
  //   {
  //     question: 'Can developer AI tools replace human developers?',
  //     answer: `While AI tools can assist in the development process and improve efficiency, they cannot replace human developers. These tools enhance human capabilities by automating repetitive tasks and providing smart suggestions, but creativity, critical thinking, and complex problem-solving still require human expertise.`
  //   }
  // ],
  getInTouch: {
    title: 'Have a question outside these FAQs ?',
    description: `If you have any further questions or need assistance, our team is ready to help.`,
    link: { children: 'Get in Touch', href: '/contact', rel: 'noopener noreferrer' }
  },
  bgImage: '/assets/images/graphics/ai/background1.svg'
};
