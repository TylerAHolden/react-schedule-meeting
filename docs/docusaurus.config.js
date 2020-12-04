module.exports = {
  title: 'React Schedule Meeting',
  tagline: 'A simple agnostic React UI for scheduling',
  url: 'https://react-schedule-meeting.netlify.app/',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'TylerAHolden', // Usually your GitHub org/user name.
  projectName: 'react-schedule-meeting', // Usually your repo name.
  themeConfig: {
    gtag: {
      trackingID: 'UA-255141691',
    },
    announcementBar: {
      id: 'supportus',
      backgroundColor: '#222',
      textColor: '#fff',
      content:
        '⭐️ If you like React Schedule Meeting, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/TylerAHolden/react-schedule-meeting">GitHub</a>! ⭐️',
    },
    colorMode: {
      // "light" | "dark"
      defaultMode: 'light',

      // Hides the switch in the navbar
      // Useful if you want to support a single color mode
      disableSwitch: true,

      // Should we use the prefers-color-scheme media-query,
      // using user system preferences, instead of the hardcoded defaultMode
      respectPrefersColorScheme: false,
    },

    navbar: {
      title: 'React Schedule Meeting',
      logo: {
        alt: 'React Schedule Meeting Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'right',
        },
        // {to: 'blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/TylerAHolden/react-schedule-meeting',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'light',
      logo: {
        alt: 'React Schedule Meeting Logo',
        src: 'img/logo.svg',
        href: 'https://react-schedule-meeting.netlify.app/',
      },
      links: [
        {
          title: 'Getting Started',
          items: [
            {
              label: 'Installation',
              to: 'docs/installation',
            },
            {
              label: 'Usage',
              to: 'docs/usage',
            },
          ],
        },
        {
          title: 'Overview',
          items: [
            {
              label: 'Introduction',
              to: 'docs/',
            },
            {
              label: 'Contributing',
              to: 'docs/contributing',
            },
          ],
        },
        {
          title: 'Creators',
          items: [
            {
              label: 'Tyler Holden',
              to: 'https://github.com/TylerAHolden',
            },
            {
              label: 'Justin Mozley',
              to: 'https://github.com/jtmozley',
            },
            {
              label: 'Devion Villegas',
              to: 'https://github.com/d3vhound',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} React Schedule Meeting`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/TylerAHolden/react-schedule-meeting/edit/master/docs/',
        },
        // blog: {
        //   showReadingTime: true,
        //   // Please change this to your repo.
        //   editUrl:
        //     'https://github.com/TylerAHolden/react-schedule-meeting/edit/master/website/blog/',
        // },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
