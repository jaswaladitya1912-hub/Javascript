const passField = document.getElementById("password");
const lengthSlider = document.getElementById("lengthSlider");
const lengthValue = document.getElementById("lengthValue");

lengthSlider.addEventListener("input", () => {
  lengthValue.textContent = lengthSlider.value;
});

const upperSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerSet = "abcdefghijklmnopqrstuvwxyz";
const numberSet = "0123456789";
const symbolSet = "!@#$%^&*()_+{}[]<>?";

function getRandomChar(chars) {
  return chars[Math.floor(Math.random() * chars.length)];
}

function shuffle(str) {
  return str.split('').sort(() => Math.random() - 0.5).join('');
}

document.getElementById("generateBtn").addEventListener("click", () => {
  const includeUpper = upper.checked;
  const includeLower = lower.checked;
  const includeNumber = number.checked;
  const includeSymbol = symbol.checked;
  let length = Number(lengthSlider.value);

  let selectedSets = [];
  if (includeUpper) selectedSets.push(upperSet);
  if (includeLower) selectedSets.push(lowerSet);
  if (includeNumber) selectedSets.push(numberSet);
  if (includeSymbol) selectedSets.push(symbolSet);

  // Agar koi select nahi hua
  if (selectedSets.length === 0) {
    passField.value = "Select at least one!";
    return;
  }

  let password = "";

  // At least 1 char from each selected type
  selectedSets.forEach(set => {
    password += getRandomChar(set);
  });

  // Remaining random
  while (password.length < length) {
    const randomSet = selectedSets[Math.floor(Math.random() * selectedSets.length)];
    password += getRandomChar(randomSet);
  }

  // Shuffle final password (most important part)
  password = shuffle(password);

  passField.value = password;
});

// Copy button
document.getElementById("copyBtn").addEventListener("click", () => {
  if (passField.value && !passField.value.includes("Select")) {
    navigator.clipboard.writeText(passField.value);
    alert("Copied to clipboard!");
  } else {
    alert("Nothing to copy!");
  }
});