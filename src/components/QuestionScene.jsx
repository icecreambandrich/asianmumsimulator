import React, { useState } from 'react'

const QUESTION_SCENARIOS = [
  {
    id: 0,
    situation: "Your child comes home with a B+ on their math test",
    emoji: "📝",
    background: "The other kids in the class got A's. Your child seems proud of their grade.",
    choices: [
      {
        text: "Great job! Let's celebrate with ice cream! 🍦",
        reaction: "Your child beams with joy but you wonder if you're being too soft...",
        statChanges: { zenPoints: 15, tigerPoints: -10, stress: -5, reputation: -5 },
        funny: "Child posts on social media: 'My mum is the coolest!' Other mums: 👀"
      },
      {
        text: "B+? Why not A+? We need to study harder! 📚",
        reaction: "Your child sighs and nods. Time for extra practice sessions.",
        statChanges: { tigerPoints: 20, zenPoints: -10, stress: 10, reputation: 10 },
        funny: "Neighbor mum: 'Wah, so strict!' You: 'That's why my kid will be doctor!'"
      },
      {
        text: "Let's see where you made mistakes and improve next time 🤔",
        reaction: "A balanced approach. Your child appreciates the constructive feedback.",
        statChanges: { zenPoints: 5, tigerPoints: 5, reputation: 5 },
        funny: "You channel your inner zen master while secretly planning tutoring sessions."
      },
      {
        text: "*Deploy the weapon* Time for some motivation! 🥿",
        reaction: "The fear of the flying slipper motivates immediate study plans.",
        statChanges: { tigerPoints: 25, stress: 15, reputation: -5 },
        funny: "Child's friends: 'Why are you so good at dodging?' Your child: 'Training.'"
      }
    ]
  },
  {
    id: 1,
    situation: "You catch your teenager on their phone at 2 AM",
    emoji: "📱",
    background: "It's a school night and you hear TikTok sounds coming from their room.",
    choices: [
      {
        text: "Confiscate the phone immediately! 📵",
        reaction: "Phone goes into mum jail. Your teen gives you the death stare.",
        statChanges: { tigerPoints: 20, stress: 10, reputation: 5 },
        funny: "Teen: 'This is literally 1984!' You: 'Good, you're reading classics now!'"
      },
      {
        text: "Have a calm discussion about sleep importance 💤",
        reaction: "You explain the science of sleep. They pretend to listen.",
        statChanges: { zenPoints: 10, tigerPoints: -5, reputation: -5 },
        funny: "You: 'Sleep is important for brain development.' Teen: 'What brain?'"
      },
      {
        text: "Join them and start watching TikToks together 📺",
        reaction: "Bonding time! But now you're both up until 3 AM.",
        statChanges: { zenPoints: 15, stress: 20, reputation: -10 },
        funny: "Next day at work: 'Why are you so tired?' You: 'Research on teen culture.'"
      },
      {
        text: "Silent treatment with disappointed face 😞",
        reaction: "The power of mum guilt is strong. They put the phone away.",
        statChanges: { tigerPoints: 15, reputation: 10, stress: -5 },
        funny: "Teen to friends: 'She didn't even say anything but I felt my soul leave my body.'"
      }
    ]
  },
  {
    id: 2,
    situation: "Your child wants to quit piano lessons after 3 years",
    emoji: "🎹",
    background: "They say it's boring and they want to try skateboarding instead.",
    choices: [
      {
        text: "Absolutely not! You've invested too much! 💰",
        reaction: "Piano practice continues with extra supervision.",
        statChanges: { tigerPoints: 25, stress: 15, reputation: 5 },
        funny: "You: 'I didn't pay for 3 years so you could quit!' Child: 'Sunk cost fallacy, mum.'"
      },
      {
        text: "Let them explore their interests 🛹",
        reaction: "Freedom to choose! But there goes your dream of Carnegie Hall.",
        statChanges: { zenPoints: 20, tigerPoints: -15, reputation: -10 },
        funny: "Other mums: 'Your child quit piano?' You: 'They're following their passion!' *cries inside*"
      },
      {
        text: "Compromise: Piano 3 days, skateboard 2 days ⚖️",
        reaction: "A diplomatic solution that satisfies no one completely.",
        statChanges: { zenPoints: 10, tigerPoints: 5, stress: 5 },
        funny: "Child: 'This is worse than just picking one!' You: 'Welcome to adulting!'"
      },
      {
        text: "Make them perform for relatives first 🎭",
        reaction: "Public performance pressure - the ultimate test!",
        statChanges: { tigerPoints: 20, stress: 10, reputation: 15 },
        funny: "Relatives: 'Wah so talented!' Child: *plays Chopsticks* You: 'See? Natural performer!'"
      }
    ]
  },
  {
    id: 3,
    situation: "Your child's friend is a 'bad influence'",
    emoji: "👥",
    background: "Their grades are dropping and they're using slang you don't understand.",
    choices: [
      {
        text: "Ban the friendship immediately! 🚫",
        reaction: "Friendship terminated. Your child plots secret meetings.",
        statChanges: { tigerPoints: 25, stress: 20, reputation: -5 },
        funny: "Child: 'You can't control my life!' You: 'Watch me!' *blocks friend on all platforms*"
      },
      {
        text: "Invite the friend over to assess them 🕵️",
        reaction: "Intelligence gathering mission activated.",
        statChanges: { tigerPoints: 15, zenPoints: 5, reputation: 5 },
        funny: "You: 'So what are your career plans?' Friend: 'Uh... TikTok influencer?' You: 😱"
      },
      {
        text: "Trust your child's judgment 🤝",
        reaction: "Faith in your parenting pays off... hopefully.",
        statChanges: { zenPoints: 15, tigerPoints: -10, stress: 10 },
        funny: "Inner voice: 'This could go very wrong.' Outer voice: 'I trust you, sweetie!'"
      },
      {
        text: "Befriend the friend's parents for intel 📞",
        reaction: "Strategic alliance formed. Information network established.",
        statChanges: { tigerPoints: 10, reputation: 15, stress: 5 },
        funny: "You: 'Coffee?' Other mum: 'Sure!' You: 'So about your child's influence on mine...'"
      }
    ]
  },
  {
    id: 4,
    situation: "Your child forgot their lunch money again",
    emoji: "🍱",
    background: "Third time this week. They're calling from school asking you to bring money.",
    choices: [
      {
        text: "Drop everything and bring money 🏃‍♀️",
        reaction: "Crisis averted but you're enabling forgetfulness.",
        statChanges: { zenPoints: 5, tigerPoints: -10, stress: 15 },
        funny: "Boss: 'Where are you going?' You: 'Emergency lunch money delivery!' Boss: 😐"
      },
      {
        text: "Let them figure it out themselves 🤷‍♀️",
        reaction: "Tough love activated. They learn to ask friends or go hungry.",
        statChanges: { tigerPoints: 20, zenPoints: -5, stress: 10 },
        funny: "Child: 'I'm starving!' You: 'Good, builds character!' *secretly feels guilty*"
      },
      {
        text: "Lecture them about responsibility first 📢",
        reaction: "20-minute phone lecture about planning and consequences.",
        statChanges: { tigerPoints: 15, reputation: 5, stress: 5 },
        funny: "School secretary: 'Your mum is still talking...' Child: 'I know, she's just getting started.'"
      },
      {
        text: "Bring lunch but make it embarrassing 😈",
        reaction: "Homemade lunch in a cartoon lunchbox with love notes.",
        statChanges: { tigerPoints: 20, reputation: 10, stress: -5 },
        funny: "Child: 'Is that a My Little Pony lunchbox?' You: 'With extra love and shame!'"
      }
    ]
  },
  {
    id: 5,
    situation: "Your child wants to dye their hair bright blue",
    emoji: "💙",
    background: "They say it's for 'self-expression' and 'finding their identity'.",
    choices: [
      {
        text: "Over my dead body! 💀",
        reaction: "Hair remains natural. Identity crisis continues.",
        statChanges: { tigerPoints: 25, stress: 15, reputation: 10 },
        funny: "Child: 'But it's just hair!' You: 'Just hair? JUST HAIR?!' *faints dramatically*"
      },
      {
        text: "Sure, but you pay for it 💰",
        reaction: "They suddenly realize hair dye is expensive.",
        statChanges: { zenPoints: 10, tigerPoints: 5, reputation: -5 },
        funny: "Child: 'How much?!' Hairdresser: '$200.' Child: 'Actually, brown is nice too...'"
      },
      {
        text: "Temporary dye only! 🎨",
        reaction: "Compromise reached. Blue hair for a month.",
        statChanges: { zenPoints: 15, tigerPoints: -5, reputation: 5 },
        funny: "Relatives at dinner: 'What happened to your hair?' Child: 'Art!' You: 'Don't ask.'"
      },
      {
        text: "I'll dye mine too! 👩‍🎤",
        reaction: "Bonding through rebellion! Neighbors are confused.",
        statChanges: { zenPoints: 20, stress: 10, reputation: -15 },
        funny: "Grocery store clerk: 'Are you in a band?' You: 'No, I'm just a cool mum!' *regrets immediately*"
      }
    ]
  },
  {
    id: 6,
    situation: "Your child broke something expensive in the house",
    emoji: "💥",
    background: "Your favorite vase is now in pieces. They look terrified.",
    choices: [
      {
        text: "Accidents happen, let's clean up 🧹",
        reaction: "Grace under pressure. Your child is relieved and grateful.",
        statChanges: { zenPoints: 20, tigerPoints: -10, reputation: 5 },
        funny: "Child: 'You're not mad?' You: 'I'm dead inside, but we'll survive.' *smiles through pain*"
      },
      {
        text: "You're paying for this! 💸",
        reaction: "Allowance garnished for the next 6 months.",
        statChanges: { tigerPoints: 20, stress: 5, reputation: 5 },
        funny: "Child: 'But I only get $5 a week!' You: 'Better start a payment plan!'"
      },
      {
        text: "WHY WERE YOU RUNNING IN THE HOUSE?! 😡",
        reaction: "Full mum rage activated. Neighbors hear the lecture.",
        statChanges: { tigerPoints: 25, stress: 20, reputation: -5 },
        funny: "Neighbor texts: 'Everything okay?' You: 'Just some property damage and life lessons!'"
      },
      {
        text: "Time for extra chores to learn responsibility 🧽",
        reaction: "House will be spotless for weeks.",
        statChanges: { tigerPoints: 15, zenPoints: 5, reputation: 10 },
        funny: "Child: 'How long do I have to do chores?' You: 'Until you understand the value of things!' Child: 'So... forever?'"
      }
    ]
  },
  {
    id: 7,
    situation: "Your teenager wants to go to a party you know nothing about",
    emoji: "🎉",
    background: "They just mentioned it casually. No details about supervision or timing.",
    choices: [
      {
        text: "Absolutely not without details! 🚫",
        reaction: "Full interrogation mode activated.",
        statChanges: { tigerPoints: 25, stress: 10, reputation: 10 },
        funny: "You: 'Who, what, where, when, why, and how?' Teen: 'It's not a job interview!' You: 'It is now!'"
      },
      {
        text: "I'll drop you off and pick you up 🚗",
        reaction: "Helicopter parenting at its finest.",
        statChanges: { tigerPoints: 15, stress: 15, reputation: -5 },
        funny: "Teen: 'Can you drop me off a block away?' You: 'No, I'm walking you to the door!'"
      },
      {
        text: "Have fun, text me every hour 📱",
        reaction: "Trust with surveillance. Modern parenting.",
        statChanges: { zenPoints: 10, tigerPoints: 5, stress: 20 },
        funny: "Teen: 'Every hour?' You: 'Actually, every 30 minutes. I worry!' *sets 47 alarms*"
      },
      {
        text: "I'm chaperoning this party! 🕵️‍♀️",
        reaction: "Ultimate embarrassment strategy deployed.",
        statChanges: { tigerPoints: 30, reputation: 15, stress: -10 },
        funny: "Teen: 'You can't be serious!' You: 'Watch me bring snacks and baby photos!'"
      }
    ]
  }
]

