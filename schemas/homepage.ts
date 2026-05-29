import { defineType, defineField, defineArrayMember } from 'sanity'

export const homepageType = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  groups: [
    { name: 'hero',      title: '🎬 Hero' },
    { name: 'services',  title: '🛠 Services' },
    { name: 'stats',     title: '📊 Stats' },
    { name: 'community', title: '👥 Community' },
    { name: 'niko',      title: '🐾 Niko' },
    { name: 'contact',   title: '✉️ Contact' },
  ],
  fields: [
    // ── Hero ──────────────────────────────────────────────
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      group: 'hero',
      description: 'Appears over the video. Use \\n for a line break.',
      initialValue: 'This website connects\ntenants to landlords directly.',
    }),

    // ── Services ──────────────────────────────────────────
    defineField({
      name: 'services',
      title: 'Service Cards',
      type: 'array',
      group: 'services',
      of: [defineArrayMember({
        type: 'object',
        name: 'service',
        fields: [
          defineField({ name: 'title', title: 'Title', type: 'string' }),
          defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
        ],
        preview: { select: { title: 'title' } },
      })],
    }),

    // ── Stats ─────────────────────────────────────────────
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      group: 'stats',
      of: [defineArrayMember({
        type: 'object',
        name: 'stat',
        fields: [
          defineField({ name: 'value', title: 'Value (e.g. 100%)', type: 'string' }),
          defineField({ name: 'label', title: 'Label (e.g. Occupied)', type: 'string' }),
          defineField({ name: 'sub',   title: 'Description', type: 'string' }),
        ],
        preview: { select: { title: 'value', subtitle: 'label' } },
      })],
    }),

    // ── Community ─────────────────────────────────────────
    defineField({
      name: 'communityHeadline',
      title: 'Headline',
      type: 'string',
      group: 'community',
      initialValue: 'Thousands of Bakersfield\nRenters Trust This Group.',
    }),
    defineField({
      name: 'communityDescription',
      title: 'Description',
      type: 'text',
      rows: 4,
      group: 'community',
    }),
    defineField({
      name: 'facebookUrl',
      title: 'Facebook Group URL',
      type: 'url',
      group: 'community',
    }),

    // ── Niko ──────────────────────────────────────────────
    defineField({
      name: 'nikoHeadline',
      title: 'Headline',
      type: 'string',
      group: 'niko',
      initialValue: 'Meet Niko',
    }),
    defineField({
      name: 'nikoDescription',
      title: 'Description',
      type: 'text',
      rows: 3,
      group: 'niko',
    }),
    defineField({
      name: 'nikoPhotos',
      title: 'Photos (up to 4)',
      type: 'array',
      group: 'niko',
      of: [defineArrayMember({ type: 'image', options: { hotspot: true } })],
      validation: Rule => Rule.max(4),
    }),
    defineField({
      name: 'nikoCards',
      title: 'Feature Cards',
      type: 'array',
      group: 'niko',
      of: [defineArrayMember({
        type: 'object',
        name: 'nikoCard',
        fields: [
          defineField({ name: 'icon', title: 'Icon (emoji)', type: 'string' }),
          defineField({ name: 'title', title: 'Title', type: 'string' }),
          defineField({ name: 'desc', title: 'Description', type: 'string' }),
        ],
        preview: { select: { title: 'title', subtitle: 'icon' } },
      })],
    }),

    // ── Contact ───────────────────────────────────────────
    defineField({
      name: 'contactHeadline',
      title: 'Headline',
      type: 'string',
      group: 'contact',
      initialValue: "Let's Make It\nSimple from Here.",
    }),
    defineField({
      name: 'contactDescription',
      title: 'Description',
      type: 'text',
      rows: 3,
      group: 'contact',
    }),
  ],
})
