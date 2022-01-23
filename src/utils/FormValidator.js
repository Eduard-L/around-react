// import { pageSettings } from '../utils/constants'
class FormValidator {
    constructor(pageSettings, formElement) {

        this._inputSelector = pageSettings.inputSelector;
        this._submitButtonSelector = pageSettings.submitButtonSelector;
        this._inactiveButtonClass = pageSettings.inactiveButtonClass;
        this._inputErrorClass = pageSettings.inputErrorClass;
        this._errorClass = pageSettings.errorClass;
        this._formElement = formElement;

    }
    _showInputError(inputElement, errorMessage) {

        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);

    }
    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = "";

    }
    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) { // if input element has not valid (true) show input message (with func.) //
            this._showInputError(inputElement, inputElement.validationMessage);

        } else { // else hide the message (with func.)
            this._hideInputError(inputElement);

        }
    }
    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid
        });
    }
    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._inactiveButtonClass);
            buttonElement.disabled = true;
        } else {
            buttonElement.classList.remove(this._inactiveButtonClass);
            buttonElement.disabled = false
        }

    }
    _setEventListeners() {
        const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector)); //find all inputs in our page and creating an array !
        const buttonElement = this._formElement.querySelector(this._submitButtonSelector); // find all symbit button in our page & creating array ! 
        this._toggleButtonState(inputList, buttonElement);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => { //for all input element add event and check validity & toggle button according the validity 
                this._checkInputValidity(inputElement);
                this._toggleButtonState(inputList, buttonElement);
            })
        })

    }
    resetValidation() { /// form reseting and hide validation messages
        this._inputList = [...this._formElement.querySelectorAll(this._inputSelector)];
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        this._toggleButtonState(this._inputList, this._buttonElement);
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement)
        });
    }
    enableValidation() {
        this._formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();

    }

}
export default FormValidator;

