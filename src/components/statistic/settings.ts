import { getAllUserWords } from '../../api/Words/WordsAPI';
import { generalState } from '../../states/generalState';

import { getDateToday } from '../../utils';

export default async function handleSettingsWord() {
  const today = getDateToday();

  const userWords = await getAllUserWords(
    generalState.userId as string,
    generalState.token as string
  );

  const todayNewWords = userWords.filter(
    (word) => word.optional.whenLearnedDate === today
  );
  return todayNewWords;
}
//   console.log(audioGameWords);
// if (hash === 'audiocall') {
//   settingsWord = {
//     audioWords: (userSettings.optional.words?.audioWords as string[]).concat(wordId),
//     sprintWords: userSettings.optional.words?.sprintWords as string[],
//     cardWords: userSettings.optional.words?.sprintWords as string[],
//   };
// }
// if (hash === 'sprint') {
//   settingsWord = {
//     audioWords: userSettings.optional.words?.audioWords as string[],
//     sprintWords: (userSettings.optional.words?.sprintWords as string[]).concat(wordId),
//     cardWords: userSettings.optional.words?.sprintWords as string[],
//   };
// }
// settingsWord = {
//   audioWords: userSettings.optional.words?.audioWords as string[],
//   sprintWords: userSettings.optional.words?.sprintWords as string[],
//   cardWords: (userSettings.optional.words?.sprintWords as string[]).concat(wordId),
// };

// return settingsWord;
// }

// export default async function handleSettings(wordId: string) {
//   let userSettings = await getUserSettings(
//     generalState.userId as string,
//     generalState.token as string
//   );
//   const today = new Date();
//   let settings: Settings;
//   let settingsWord: settingsWords;

//   if (!userSettings) {
//     userSettings = {
//       wordsPerDay: 1
//     };
//   }

// //   console.log(today);

// //   if (userSettings.optional.dayToday === today) {
// //     settings = {
// //       wordsPerDay: userSettings.wordsPerDay + 1,
// //       optional: {
// //         dayToday: userSettings.optional.dayToday,
// //         words: settingsWord
// //       },
// //     };
// //   }

// //   settings = {
// //     wordsPerDay: 1,
// //     optional: {
// //       dayToday: today,
// //       words: settingsWord
// //     },
// //   };

// //   await updateUserSettings(
// //     generalState.userId as string,
// //     generalState.token as string,
// //     settings
// //   );
// // }
