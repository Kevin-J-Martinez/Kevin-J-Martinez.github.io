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
        text: "I'm **Kevin**, an economics student right now, and I'm interested in economics research. What type of research? I don't know yet — I'm keeping an open mind.\n I want to work at the central bank in my country. I love learning and research; I firmly believe they are engines for human evolution, and that whatever we build should never be built on nothing. I write a blog here — essays and analysis. For now, I'm focused on studying economics through my remaining semesters while publishing opinion essays and analyses on a variety of topics.\n Most of my posts will be in Spanish, with the occasional one in English.\n Feel free to explore some of my coding endeavors on [GitHub](https://github.com/Kevin-J-Martinez), follow me on [Twitter/X](https://x.com/IncPersonales), or check out my [Instagram](https://www.instagram.com/keveeeeeeeeeeen/).",
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
