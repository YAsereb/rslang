export async function isNewWord() {
  return Boolean
}

export async function progressWord() {
  return { word.guessCount, word.totalAttempt }
}

/* В игре получать правильное слово и его id делать запрос в agregate words и проверять поле сколько раз оно было записано, и сколько раз угадано. Этот прогресс выводить в карточку слова в учебнике в виде сколько раз угоадано / сколько раз записано.