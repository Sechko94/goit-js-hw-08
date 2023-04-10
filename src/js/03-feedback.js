// Імпортується функція throttle з бібліотеки Lodash, яка дозволяє обмежити кількість викликів функції onInputData за певний проміжок часу.
import throttle from "lodash.throttle";
// Встановлюється константа LOCAL_KEY, яка використовується для зберігання даних форми в localStorage.
const LOCAL_KEY = 'feedback-form-state';

// Отримується посилання на форму зворотнього зв'язку за допомогою методу querySelector.
const form = document.querySelector('.feedback-form');

// На форму додаються два обробники подій: на введення даних в форму та на відправку форми.
form.addEventListener('input', throttle(onInputData, 500));
form.addEventListener('submit', onFormSubmit)

// Ініціалізується змінна dataForm, яка використовується для зберігання даних форми в об'єкті, який містить поля "email" та "message".
let dataForm = JSON.parse(localStorage.getItem(LOCAL_KEY)) || {}; 

// Виконується деструктуризація об'єкту form.elements, яка дозволяє отримати посилання на елементи форми "email" та "message".
const { email, message } = form.elements;

// Виконується деструктуризація об'єкту form.elements, яка дозволяє отримати посилання на елементи форми "email" та "message".
reloadePage();

// Функція onInputData викликається при введенні даних в форму та зберігає значення полів "email" та "message" в об'єкті dataForm. Дані зберігаються в localStorage за допомогою методу setItem.
function onInputData(event) {
    dataForm = { email: email.value, message: message.value };
    localStorage.setItem(LOCAL_KEY.JSON.stringify(dataForm))
}
// Викликається функція reloadPage(), яка перезавантажує значення полів форми, якщо дані були збережені в localStorage.
function reloadePage() {
    if (dataForm) {
        email.value = dataForm.email || '';
        message.value = dataForm.message || '';
    }
};

// Функція onFormSubmit викликається при відправці форми та перевіряє наявність введених даних у полях "email" та "message". Якщо якесь з полів порожнє, то виводиться повідомлення з проханням заповнити всі обов'язкові поля. Інакше дані зберігаються в localStorage, видаляються з localStorage та форма очищається.

function onFormSubmit(event) {
    event.preventDefault();
    console.log({ email: email.value, message: message.value });

    if (email.value === '' || message.value === '') {
        return alert(`Будь ласка, заповніть всі обов'язкові поля.`);
    }

    localStorage.removeItem(LOCAL_KEY);
    event.currentTarget.reset();
    dataForm = {};
}