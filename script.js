
document.getElementById('searchForm').addEventListener('submit', function (e) {
            e.preventDefault();
            let word = document.getElementById('searchInput').value;
            fetchMeaning(word);
            document.getElementById('searchInput').value = null;
        });

        function fetchMeaning(word) {
            fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
                .then(response => response.json())
                .then(data => {
                    let info = data[0];
                    displayMeaning(info);
                    console.log(info);
                })
                .catch(error => {
                    displayMeaning('Meaning not found. Please try another word.');
                });
        }

        function displayMeaning(info) {
            let meaningBody = document.getElementById('lexicalInfo');
            // word 
            const wordEl = document.createElement("h1");
            wordEl.textContent = `Your entered word is : ${info.word}`;
            meaningBody.appendChild(wordEl);
            // phonetics
            const phonetic= document.createElement("h2");
            let phonetics = info.phonetics.map((phonetic) => phonetic.text).join("  or  ");
            phonetic.textContent = `The different phonetics is : ${phonetics}`;
            meaningBody.appendChild(phonetic);
            // meaning
            const meaning = document.createElement("h3");
            meaning.textContent = `Meaning: ${info.meanings[0].definitions[0].definition}`;
            meaningBody.appendChild(meaning);

            let modal = document.getElementById('modal');
            modal.style.display = 'block';

        }

        function closeModal() {
            let modal = document.getElementById('modal');
            modal.style.display = 'none';
            window.location.reload();
        }