const QuestionScene = ({ round, character, onComplete, sceneComplete }) => {
  const [selectedChoice, setSelectedChoice] = useState(null)
  const [showResult, setShowResult] = useState(false)

  const currentScenario = QUESTION_SCENARIOS[round % QUESTION_SCENARIOS.length]

  const handleChoice = (choiceIndex) => {
    if (sceneComplete) return
    
    setSelectedChoice(choiceIndex)
    setShowResult(true)
    
    const choice = currentScenario.choices[choiceIndex]
    setTimeout(() => {
      onComplete({
        type: 'question',
        scenario: currentScenario.situation,
        choice: choice.text,
        reaction: choice.reaction,
        funny: choice.funny,
        statChanges: choice.statChanges
      })
    }, 2000)
  }

  return (
    <div className="bg-white/90 rounded-2xl p-8 shadow-xl">
      {/* Scenario */}
      <div className="text-center mb-8">
        <div className="text-8xl mb-4">{currentScenario.emoji}</div>
        <h2 className="text-2xl font-bold text-tiger-red mb-4">
          {currentScenario.situation}
        </h2>
        <p className="text-lg text-gray-700 italic">
          {currentScenario.background}
        </p>
      </div>

      {!showResult ? (
        /* Choices */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentScenario.choices.map((choice, index) => (
            <button
              key={index}
              onClick={() => handleChoice(index)}
              className="mum-card text-left p-6 hover:scale-105 transition-all duration-300 hover:bg-red-50"
            >
              <div className="text-lg font-semibold text-tiger-red mb-2">
                {choice.text}
              </div>
              <div className="text-sm text-gray-600">
                {Object.entries(choice.statChanges).map(([stat, change]) => (
                  <span key={stat} className={`inline-block mr-2 ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {stat}: {change > 0 ? '+' : ''}{change}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      ) : (
        /* Result */
        <div className="text-center space-y-6">
          <div className="bg-yellow-100 rounded-xl p-6 border-4 border-yellow-400">
            <h3 className="text-xl font-bold text-tiger-red mb-4">Your Choice:</h3>
            <p className="text-lg mb-4">"{currentScenario.choices[selectedChoice].text}"</p>
            
            <div className="bg-white rounded-lg p-4 mb-4">
              <h4 className="font-bold text-gray-700 mb-2">What Happened:</h4>
              <p className="text-gray-700">{currentScenario.choices[selectedChoice].reaction}</p>
            </div>
            
            <div className="bg-pink-100 rounded-lg p-4">
              <h4 className="font-bold text-mum-pink mb-2">Meanwhile... 😂</h4>
              <p className="text-gray-700 italic">{currentScenario.choices[selectedChoice].funny}</p>
            </div>
          </div>

          {/* Stat Changes */}
          <div className="bg-blue-100 rounded-xl p-4">
            <h4 className="font-bold text-blue-700 mb-2">Stat Changes:</h4>
            <div className="flex justify-center space-x-4 text-sm">
              {Object.entries(currentScenario.choices[selectedChoice].statChanges).map(([stat, change]) => (
                <span key={stat} className={`font-semibold ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {stat}: {change > 0 ? '+' : ''}{change}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default QuestionScene
