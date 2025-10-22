const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(module.exports = {
  title: 'ASUS Jetson Series and Arm-based Devices',
  //tagline: 'Dinosaurs are cool',
  url: 'https://asus-ipc.github.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  //favicon: 'img/favicon.ico',
  favicon: 'img/asusiot.png',
  organizationName: 'ASUS-IPC', // Usually your GitHub org/user name.
  projectName: 'asus-ipc.github.io', // Usually your repo name.

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          //editUrl: 'https://github.com/ASUS-IPC/asus-ipc.github.io/tree/main/',
          showLastUpdateTime: true,
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          //editUrl:
          //  'https://github.com/ASUS-IPC/asus-ipc.github.io/tree/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'ASUS IoT',
        logo: {
          alt: 'ASUS IoT Logo',
          src: 'img/asusiot.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'getting-started',
            position: 'left',
            label: 'Docs',
          },
          //{to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/ASUS-IPC',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'ASUS',
            items: [
              {
                label: 'ASUS',
                href: 'https://www.asus.com',
              },
              {
                label: 'ASUS IoT',
                href: 'https://iot.asus.com',
              },
            ],
          },
          {
            title: 'Jetson Series',
            items: [
              {
                label: 'Website',
                href: 'https://www.asus.com/content/edge-ai-nvidia-jetson-series/',
              },
              {
                label: 'Wiki',
                href: 'https://github.com/ASUS-IPC/ASUS-IPC/wiki',
              },
            ],
          },
          {
            title: 'Arm-Based Devices',
            items: [
              {
                label: 'Website',
                href: 'https://iot.asus.com/embedded-computers-edge-ai-systems/arm-based-gateways/filter?Series=Arm-based-Gateways',
              },
              {
                label: 'Wiki',
                href: 'https://github.com/ASUS-IPC/ASUS-IPC/wiki',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'ASUS-IPC GitHub',
                href: 'https://github.com/ASUS-IPC',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} ASUSTeK Computer Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
});
