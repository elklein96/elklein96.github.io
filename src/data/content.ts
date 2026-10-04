// All site copy lives here. Edit this file to update the site.

export const site = 'https://evanklein.tech/'

const press = {
  techradar:
    'https://www.techradar.com/streaming/entertainment/we-tried-to-keep-the-soul-of-the-original-attraction-but-level-it-up-disney-world-transforms-buzz-lightyear-space-ranger-spin-into-a-real-time-ride-system-powered-by-unreal-engine',
  finalPlaytests: 'https://www.youtube.com/shorts/EziuNjnMPOM',
  gameplayTests: 'https://www.youtube.com/shorts/wRc-jShphtU',
}

export const profile = {
  name: 'Evan Klein',
  title: 'Manager, Software Product Engineering',
  org: 'Walt Disney Imagineering',
  location: 'Orlando, FL',
  email: 'elklein96@gmail.com',
  github: 'https://github.com/elklein96',
  linkedin: 'https://www.linkedin.com/in/elklein96',
  photo: '/img/evan-klein.jpg',
  shareImage: '/img/evan-klein-share.jpg',
}

export interface Project {
  name: string
  where: string
  year: string
  summary: string
  highlights: string[]
  tags: string[]
  links?: { label: string; href: string }[]
}

export const projects: Project[] = [
  {
    name: "Buzz Lightyear's Space Ranger Spin",
    where: 'Magic Kingdom',
    year: '2026',
    summary:
      'A ground-up modernization of a classic interactive dark ride that keeps the original story and layout but rebuilds how it plays. Blasters lift free of the vehicle, targets react to every hit, and scoring changes throughout the ride.',
    highlights: [
      'Two Unreal Engine instances on every ride vehicle, one per guest, rendering scores and rank progression in real time',
      'Targets that light up, change color and carry dynamic point values, with haptic and audio feedback in each blaster',
      'More than 200 networked machines keeping vehicles, targets and scoring in sync',
      'Prototyped with Pixar in a virtual pre-visualization of the full attraction, reviewed in VR',
    ],
    tags: ['Unreal Engine', 'Embedded real-time', 'Distributed systems'],
    links: [
      { label: 'TechRadar interview', href: press.techradar },
      { label: 'Watch the final playtests', href: press.finalPlaytests },
    ],
  },
  {
    name: 'Millennium Falcon: Smugglers Run × Fortnite',
    where: "Disneyland & Disney's Hollywood Studios",
    year: '2026',
    summary:
      'Connects a flight-simulator attraction to Fortnite, so a ride in the park carries over into the game at home.',
    highlights: [
      'Guests accept a mission in the Disney app, then fly the Falcon to complete it',
      'In-ride scores become credits on the Smugglers Gambit island in Fortnite',
      'Rewards, including an exclusive outfit, delivered through linked MyDisney and Epic Games accounts',
    ],
    tags: ['Fortnite', 'Epic Games', 'Park-to-game integration'],
    links: [
      {
        label: 'TechRadar coverage',
        href: 'https://www.techradar.com/streaming/entertainment/a-first-step-not-a-finish-line-disney-and-epic-games-have-connected-disney-worlds-and-disneylands-millennium-falcon-smugglers-run-to-a-brand-new-star-wars-adventure-in-fortnite',
      },
    ],
  },
  {
    name: 'Olaf Draws!',
    where: "Disney's Hollywood Studios",
    year: '2026',
    summary:
      'A drawing class at The Magic of Disney Animation, hosted by an Olaf animatronic alongside Disney animators.',
    highlights: [
      'Helped build the programming and control systems behind the Olaf figure',
      'Olaf hosts from his own desk on stage, with new dialogue recorded by Josh Gad',
      'Guests sketch characters from Mickey to Moana at animator-style workstations',
    ],
    tags: ['Animatronics', 'Control systems'],
    links: [
      {
        label: 'TechRadar coverage',
        href: 'https://www.techradar.com/streaming/entertainment/olaf-is-hosting-a-drawing-class-at-disney-world-and-yes-hell-teach-you-to-draw-himself',
      },
      { label: 'Attraction page', href: 'https://disneyworld.disney.go.com/attractions/hollywood-studios/olaf-draws-animation-class/' },
    ],
  },
  {
    name: 'Star Wars: Galactic Starcruiser',
    where: 'Walt Disney World',
    year: '2022',
    summary:
      'Lead technical architect on the Guest Experience System behind the two-night immersive Star Wars adventure.',
    highlights: [
      'Built the simulation, testing and automation tooling used to deliver the system',
      'Added observability, monitoring and resiliency work to harden it for operation',
      'Led the team that sustained it and shipped new interactive features after launch',
    ],
    tags: ['Interactive systems', 'Simulation', 'Observability'],
  },
  {
    name: 'shopDisney MerchPass',
    where: 'shopDisney',
    year: '2020',
    summary:
      'A drawing-based system for releasing high-demand, limited-edition merchandise on shopDisney. Instead of racing traffic spikes and bots at drop time, guests enter a drawing per item, and those selected get early access with the item already waiting in their bag.',
    highlights: [
      'Worked with shopDisney teams to architect, develop and deploy the guest-facing system, and led its development',
      'Serverless on AWS (Lambda, DynamoDB, S3) behind Akamai, with an Angular and Node.js front end',
      'Launched in July 2020 with the Arendelle Castle release, then used for collections like Minnie Mouse: The Main Attraction',
    ],
    tags: ['AWS Lambda', 'DynamoDB', 'Akamai', 'Angular'],
    links: [
      {
        label: 'Launch coverage',
        href: 'https://www.disneyfoodblog.com/2020/07/09/disney-just-introduced-a-way-to-get-early-access-to-high-demand-merchandise-releases-online/',
      },
    ],
  },
]

