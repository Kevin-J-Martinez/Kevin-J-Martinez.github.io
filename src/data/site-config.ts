import avatar from '../assets/images/avatar.jpg';
import hero from '../assets/images/hero.jpg';
import type { SiteConfig } from '../types';

const siteConfig: SiteConfig = {
    website: 'https://kevin-j-martinez.github.io/',
    avatar: {
        src: avatar,
        alt: 'Ethan Donovan'
    },
    title: 'Kevin Martinez',
    subtitle: 'So far so good',
    description: 'Im Kevin an economics student rigth now, im interesting on economics research, What type of research? Idk now, im waiting with open mind. I wanna work in the central bank in my country.',
    image: {
        src: '/dante-preview.jpg',
        alt: 'Dante - Astro.js and Tailwind CSS theme'
    },
    headerNavLinks: [
        {
            text: 'Home',
            href: '/'
        },
        {
            text: 'Projects',
            href: '/projects'
        },
        {
            text: 'Blog',
            href: '/blog'
        },
        {
            text: 'Github',
            href: 'https://github.com/Kevin-J-Martinez'
        }
    ],
    footerNavLinks: [
        {
            text: 'About',
            href: '/about'
        },
        {
            text: 'Contact',
            href: '/contact'
        },
        {
            text: 'Terms',
            href: '/terms'
        }
    ],
    socialLinks: [
        {
            text: 'Linkedin',
            href: 'https://www.linkedin.com/in/kevin-j-mart%C3%ADnez-/'
        },
        {
            text: 'Instagram',
            href: 'https://instagram.com/'
        },
        {
            text: 'X/Twitter',
            href: 'https://twitter.com/'
        }
    ],
    hero: {
        title: 'Hi There and welcome!',
        text: "Im **Kevin**, an economics student right now, and Im interested in economics research. \n What type of research? I dont know yet — Im keeping an open mind. I want to work at the central bank in my country. \n I write a blog here — essays and analysis.\n I have a profound appreciation for top-notch software, visual design, and the principles of product-led growth.\n Feel free to explore some of my coding endeavors on [GitHub](https://github.com/Kevin-J-Martinez), follow me on [Twitter/X](https://x.com/IncPersonales), or check out my [Instagram](https://www.instagram.com/keveeeeeeeeeeen/).\n For now, Im focused on studying economics through my remaining semesters while publishing opinion essays and analyses on a variety of topics. Most of my posts will be in Spanish, with the occasional one in English.",
        image: {
            src: hero,
            alt: 'A person sitting at a desk in front of a computer'
        },
        actions: [
            {
                text: 'Get in Touch',
                href: '/contact'
            }
        ]
    },
    subscribe: {
        enabled: true,
        title: 'Subscribe to Dante Newsletter',
        text: 'One update per week. All the latest posts directly in your inbox.',
        form: {
            action: '#'
        }
    },
    postsPerPage: 8,
    projectsPerPage: 8
};

export default siteConfig;
