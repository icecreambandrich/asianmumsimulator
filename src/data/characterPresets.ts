import { AvatarConfig } from '../Avatar/Avatar'

export interface CharacterPreset {
  id: string
  name: string
  description: string
  emoji: string
  config: AvatarConfig
  backstory: string
}

export const CHARACTER_PRESETS: CharacterPreset[] = [
  {
    id: 'tiger-mom',
    name: 'Tiger Mom Supreme',
    description: 'Maximum discipline, minimum mercy',
    emoji: '🐅',
    config: {
      look: 'classic',
      disciplineStyle: 'physical',
      weapon: 'slipper',
      weaponSide: 'right'
    },
    backstory: 'Raised 5 kids who all became doctors. Has a PhD in disappointment and a black belt in guilt trips.'
  },
  {
    id: 'corporate-boss',
    name: 'CEO Mom',
    description: 'Runs the household like a Fortune 500 company',
    emoji: '👩‍💼',
    config: {
      look: 'corporate',
      disciplineStyle: 'lecture',
      weapon: 'spoon',
      weaponSide: 'right'
    },
    backstory: 'Schedules family fun time in Outlook. Has a KPI dashboard for chores and a performance review system for grades.'
  },
  {
    id: 'zen-master',
    name: 'Zen Mum',
    description: 'Peaceful warrior of wisdom',
    emoji: '🧘‍♀️',
    config: {
      look: 'grandma',
      disciplineStyle: 'silent',
      weapon: 'stare',
      weaponSide: 'right'
    },
    backstory: 'Achieved enlightenment after the third child. Can induce shame through meditation and mindful disappointment.'
  },
  {
    id: 'influencer-mom',
    name: 'Insta Mum',
    description: 'Aesthetic parenting with perfect lighting',
    emoji: '📸',
    config: {
      look: 'insta',
      disciplineStyle: 'verbal',
      weapon: 'duster',
      weaponSide: 'left'
    },
    backstory: 'Has 50K followers watching her "authentic" parenting journey. Makes even punishment look Instagram-worthy.'
  },
  {
    id: 'random',
    name: 'Surprise Me!',
    description: 'Random combination for the adventurous',
    emoji: '🎲',
    config: {
      look: 'classic', // Will be randomized
      disciplineStyle: 'silent', // Will be randomized
      weapon: 'slipper', // Will be randomized
      weaponSide: 'right'
    },
    backstory: 'Every family is unique, and so is every mum. Let fate decide your parenting style!'
  }
]

export const getRandomPreset = (): CharacterPreset => {
  const looks: AvatarConfig['look'][] = ['classic', 'corporate', 'insta', 'grandma']
  const disciplines: AvatarConfig['disciplineStyle'][] = ['silent', 'verbal', 'lecture', 'physical']
  const weapons: AvatarConfig['weapon'][] = ['slipper', 'spoon', 'duster', 'stare']
  const sides: AvatarConfig['weaponSide'][] = ['left', 'right']

  const randomConfig: AvatarConfig = {
    look: looks[Math.floor(Math.random() * looks.length)],
    disciplineStyle: disciplines[Math.floor(Math.random() * disciplines.length)],
    weapon: weapons[Math.floor(Math.random() * weapons.length)],
    weaponSide: sides[Math.floor(Math.random() * sides.length)]
  }

  return {
    ...CHARACTER_PRESETS[4], // Random preset template
    config: randomConfig,
    backstory: `A unique blend of ${randomConfig.look} style with ${randomConfig.disciplineStyle} discipline, wielding the mighty ${randomConfig.weapon}!`
  }
}
