const characterAmountRange = document.getElementById("characterAmountRange");
const characterAmountNumber = document.getElementById("characterAmountNumber");
const includeCapitalLettersElement = document.getElementById(
  "includeCapitalLetters"
);
const includeNumbersElement = document.getElementById("includeNumbers");
const includeSpecialCharactersElement = document.getElementById(
  "includeSpecialCharacters"
);
const form = document.getElementById("passwordGeneratorForm");
const passwordDisplay = document.getElementById("passwordDisplay");
const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90);
const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122);
const NUMBER_CHAR_CODES = arrayFromLowToHigh(48, 57);
const SYMBOL_CHAR_CODES = arrayFromLowToHigh(33, 47).concat(
  arrayFromLowToHigh(58, 54).concat(
    arrayFromLowToHigh(91, 96).concat(arrayFromLowToHigh(123, 126))
  )
);

characterAmountNumber.addEventListener("input", syncCharacterAmount);
characterAmountRange.addEventListener("input", syncCharacterAmount);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const characterAmount = characterAmountNumber.value;
  const includeSpecialCharacters = includeSpecialCharactersElement.checked;
  const includeCapitalLetters = includeCapitalLettersElement.checked;
  const includeNumbers = includeNumbersElement.checked;

  const password = generatePassword(
    characterAmount,
    includeSpecialCharacters,
    includeCapitalLetters,
    includeNumbers
  );
  passwordDisplay.innerText = password;
});

function generatePassword(
  characterAmount,
  includeSpecialCharacters,
  includeCapitalLetters,
  includeNumbers
) {
  let charCodes = LOWERCASE_CHAR_CODES;
  if (includeCapitalLetters) charCodes = charCodes.concat(UPPERCASE_CHAR_CODES);
  if (includeNumbers) charCodes = charCodes.concat(NUMBER_CHAR_CODES);
  if (includeSpecialCharacters) charCodes = charCodes.concat(SYMBOL_CHAR_CODES);
  const passwordCharacter = [];
  for (let i = 0; i < characterAmount; i++) {
    const characterCode =
      charCodes[Math.floor(Math.random() * charCodes.length)];
    passwordCharacter.push(String.fromCharCode(characterCode));
  }
  return passwordCharacter.join("");
}

function arrayFromLowToHigh(low, high) {
  const array = [];
  for (let i = low; i <= high; i++) {
    array.push(i);
  }
  return array;
}

function syncCharacterAmount(e) {
  const value = e.target.value;
  characterAmountNumber.value = value;
  characterAmountRange.value = value;
}
