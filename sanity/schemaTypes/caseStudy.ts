import { defineField, defineType } from 'sanity'

export const caseStudyType = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({ name: 'sector', title: 'Sector', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'region', title: 'Region', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'situation', title: 'Situation', type: 'text', rows: 4, validation: (r) => r.required() }),
    defineField({ name: 'outcome', title: 'Outcome', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'partner',
      title: 'Partner lead',
      type: 'string',
      options: {
        list: [
          { title: 'Mahmoud Gao', value: 'Mahmoud Gao' },
          { title: 'Tiba Al-Damen', value: 'Tiba Al-Damen' },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'order', title: 'Display order', type: 'number' }),
  ],
  orderings: [{ title: 'Display order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
})
