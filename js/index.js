const FORM = document.querySelector('.cmp-landing__form');
const INPUT_PASSWORD = document.querySelector('#password-one');
const INPUT_PASSWORD_CONFIRM = document.querySelector('#password-two');
const PASSWORD_RULES = document.querySelector('.cmp-landing__form-password-rules');
const RULE_UPPERCASE = document.getElementById('rule-uppercase');
const RULE_SPECIAL = document.getElementById('rule-special');
const RULE_LENGTH = document.getElementById('rule-length');
const SHOW_BUTTONS = document.querySelectorAll('.form-password-container__show');


const containsUppercase = (str) => {
    return /[A-Z]/.test(str);
}

const containsSpecialChar = (str) => {
    return /[*@.,+|\-°?¡¿_'~]+/gi.test(str);
}

const handlePasswordOneChange = (event) => {
    let password = event.target.value;
    PASSWORD_RULES.classList.toggle('cmp-landing__form-password-rules--show', password.length > 0);
    RULE_UPPERCASE.classList.toggle('valid', containsUppercase(password));
    RULE_SPECIAL.classList.toggle('valid', containsSpecialChar(password));
    RULE_LENGTH.classList.toggle('valid', password.length >= 8);
}

const handlePasswordTwoChange = (event) => {
    INPUT_PASSWORD_CONFIRM.classList.toggle(
        'form-password-container__password--show', INPUT_PASSWORD.value === event.target.value);
}

INPUT_PASSWORD.addEventListener('input', handlePasswordOneChange)
INPUT_PASSWORD_CONFIRM.addEventListener('input', handlePasswordTwoChange)

SHOW_BUTTONS.forEach(element => {
    element.addEventListener('mousedown', (e) => {
        e.target.id == 'form-show-first' ?
            INPUT_PASSWORD.type = 'text' :
            INPUT_PASSWORD_CONFIRM.type = 'text';
    })
    element.addEventListener('mouseup', (e) => {
        e.target.id == 'form-show-first' ?
            INPUT_PASSWORD.type = 'password' :
            INPUT_PASSWORD_CONFIRM.type = 'password';
    })
})

const messages = {
    required: 'This field is required',
    patternMismatch: 'Please enter a valid value',
    typeMismatch: 'Please enter a valid email address',
    tooShort: 'Password must be at least 8 characters long'
}


FORM.addEventListener('submit', (event) => {
    event.preventDefault();
    let test = ["name", "lastName", "email", "phone", "password", "passwordConfirm"];
    if (FORM.checkValidity()) {
        console.log('Form submitted successfully');
    } else {
        let elements = FORM.elements;
        test.forEach(element => {
            let target = elements[element];
            if (!target) return;

            target.setCustomValidity('');

            if (!target.validity.valid) {
                if (target.validity.valueMissing) {
                    target.setCustomValidity(messages.required);
                } else if (target.validity.typeMismatch) {
                    target.setCustomValidity(messages.typeMismatch);
                } else if (target.validity.patternMismatch) {
                    target.setCustomValidity(messages.patternMismatch);
                } else if (target.validity.tooShort) {
                    target.setCustomValidity(messages.tooShort);
                }
                target.reportValidity();
            }
        });
    }
})
