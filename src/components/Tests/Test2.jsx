import React, { useState, useEffect } from 'react';
import '../styles/Test1.css';
import { getDatabase, ref, set, get } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
function writeUserData(email, score, attempt) {
    const db = getDatabase();
    set(ref(db, 'users/' + email.replace(/[.#$[\]/]/g, ',')), {
        scores: score,
        attempts: attempt,
    });
}

function readUserDataScores(email) {
    const db = getDatabase();
    const userRef = ref(db, 'users/' + email.replace(/[.#$[\]/]/g, ',') + '/scores');
    return get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            return null;
        }
    }).catch((error) => {
        console.error('Error getting scores:', error);
        return null;
    });
}

function readUserDataAttempts(email) {
    const db = getDatabase();
    const userRef = ref(db, 'users/' + email.replace(/[.#$[\]/]/g, ',') + '/attempts');
    return get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            return null;
        }
    }).catch((error) => {
        console.error('Error getting attempts:', error);
        return null;
    });
}

const Test2 = () => {
    const [authUser, setAuthUser] = useState(null);
    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user);
            } else {
                setAuthUser(null);
            }
        });
        return () => {
            listen();
        };
    }, []);

    const [answers, setAnswers] = useState({
        question1: [], question2: [], question3: [], question4: [], question5: []
    });

    const [userScores, setUserScores] = useState(null);
    const [userAttempts, setUserAttempts] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const scores = await readUserDataScores(authUser.email);
            setUserScores(scores);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [authUser]);

    const fetchDataAttempts = async () => {
        try {
            const attempts = await readUserDataAttempts(authUser.email);
            setUserAttempts(attempts);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDataAttempts();
    }, [authUser]);
    const [score, setScore] = useState(0);
    const [attempts, setAttempts] = useState(0);
    const [scorenow, setScorenow] = useState(0);
    const [Uspevaemost, setUspevaemost] = useState(0);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [errors, setErrors] = useState([]);

    const handleCheckboxChange = (e, question) => {
        if (!formSubmitted) {
            const selectedAnswers = [...answers[question]];
            if (e.target.checked) {
                selectedAnswers.push(e.target.value);
            } else {
                const index = selectedAnswers.indexOf(e.target.value);
                if (index > -1) {
                    selectedAnswers.splice(index, 1);
                }
            }
            setAnswers({ ...answers, [question]: selectedAnswers });
        }};
        const handleSubmit = async () => {
            let totalScore = 0;
            let errorQuestions = [];
            if (answers.question1.includes('answer1') && answers.question1.includes('answer2')) {
                totalScore++;
            } else {
                errorQuestions.push('question1');
            }

            if (answers.question2.includes('answer3') && answers.question2.includes('answer4')) {
                totalScore++;
            } else {
                errorQuestions.push('question2');
            }

            if (answers.question3.includes('answer5') && !answers.question3.includes('answer6')) {
                totalScore++;
            } else {
                errorQuestions.push('question3');
            }

            if (answers.question4.includes('answer7') && !answers.question3.includes('answer8')) {
                totalScore++;
            } else {
                errorQuestions.push('question4');
            }
            
            if (!answers.question5.includes('answer9') && answers.question3.includes('answer10')) {
                totalScore++;
            } else {
                errorQuestions.push('question5');
            } 
            // Чтение текущего значения очков из базы данных
            const currentScore = await readUserDataScores(authUser.email);
            const currentAttempts = await readUserDataAttempts(authUser.email);
            // Добавление новых очков к текущему значению
            const updatedScore = currentScore + totalScore;
            const updatedAttempts = currentAttempts + 1;
            // Запись обновленного значения очков в базу данных
            setScorenow(totalScore)
            writeUserData(authUser.email, updatedScore, updatedAttempts);
            setAttempts(updatedAttempts);
            setScore(updatedScore);
            setErrors(errorQuestions);
            setFormSubmitted(true);
            // Чтение и установка всех очков пользователя
            const scores = await readUserDataScores(authUser.email);
            const attempts = await readUserDataAttempts(authUser.email);
            setUserAttempts(attempts);
            setUserScores(scores);
            setUspevaemost((updatedScore / (updatedAttempts * 5)) * 100);
        };
    return (
        <div className="test-container">
            <h2>Тест</h2>
            <div className="checkbox-container">
                <h3 style={{ color: errors.includes('question1') ? 'red' : 'black' }}>Вопрос 1: Что такое React?</h3>
                <label style={{ display: 'flex', alignItems: 'center' }}>
                    Библиотека <input type="checkbox" value="answer1" onChange={(e) => handleCheckboxChange(e, 'question1')} disabled={formSubmitted} />
                </label>
                <label style={{ display: 'flex', alignItems: 'center' }}>
                    Фреймворк <input type="checkbox" value="answer2" onChange={(e) => handleCheckboxChange(e, 'question1')} disabled={formSubmitted} />
                </label>
            </div>

            <div>
                <h3 style={{ color: errors.includes('question2') ? 'red' : 'black' }}>Вопрос 2: Что такое JSX?</h3>
                <label style={{ display: 'flex', alignItems: 'center' }}>
                    Расширение JavaScript <input type="checkbox" value="answer3" onChange={(e) => handleCheckboxChange(e, 'question2')} disabled={formSubmitted} />
                </label>
                <label style={{ display: 'flex', alignItems: 'center' }}>
                    Язык программирования <input type="checkbox" value="answer4" onChange={(e) => handleCheckboxChange(e, 'question2')} disabled={formSubmitted} />
                </label>
            </div>

            <div>
                <h3 style={{ color: errors.includes('question3') ? 'red' : 'black' }}>Вопрос 3: Какой язык используется в Unity?</h3>
                <label style={{ display: 'flex', alignItems: 'center' }}>
                    Используется c# <input type="checkbox" value="answer5" onChange={(e) => handleCheckboxChange(e, 'question3')} disabled={formSubmitted} />
                </label>
                <label style={{ display: 'flex', alignItems: 'center' }}>
                    Используется java <input type="checkbox" value="answer6" onChange={(e) => handleCheckboxChange(e, 'question3')} disabled={formSubmitted} />
                </label>
            </div>
            
            <div>
                <h3 style={{ color: errors.includes('question4') ? 'red' : 'black' }}>Вопрос 4: Что такое HTML?</h3>
                <label style={{ display: 'flex', alignItems: 'center' }}>
                    Гипертекстовый язык разметки <input type="checkbox" value="answer7" onChange={(e) => handleCheckboxChange(e, 'question4')} disabled={formSubmitted} />
                </label>
                <label style={{ display: 'flex', alignItems: 'center' }}>
                    Язык программирования для создания бд<input type="checkbox" value="answer8" onChange={(e) => handleCheckboxChange(e, 'question4')} disabled={formSubmitted} />
                </label>
            </div>

            <div>
                <h3 style={{ color: errors.includes('question5') ? 'red' : 'black' }}>Вопрос 5: Какая из этих операционных систем является открытой?</h3>
                <label style={{ display: 'flex', alignItems: 'center' }}>
                    ОС Windows<input type="checkbox" value="answer9" onChange={(e) => handleCheckboxChange(e, 'question5')} disabled={formSubmitted} />
                </label>
                <label style={{ display: 'flex', alignItems: 'center' }}>
                    ОС Linux<input type="checkbox" value="answer10" onChange={(e) => handleCheckboxChange(e, 'question5')} disabled={formSubmitted} />
                </label>
            </div>

            <button onClick={handleSubmit} disabled={formSubmitted}>Завершить</button>
            {formSubmitted && (
              <div>
                {scorenow > 0 && <p>Количество верных ответов: {scorenow}</p>}
                {scorenow === 0 && <p>Ни одного верного ответа!</p>}  
                <div className="user-scores">
                {loading ? <p>Загрузка данных...</p> : userScores !== null ? (
                    <p>Общие баллы пользователя: {userScores}</p> 
                ) : (
                    <p>Данные не найдены</p>
                    )}
                <p>Ваш процент верных ответов за всё время: {Uspevaemost} </p>
                </div>
                <a href="/MainPage">На главную страницу</a>
              </div>)}</div>);};
export default Test2;