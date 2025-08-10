import { Chapter } from './types';

export const chapters: Chapter[] = [
  {
    id: 1,
    title: {
      fr: "La forêt maudite du Môle",
      en: "The Cursed Forest of Môle"
    },
    isUnlocked: true,
    puzzles: [
      {
        id: 1,
        title: "Les Arbres Centenaires",
        question: {
          fr: "En observant cette forêt mystérieuse, combien d'arbres centenaires comptez-vous sur le sentier principal? Indice: regardez bien les troncs les plus épais.",
          en: "Observing this mysterious forest, how many century-old trees do you count on the main path? Hint: look carefully at the thickest trunks."
        },
        answer: 10,
        hint: {
          fr: "Il y a entre 5 et 15 arbres centenaires visibles sur ce sentier.",
          en: "There are between 5 and 15 century-old trees visible on this path."
        },
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
      },
      {
        id: 2,
        title: "Le Refuge Perdu",
        question: {
          fr: "Un ancien refuge se cache dans cette montagne. Si chaque pierre visible sur la façade représente une année de construction, combien d'années a pris sa construction?",
          en: "An old refuge is hidden in this mountain. If each visible stone on the facade represents one year of construction, how many years did it take to build?"
        },
        answer: 7,
        hint: {
          fr: "Comptez les pierres les plus visibles sur la façade principale.",
          en: "Count the most visible stones on the main facade."
        },
        image: "https://images.unsplash.com/photo-1464822759844-d150efd3a733?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
      },
      {
        id: 3,
        title: "Les Empreintes Mystérieuses",
        question: {
          fr: "Sur ce sentier boueux, vous découvrez des empreintes étranges. En comptant les traces complètes visibles, combien d'animaux différents sont passés par ici?",
          en: "On this muddy path, you discover strange footprints. Counting the complete visible tracks, how many different animals passed through here?"
        },
        answer: 4,
        hint: {
          fr: "Cherchez les empreintes de différentes tailles et formes.",
          en: "Look for footprints of different sizes and shapes."
        },
        image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
      }
    ]
  },
  {
    id: 2,
    title: {
      fr: "Le sommet des secrets",
      en: "The Summit of Secrets"
    },
    isUnlocked: false,
    puzzles: [
      {
        id: 4,
        title: "Les Cairns du Sommet",
        question: {
          fr: "Au sommet du Môle, les randonneurs ont érigé des cairns (tas de pierres). Si chaque cairn contient exactement 6 pierres, et que vous en comptez 8, combien de pierres au total?",
          en: "At the summit of Môle, hikers have erected cairns (stone piles). If each cairn contains exactly 6 stones, and you count 8 cairns, how many stones in total?"
        },
        answer: 48,
        hint: {
          fr: "Multipliez le nombre de cairns par le nombre de pierres par cairn.",
          en: "Multiply the number of cairns by the number of stones per cairn."
        },
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
      },
      {
        id: 5,
        title: "Le Trésor Caché",
        question: {
          fr: "Vous avez trouvé le trésor des bergers! Il contient des pièces d'or anciennes. Si vous en comptez 3 rangées de 5 pièces chacune, quel est le nombre total de pièces?",
          en: "You found the shepherds' treasure! It contains ancient gold coins. If you count 3 rows of 5 coins each, what is the total number of coins?"
        },
        answer: 15,
        hint: {
          fr: "Multipliez le nombre de rangées par le nombre de pièces par rangée.",
          en: "Multiply the number of rows by the number of coins per row."
        },
        image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
      }
    ]
  }
];

export function getPuzzleById(id: number): any {
  for (const chapter of chapters) {
    const puzzle = chapter.puzzles.find(p => p.id === id);
    if (puzzle) return puzzle;
  }
  return null;
}

export function getChapterByPuzzleId(puzzleId: number): Chapter | null {
  for (const chapter of chapters) {
    if (chapter.puzzles.some(p => p.id === puzzleId)) {
      return chapter;
    }
  }
  return null;
}
