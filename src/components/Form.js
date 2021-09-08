import {stations} from "../data/stations";
import {dates} from "../data/dates";
import {formatDate} from "../utils/date";

import "./css/form.css";

export default class Form {
    constructor(container, onSubmit) {
        this.onSubmit = onSubmit;
        this.initialize(container)
    }

    initialize(container) {
        const form = document.createElement("form");
        form.addEventListener("submit", event => this.onFormSubmit(event));
        container.appendChild(form);
        this.addCitiesSelect(form, stations);
        this.addDateSelect(form, dates);
        this.addTemperature(form);
        this.addTypeSelect(form);
        this.addSubmitButton(form);
    }

    makeUpdate() {
        this.onFormSubmit()
    }

    addCitiesSelect(form, data) {
        const div = document.createElement("div");
        div.classList.add("form-group");
        form.appendChild(div);
        const label = document.createElement("label");
        label.classList.add("form-label-3");
        label.for = "formSelectCity";
        label.innerText = "Standort";
        div.appendChild(label);
        const select = document.createElement("select");
        select.classList.add("form-control");
        select.id = "formSelectCity";
        div.appendChild(select);
        this.city = select;
        data.forEach(group => {
            const e = document.createElement("optgroup");
            e.label = group.label, select.appendChild(e);
            group.options.forEach(option => {
                const i = document.createElement("option");
                i.value = option.value, i.innerHTML = option.label, e.appendChild(i)
            })
        })
    }

    addDateSelect(form, data) {
        const dateSelectRow = document.createElement("div");
        dateSelectRow.classList.add("form-row");
        form.appendChild(dateSelectRow);
        const yearGroup = document.createElement("div");
        yearGroup.classList.add("form-group");
        yearGroup.classList.add("col-md-6");
        dateSelectRow.appendChild(yearGroup);
        const yearLabel = document.createElement("label");
        yearLabel.for = "formSelectYear";
        yearLabel.innerText = "Startdatum Jahr";
        yearGroup.appendChild(yearLabel);
        const yearSelect = document.createElement("select");
        yearSelect.classList.add("form-control");
        yearSelect.id = "formSelectYear";
        yearGroup.appendChild(yearSelect);
        this.year = yearSelect;
        data.years.forEach(year => {
            const e = document.createElement("option");
            e.value = year.value;
            e.innerHTML = year.label;
            yearSelect.appendChild(e);
        });
        const mainthGroup = document.createElement("div");
        mainthGroup.classList.add("form-group");
        mainthGroup.classList.add("col-md-6");
        dateSelectRow.appendChild(mainthGroup);
        const monthLabel = document.createElement("label");
        monthLabel.for = "formSelectMonth";
        monthLabel.innerText = "Startdatum Monat";
        mainthGroup.appendChild(monthLabel);
        const monthSelect = document.createElement("select");
        monthSelect.classList.add("form-control");
        monthSelect.id = "formSelectMonth";
        mainthGroup.appendChild(monthSelect);
        this.month = monthSelect;
        data.months.forEach(month => {
            const option = document.createElement("option");
            option.value = month.value;
            option.innerHTML = month.label;
            monthSelect.appendChild(option);
        })
    }

    addTemperature(form) {
        const temperatureRow = document.createElement("div");
        temperatureRow.classList.add("form-row");
        form.appendChild(temperatureRow);
        const baseGroup = document.createElement("div");
        baseGroup.classList.add("form-group");
        baseGroup.classList.add("col-md-6");
        temperatureRow.appendChild(baseGroup);
        const baseLabel = document.createElement("label");
        baseLabel.for = "heatingTemp";
        baseLabel.innerText = "Heizgrenztemperatur in °C";
        baseGroup.appendChild(baseLabel);
        const baseInput = document.createElement("input");
        baseInput.classList.add("form-control");
        baseInput.type = "number";
        baseInput.value = "15";
        baseInput.min = "-40";
        baseInput.max = "40";
        baseInput.step = "1";
        baseInput.id = "heatingTemp";
        baseGroup.appendChild(baseInput);
        this.heating = baseInput;
        const roomGroup = document.createElement("div");
        roomGroup.classList.add("form-group");
        roomGroup.classList.add("col-md-6");
        temperatureRow.appendChild(roomGroup);
        const roomLabel = document.createElement("label");
        roomLabel.for = "roomTemp";
        roomLabel.innerText = "Raumtemperatur in °C (nur für Gradtagzahl)";
        roomGroup.appendChild(roomLabel);
        const roomInput = document.createElement("input");
        roomInput.classList.add("form-control");
        roomInput.type = "number";
        roomInput.value = "20";
        roomInput.min = "-40";
        roomInput.max = "40";
        roomInput.step = "1";
        roomInput.id = "roomTemp";
        roomGroup.appendChild(roomInput);
        this.temp = roomInput;
    }

    addTypeSelect(form) {
        const typeSelectGroup = document.createElement("div");
        typeSelectGroup.classList.add("form-group");
        form.appendChild(typeSelectGroup);
        const label = document.createElement("label");
        label.for = "outputParameter";
        label.innerText = "Gewünschte Kennzahl";
        typeSelectGroup.appendChild(label);
        const formControl = document.createElement("select");
        formControl.classList.add("form-control");
        formControl.id = "outputParameter";
        typeSelectGroup.appendChild(formControl);
        this.output = formControl;
        const hddOption = document.createElement("option");
        hddOption.value = "hdd";
        hddOption.innerHTML = "Heizgradtage";
        formControl.appendChild(hddOption);
        const ddOption = document.createElement("option");
        ddOption.value = "dd";
        ddOption.innerHTML = "Gradtagzahl";
        formControl.appendChild(ddOption);
    }

    addSubmitButton(form) {
        const buttonGroup = document.createElement("div");
        buttonGroup.classList.add("form-group");
        form.appendChild(buttonGroup);
        const button = document.createElement("button");
        button.type = "submit";
        button.classList.add("btn");
        button.classList.add("btn-primary");
        button.innerHTML = "Diagramm anzeigen";
        buttonGroup.appendChild(button)
    }

    onFormSubmit(form) {
        if (form && form.preventDefault(), !this.onSubmit) return;
        const data = {
            station: this.city.value,
            city: this.city.options[this.city.selectedIndex].text,
            dd: parseInt(this.temp.value),
            hdd: parseInt(this.heating.value),
            month: this.month.value,
            year: this.year.value,
            output: this.output.value
        };
        data.start = formatDate(data.year, data.month, "01");
        data.end = ((t, e) => {
            let date = new Date(t);
            date.setMonth(date.getMonth() + e);
            date.setDate(date.getDate() - 1);
            let n = ("0" + (date.getMonth() + 1)).slice(-2), r = ("0" + date.getDate()).slice(-2);
            return formatDate(date.getFullYear(), n, r)
        })(data.start, 12), this.onSubmit(data)
    }
}
