let userName = '';
        let timeLeft = 7200; // 2 hours in seconds
        let timerInterval;

        const questions = [
            {
                type: 'fill-blanks',
                section: '1. Grammar (20 marks) A) Fill in the blanks',
                answers: [
                    'Io ___ italiano. (essere)',
                    'Tu ___ un cellulare nuovo? (avere)',
                    'Lei ___ una studentessa. (essere)',
                    'Noi ___ molto felici oggi. (essere)',
                    'Voi ___ una grande casa? (avere)',
                    'Loro ___ venti anni. (avere)',
                    'Io ___ a Roma. (essere)',
                    'Tu ___ due fratelli? (avere)',
                    'Lui ___ un attore famoso. (essere)',
                    'Noi ___ molti amici. (avere)'
                ],
                correct: ['sono', 'hai', 'è', 'siamo', 'avete', 'hanno', 'sono', 'hai', 'è', 'abbiamo'],
                marksPerQuestion: 2
            },
            {
                type: 'conjugation',
                section: 'B) Conjugate verbs',
                verbs: [
                    {verb: 'Parlare', answers: ['parlo', 'parli', 'parla', 'parliamo', 'parlate', 'parlano']},
                    {verb: 'Scrivere', answers: ['scrivo', 'scrivi', 'scrive', 'scriviamo', 'scrivete', 'scrivono']},
                    {verb: 'Dormire', answers: ['dormo', 'dormi', 'dorme', 'dormiamo', 'dormite', 'dormono']},
                    {verb: 'Capire', answers: ['capisco', 'capisci', 'capisce', 'capiamo', 'capite', 'capiscono']},
                    {verb: 'Andare', answers: ['vado', 'vai', 'va', 'andiamo', 'andate', 'vanno']}
                ],
                marksPerQuestion: 2
            },
            {
                type: 'matching',
                section: '2. Vocabulary (10 marks) A) Match words',
                pairs: [
                    {italian: 'Cane', english: 'Dog'},
                    {italian: 'Tavolo', english: 'Table'},
                    {italian: 'Giornale', english: 'Newspaper'},
                    {italian: 'Orologio', english: 'Clock'},
                    {italian: 'Negozio', english: 'Shop'}
                ],
                marksPerQuestion: 1
            },
            {
                type: 'articles',
                section: 'B) Choose articles',
                questions: [
                    {word: 'mela', options: ['Il', 'La', 'L’'], correct: 1},
                    {word: 'zucchero', options: ['Il', 'Lo', 'L’'], correct: 1},
                    {word: 'casa', options: ['Il', 'La', 'Lo'], correct: 1},
                    {word: 'ragazzo', options: ['Il', 'La', 'Lo'], correct: 0},
                    {word: 'studente', options: ['Il', 'Lo', 'L’'], correct: 1}
                ],
                marksPerQuestion: 1
            },
            {
                type: 'sentence',
                section: '3. Sentence Formation (10 marks)',
                sentences: [
                    {words: ['italiano', 'parlo', 'io'], correct: 'Io parlo italiano'},
                    {words: ['oggi', 'noi', 'a scuola', 'andiamo'], correct: 'Noi andiamo a scuola oggi'},
                    {words: ['lavora', 'Maria', 'in un ufficio'], correct: 'Maria lavora in un ufficio'},
                    {words: ['tu', 'dove', 'abiti?'], correct: 'Dove abiti tu?'},
                    {words: ['chiama', 'lui', 'si', 'Marco'], correct: 'Lui si chiama Marco'}
                ],
                marksPerQuestion: 2
            },
            {
                type: 'reading',
                section: '4. Reading Comprehension (10 marks)',
                passage: 'Ciao! Mi chiamo Luca e ho 25 anni. Vivo a Milano, ma sono di Napoli. Lavoro in un ristorante e studio all’università. Nel tempo libero, mi piace leggere e giocare a calcio con i miei amici.',
                questions: [
                    {question: 'Quanti anni ha Luca?', answer: '25'},
                    {question: 'Dove vive Luca?', answer: 'Milano'},
                    {question: 'Da dove viene Luca?', answer: 'Napoli'},
                    {question: 'Dove lavora Luca?', answer: 'ristorante'},
                    {question: 'Cosa fa nel tempo libero?', answer: 'leggere e giocare a calcio'}
                ],
                marksPerQuestion: 2
            },
            {
                type: 'writing',
                section: '5. Writing (20 marks)',
                questions: [
                    {
                        type: 'short',
                        question: 'A) Write 5 sentences about yourself:',
                        prompt: 'Include name, age, nationality, city, and something you like'
                    },
                    {
                        type: 'dialogue',
                        question: 'B) Write a short dialogue between two people:',
                        prompt: 'Include greetings, names, nationalities, and how they are doing'
                    }
                ],
                marksPerQuestion: 10
            }
        ];

        function startTest() {
            const nameInput = document.getElementById('userName');
            userName = nameInput.value.trim().replace(/\b\w/g, c => c.toUpperCase());
            
            if (!userName) {
                alert('Please enter your name!');
                return;
            }
            
            document.getElementById('welcomeScreen').classList.add('hidden');
            document.getElementById('testInterface').classList.remove('hidden');
            startTimer();
            renderQuestions();
        }

        function renderQuestions() {
            const form = document.getElementById('testForm');
            form.innerHTML = '';

            questions.forEach((section, sectionIndex) => {
                const sectionDiv = document.createElement('div');
                sectionDiv.className = 'question-card';
                sectionDiv.innerHTML = `<h3>${section.section}</h3>`;

                switch(section.type) {
                    case 'fill-blanks':
                        section.answers.forEach((question, qIndex) => {
                            sectionDiv.innerHTML += `
                                <div>
                                    <label>${question.replace('___', '<input type="text" name="q${sectionIndex}_${qIndex}" required>')}</label>
                                </div>
                            `;
                        });
                        break;

                    case 'conjugation':
                        section.verbs.forEach((verb, verbIndex) => {
                            sectionDiv.innerHTML += `
                                <h4>Conjugate: ${verb.verb}</h4>
                                <div class="conjugation-grid">
                                    ${['io', 'tu', 'lui/lei', 'noi', 'voi', 'loro'].map((pronoun, index) => `
                                        <div>
                                            <label>${pronoun}</label>
                                            <input type="text" name="verb_${sectionIndex}_${verbIndex}_${index}" required>
                                        </div>
                                    `).join('')}
                                </div>
                            `;
                        });
                        break;

                    case 'matching':
                        section.pairs.forEach((pair, index) => {
                            sectionDiv.innerHTML += `
                                <div>
                                    ${pair.italian} → 
                                    <select name="match_${sectionIndex}_${index}" required>
                                        <option value="">Select</option>
                                        ${section.pairs.map(p => `<option value="${p.english}">${p.english}</option>`)}
                                    </select>
                                </div>
                            `;
                        });
                        break;

                    case 'articles':
                        section.questions.forEach((question, qIndex) => {
                            sectionDiv.innerHTML += `
                                <div>
                                    ___ ${question.word}
                                    ${question.options.map((opt, optIndex) => `
                                        <label>
                                            <input type="radio" name="article_${sectionIndex}_${qIndex}" value="${opt}" required>
                                            ${opt}
                                        </label>
                                    `).join('')}
                                </div>
                            `;
                        });
                        break;

                    case 'sentence':
                        section.sentences.forEach((sentence, index) => {
                            sectionDiv.innerHTML += `
                                <div>
                                    <p>Words: ${sentence.words.join(', ')}</p>
                                    <input type="text" name="sentence_${sectionIndex}_${index}" required>
                                </div>
                            `;
                        });
                        break;

                    case 'reading':
                        sectionDiv.innerHTML += `
                            <div class="reading-passage">
                                <p>${section.passage}</p>
                                ${section.questions.map((q, index) => `
                                    <div>
                                        <label>${q.question}</label>
                                        <input type="text" name="reading_${sectionIndex}_${index}" required>
                                    </div>
                                `).join('')}
                            </div>
                        `;
                        break;

                    case 'writing':
                        section.questions.forEach((q, qIndex) => {
                            sectionDiv.innerHTML += `
                                <div>
                                    <h4>${q.question}</h4>
                                    <p>${q.prompt}</p>
                                    ${q.type === 'short' ? `
                                        <textarea name="writing_short_${sectionIndex}_${qIndex}" required></textarea>
                                    ` : `
                                        <div>
                                            <div>A: <input type="text" name="dialogue_A1_${sectionIndex}_${qIndex}" required></div>
                                            <div>B: <input type="text" name="dialogue_B1_${sectionIndex}_${qIndex}" required></div>
                                            <div>A: <input type="text" name="dialogue_A2_${sectionIndex}_${qIndex}" required></div>
                                            <div>B: <input type="text" name="dialogue_B2_${sectionIndex}_${qIndex}" required></div>
                                        </div>
                                    `}
                                </div>
                            `;
                        });
                        break;
                }

                form.appendChild(sectionDiv);
            });

            form.innerHTML += `<button class="btn btn-primary" type="submit">Submit Test</button>`;
        }

        function startTimer() {
            timerInterval = setInterval(() => {
                timeLeft--;
                const hours = Math.floor(timeLeft / 3600).toString().padStart(2, '0');
                const minutes = Math.floor((timeLeft % 3600) / 60).toString().padStart(2, '0');
                const seconds = (timeLeft % 60).toString().padStart(2, '0');
                document.getElementById('timer').textContent = `Time: ${hours}:${minutes}:${seconds}`;

                if(timeLeft <= 0) {
                    clearInterval(timerInterval);
                    submitTest();
                }
            }, 1000);
        }

        function calculateScore() {
            const formData = new FormData(document.getElementById('testForm'));
            let score = 0;

            questions.forEach((section, sectionIndex) => {
                if(section.type === 'fill-blanks') {
                    section.correct.forEach((correct, index) => {
                        const answer = formData.get(`q${sectionIndex}_${index}`)?.toLowerCase().trim();
                        if(answer === correct) score += section.marksPerQuestion;
                    });
                }
                
                if(section.type === 'conjugation') {
                    section.verbs.forEach((verb, verbIndex) => {
                        verb.answers.forEach((correct, index) => {
                            const answer = formData.get(`verb_${sectionIndex}_${verbIndex}_${index}`)?.toLowerCase().trim();
                            if(answer === correct) score += 0.33; // 2 marks per verb (6 forms)
                        });
                    });
                }
                
                if(section.type === 'matching') {
                    section.pairs.forEach((pair, index) => {
                        const answer = formData.get(`match_${sectionIndex}_${index}`);
                        if(answer === pair.english) score += section.marksPerQuestion;
                    });
                }
                
                if(section.type === 'articles') {
                    section.questions.forEach((q, qIndex) => {
                        const answer = formData.get(`article_${sectionIndex}_${qIndex}`);
                        if(answer === q.options[q.correct]) score += section.marksPerQuestion;
                    });
                }
                
                if(section.type === 'sentence') {
                    section.sentences.forEach((sentence, index) => {
                        const answer = formData.get(`sentence_${sectionIndex}_${index}`)?.toLowerCase().trim();
                        if(answer === sentence.correct.toLowerCase()) score += section.marksPerQuestion;
                    });
                }
                
                if(section.type === 'reading') {
                    section.questions.forEach((q, index) => {
                        const answer = formData.get(`reading_${sectionIndex}_${index}`)?.toLowerCase().trim();
                        if(answer.includes(q.answer.toLowerCase())) score += section.marksPerQuestion;
                    });
                }
                
                if(section.type === 'writing') {
                    section.questions.forEach((q, qIndex) => {
                        if(q.type === 'short') {
                            const answer = formData.get(`writing_short_${sectionIndex}_${qIndex}`).trim();
                            if(answer.split(/[.!?]/).length >= 5) score += 10;
                        } else {
                            const lines = [
                                formData.get(`dialogue_A1_${sectionIndex}_${qIndex}`),
                                formData.get(`dialogue_B1_${sectionIndex}_${qIndex}`),
                                formData.get(`dialogue_A2_${sectionIndex}_${qIndex}`),
                                formData.get(`dialogue_B2_${sectionIndex}_${qIndex}`)
                            ].filter(l => l.trim());
                            if(lines.length >= 4) score += 10;
                        }
                    });
                }
            });

            return Math.min(100, Math.round(score));
        }

        function submitTest(e) {
            if(e) e.preventDefault();
            clearInterval(timerInterval);

            const score = calculateScore();
            const result = {
                name: userName,
                score: score,
                date: new Date().toLocaleString()
            };

            const results = JSON.parse(localStorage.getItem('testResults') || '[]');
            results.push(result);
            localStorage.setItem('testResults', JSON.stringify(results));

            showResults();
        }

        function showResults() {
            const results = JSON.parse(localStorage.getItem('testResults') || []);
            
            document.getElementById('testInterface').classList.add('hidden');
            const resultSection = document.getElementById('resultSection');
            resultSection.classList.remove('hidden');
            resultSection.innerHTML = `
                <div class="congrats">
                    <h2>Test Completed, ${userName}!</h2>
                    <h3>Your Score: ${results[results.length - 1].score}/100</h3>
                    <p>${getResultMessage(results[results.length - 1].score)}</p>
                </div>
                <button class="btn btn-primary" onclick="location.reload()">Retry Test</button>
                <h3 style="margin-top: 20px;">Previous Attempts:</h3>
                ${results.map(res => `
                    <div class="result-card">
                        <strong>${res.name}</strong> - ${res.score} points - ${res.date}
                    </div>
                `).join('')}
            `;
        }

        function getResultMessage(score) {
            if(score >= 90) return '🎉 Excellent! You nailed it!';
            if(score >= 70) return '👍 Good job! Keep practicing!';
            if(score >= 50) return '😊 Not bad! Try again!';
            return '💪 Keep trying! You can do better!';
        }

        // Initial load
        document.getElementById('previousResults').innerHTML = 
            JSON.parse(localStorage.getItem('testResults') || '[]')
                .map(res => `<div class="result-card">${res.name} - ${res.score} - ${res.date}</div>`)
                .join('');