export interface Mention {
  title: string
  detail: string
  kind: 'talk' | 'article' | 'video'
  date: string // ISO date, used for structured data
  href?: string
  thumbnail?: string
}

// Newest first.
export const speaking: Mention[] = [
  {
    title: 'To Infinity and Data!',
    detail: 'Disney Data & Analytics Conference (DDAC) · Orlando, FL · September 2026',
    kind: 'talk',
    date: '2026-09',
  },
  {
    title: "Interview: Reimagining Buzz Lightyear's Space Ranger Spin",
    detail: 'TechRadar · May 2026',
    kind: 'article',
    date: '2026-05-15',
    href: press.techradar,
  },
  {
    title: "Final playtests for Buzz Lightyear's Space Ranger Spin",
    detail: 'Walt Disney Imagineering on YouTube · March 2026',
    kind: 'video',
    date: '2026-03-12',
    href: press.finalPlaytests,
    thumbnail: 'https://i.ytimg.com/vi/EziuNjnMPOM/hqdefault.jpg',
  },
  {
    title: "Testing new gameplay for Buzz Lightyear's Space Ranger Spin",
    detail: 'Walt Disney Imagineering on YouTube · March 2025',
    kind: 'video',
    date: '2025-03-26',
    href: press.gameplayTests,
    thumbnail: 'https://i.ytimg.com/vi/wRc-jShphtU/hqdefault.jpg',
  },
]

export interface SideProject {
  press?: { headline: string; date: string } // set when href is a news article rather than a repo
  name: string
  blurb: string
  tech: string
  href?: string
}

export const sideProjects: SideProject[] = [
  {
    name: 'spotify-dl',
    blurb: 'Downloads full Spotify playlists by matching each track to its best YouTube source.',
    tech: 'Node.js · Spotify API · YouTube API',
    href: 'https://github.com/elklein96/spotify-dl',
  },
  {
    name: 'reelr',
    blurb: 'A lightweight movie server for the Raspberry Pi that streams files as-is, no transcoding.',
    tech: 'JavaScript · PHP',
    href: 'https://github.com/elklein96/reelr',
  },
  {
    name: 'Gesture-controlled robotic arm',
    blurb: 'An arm that mirrors its user, tracked through a Wiimote IR camera. First place, Coriell Science Fair.',
    tech: 'Arduino · Wiimote IR',
    href: 'https://github.com/elklein96/gesture-controlled-robotic-arm',
  },
  {
    name: 'LehighHacks',
    blurb: "Founded Lehigh University's hackathon and ran two 36-hour events with 150+ hackers each.",
    tech: 'Organizer · Featured in Lehigh News',
    href: 'https://news.lehigh.edu/a-good-day-for-data',
    press: { headline: 'A Good Day for Data', date: '2016-07-05' },
  },
]
