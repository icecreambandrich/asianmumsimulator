import { Vector3, Euler } from 'three'

export interface Pose {
  head: {
    position: Vector3
    rotation: Euler
  }
  torso: {
    position: Vector3
    rotation: Euler
  }
  leftArm: {
    position: Vector3
    rotation: Euler
  }
  rightArm: {
    position: Vector3
    rotation: Euler
  }
}

// Base idle pose - scaled up for better visibility
export const IDLE_POSE: Pose = {
  head: {
    position: new Vector3(0, 2.2, 0),
    rotation: new Euler(0, 0, 0)
  },
  torso: {
    position: new Vector3(0, 1.0, 0),
    rotation: new Euler(0, 0, 0)
  },
  leftArm: {
    position: new Vector3(-0.6, 0.9, 0),
    rotation: new Euler(0, 0, -0.2)
  },
  rightArm: {
    position: new Vector3(0.6, 0.9, 0),
    rotation: new Euler(0, 0, 0.2)
  }
}

// Discipline style micro-poses
export const DISCIPLINE_POSES = {
  silent: {
    ...IDLE_POSE,
    head: {
      ...IDLE_POSE.head,
      rotation: new Euler(-0.1, 0, 0) // Slightly looking down
    },
    leftArm: {
      ...IDLE_POSE.leftArm,
      rotation: new Euler(0, 0, -0.1) // More relaxed
    },
    rightArm: {
      ...IDLE_POSE.rightArm,
      rotation: new Euler(0, 0, 0.1)
    }
  },
  verbal: {
    ...IDLE_POSE,
    head: {
      ...IDLE_POSE.head,
      rotation: new Euler(0.05, 0, 0) // Slightly looking up
    },
    leftArm: {
      ...IDLE_POSE.leftArm,
      rotation: new Euler(0, 0, -0.3) // More animated
    },
    rightArm: {
      ...IDLE_POSE.rightArm,
      rotation: new Euler(0, 0, 0.3)
    }
  },
  lecture: {
    ...IDLE_POSE,
    head: {
      ...IDLE_POSE.head,
      rotation: new Euler(0, 0.1, 0) // Slightly turned
    },
    leftArm: {
      ...IDLE_POSE.leftArm,
      rotation: new Euler(-0.2, 0, -0.4) // Pointing gesture
    },
    rightArm: {
      ...IDLE_POSE.rightArm,
      rotation: new Euler(0, 0, 0.2)
    }
  },
  physical: {
    ...IDLE_POSE,
    head: {
      ...IDLE_POSE.head,
      rotation: new Euler(0, 0, 0)
    },
    leftArm: {
      ...IDLE_POSE.leftArm,
      rotation: new Euler(0, 0, -0.1)
    },
    rightArm: {
      ...IDLE_POSE.rightArm,
      rotation: new Euler(-0.3, 0, 0.4) // Ready to strike pose
    }
  }
}

// Animation keyframes for idle breathing
export const BREATHING_ANIMATION = {
  duration: 3000, // 3 seconds
  keyframes: [
    { time: 0, scaleY: 1.0 },
    { time: 0.5, scaleY: 1.02 },
    { time: 1.0, scaleY: 1.0 }
  ]
}

// Hair sway animation
export const HAIR_SWAY = {
  duration: 4000, // 4 seconds
  amplitude: 0.05,
  frequency: 0.5
}

// Blinking animation
export const BLINK_ANIMATION = {
  interval: [4000, 6000], // Random between 4-6 seconds
  duration: 150, // Blink duration
  scaleY: 0.1 // How much to close eyes
}
