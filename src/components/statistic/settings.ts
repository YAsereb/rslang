import { getUserSettings, updateUserSettings } from '../../api/settings-api/setting-api';
import { getAllUserWords } from '../../api/Words/WordsAPI';
import { generalState } from '../../states/generalState';
import { Settings } from '../../types/everydayTypes/settingsType';

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

export async function handleSettings(userSettings: Settings) {
  const settings = await getUserSettings(
    generalState.userId as string,
    generalState.token as string,
  );

  if (!settings) {
    await updateUserSettings(
      generalState.userId as string,
      generalState.token as string,
      userSettings
    );
  }
}
