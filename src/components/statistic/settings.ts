// import { getUserSettings, updateUserSettings } from '../../api/settings-api/setting-api';
// import { getAggregatedWords, getAllUserWords } from '../../api/Words/WordsAPI';
// import { getHash } from '../../router';
// import { generalState } from '../../states/generalState';
// import { Settings, settingsWords } from '../../types/everydayTypes/settingsType';

// export async function handleSettingsWord() {
// const hash = getHash();

// let audioWords: settingsWords;

// const audioGameWords = (await getAllUserWords(
//   generalState.userId as string,
//   generalState.token as string
// ));

// console.log(1);
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

//   console.log(today);

//   if (userSettings.optional.dayToday === today) {
//     settings = {
//       wordsPerDay: userSettings.wordsPerDay + 1,
//       optional: {
//         dayToday: userSettings.optional.dayToday,
//         words: settingsWord
//       },
//     };
//   }

//   settings = {
//     wordsPerDay: 1,
//     optional: {
//       dayToday: today,
//       words: settingsWord
//     },
//   };

//   await updateUserSettings(
//     generalState.userId as string,
//     generalState.token as string,
//     settings
//   );
// }
