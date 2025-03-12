document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const passwordOutput = document.getElementById('passwordOutput');
    const copyButton = document.getElementById('copyButton');
    const generateButton = document.getElementById('generateButton');
    const passwordLength = document.getElementById('passwordLength');
    const includeLowercase = document.getElementById('includeLowercase');
    const includeUppercase = document.getElementById('includeUppercase');
    const includeNumbers = document.getElementById('includeNumbers');
    const includeSpecial = document.getElementById('includeSpecial');
    const excludeSimilar = document.getElementById('excludeSimilar');
    const strengthBar = document.getElementById('strengthBar');
    const strengthText = document.getElementById('strengthText');
    
    // Load saved preferences or use defaults
    try {
      if (chrome.storage && chrome.storage.sync) {
        chrome.storage.sync.get({
          length: 16,
          lowercase: true,
          uppercase: true,
          numbers: true,
          special: true,
          excludeSimilar: false
        }, (items) => {
          passwordLength.value = items.length;
          includeLowercase.checked = items.lowercase;
          includeUppercase.checked = items.uppercase;
          includeNumbers.checked = items.numbers;
          includeSpecial.checked = items.special;
          excludeSimilar.checked = items.excludeSimilar;
          
          // Generate an initial password
          generatePassword();
        });
      } else {
        // If chrome.storage is not available, use defaults
        passwordLength.value = 16;
        // Other checkboxes are already checked by default in HTML
        generatePassword();
      }
    } catch (e) {
      console.error("Storage error:", e);
      // Fallback to defaults
      passwordLength.value = 16;
      generatePassword();
    }
    
    // Generate password
    function generatePassword() {
      const length = parseInt(passwordLength.value);
      const useLower = includeLowercase.checked;
      const useUpper = includeUppercase.checked;
      const useNumbers = includeNumbers.checked;
      const useSpecial = includeSpecial.checked;
      const noSimilar = excludeSimilar.checked;
      
      // Character sets
      let lowercase = 'abcdefghijklmnopqrstuvwxyz';
      let uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      let numbers = '0123456789';
      let special = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
      
      // Remove similar characters if option is selected
      if (noSimilar) {
        lowercase = lowercase.replace(/[ilo]/g, '');
        uppercase = uppercase.replace(/[IO]/g, '');
        numbers = numbers.replace(/[10]/g, '');
      }
      
      // Check if at least one character set is selected
      if (!useLower && !useUpper && !useNumbers && !useSpecial) {
        includeLowercase.checked = true;
        alert('At least one character set must be selected.');
        return;
      }
      
      // Combine selected character sets
      let chars = '';
      if (useLower) chars += lowercase;
      if (useUpper) chars += uppercase;
      if (useNumbers) chars += numbers;
      if (useSpecial) chars += special;
      
      // Generate password
      let password = '';
      const array = new Uint32Array(length);
      window.crypto.getRandomValues(array);
      
      // Ensure at least one character from each selected set
      if (useLower) password += lowercase.charAt(Math.floor(Math.random() * lowercase.length));
      if (useUpper) password += uppercase.charAt(Math.floor(Math.random() * uppercase.length));
      if (useNumbers) password += numbers.charAt(Math.floor(Math.random() * numbers.length));
      if (useSpecial) password += special.charAt(Math.floor(Math.random() * special.length));
      
      // Fill the rest of the password
      for (let i = password.length; i < length; i++) {
        password += chars.charAt(array[i] % chars.length);
      }
      
      // Shuffle the password
      password = shuffleString(password);
      
      // Display the password
      passwordOutput.value = password;
      
      // Update password strength indicator
      updateStrengthMeter(password);
      
      // Save preferences
      try {
        if (chrome.storage && chrome.storage.sync) {
          chrome.storage.sync.set({
            length: length,
            lowercase: useLower,
            uppercase: useUpper,
            numbers: useNumbers,
            special: useSpecial,
            excludeSimilar: noSimilar
          });
        }
      } catch (e) {
        console.error("Error saving preferences:", e);
      }
    }
    
    // Shuffle a string
    function shuffleString(string) {
      const array = string.split('');
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array.join('');
    }
    
    // Update password strength meter
    function updateStrengthMeter(password) {
      let score = 0;
      
      // Length
      if (password.length >= 8) score += 1;
      if (password.length >= 12) score += 1;
      if (password.length >= 16) score += 1;
      
      // Character types
      if (/[a-z]/.test(password)) score += 1;
      if (/[A-Z]/.test(password)) score += 1;
      if (/[0-9]/.test(password)) score += 1;
      if (/[^a-zA-Z0-9]/.test(password)) score += 1;
      
      // Variety
      const uniqueChars = new Set(password.split('')).size;
      if (uniqueChars >= password.length * 0.7) score += 1;
      
      // Update strength indicator
      let color, width, text;
      
      if (score <= 3) {
        color = '#ff4d4d'; // Red
        width = '33%';
        text = 'Weak';
      } else if (score <= 6) {
        color = '#ffaa00'; // Orange
        width = '66%';
        text = 'Medium';
      } else {
        color = '#00cc44'; // Green
        width = '100%';
        text = 'Strong';
      }
      
      strengthBar.style.backgroundColor = color;
      strengthBar.style.width = width;
      strengthText.textContent = text;
      strengthText.style.color = color;
    }
    
    // Copy password to clipboard
    copyButton.addEventListener('click', () => {
      passwordOutput.select();
      document.execCommand('copy');
      
      // Show feedback
      const originalText = copyButton.innerHTML;
      copyButton.innerHTML = '✓';
      setTimeout(() => {
        copyButton.innerHTML = originalText;
      }, 1000);
    });
    
    // Generate password button
    generateButton.addEventListener('click', generatePassword);
    
    // Generate new password when options change
    passwordLength.addEventListener('input', generatePassword);
    includeLowercase.addEventListener('change', generatePassword);
    includeUppercase.addEventListener('change', generatePassword);
    includeNumbers.addEventListener('change', generatePassword);
    includeSpecial.addEventListener('change', generatePassword);
    excludeSimilar.addEventListener('change', generatePassword);
  });